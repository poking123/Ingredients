const graphql = require('graphql');
const Recipe = require('../models/RecipeModel');
const User = require('../models/UserModel');

// Using crypto To Hash Password
const crypto = require('crypto');

const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

let genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

let sha512 = function(password, salt){
    let hash = crypto.createHash('sha512')
            .update(salt + password)
            .digest('hex');
    return hash;
};

const IngredientType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
});

const IngredientInputType = new GraphQLInputObjectType({
    name: 'IngredientInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
});

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: {
            type: new GraphQLList(IngredientType)
        },
        clientId: { type: GraphQLID }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { 
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                clientId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let {id, name, clientId} = args;
                let query = {};

                if (id !== undefined && id !== '') {
                    query.id = id
                }
                if (name !== undefined && name !== '') {
                    query.name = name
                }
                if (clientId !== undefined && clientId !== '') {
                    query.clientId = clientId
                }
                let emptyObjectError = Object.keys(query).length === 0 && obj.constructor === Object;
                if (emptyObjectError) {
                    throw 'Empty getRecipe Query';
                }
                return Recipe.findOne(query);
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return Recipe.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOrUpdateRecipe: {
            type: RecipeType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                ingredients: { type: new GraphQLList(IngredientInputType) },
                clientId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const { id, name, ingredients, clientId } = args;
                Recipe.findOne({ _id: id })
                .then(recipe => {
                    let parameters = {
                        name,
                        ingredients,
                        clientId
                    };
                    if(recipe) { // update
                        Recipe.findOneAndUpdate({ _id: id }, parameters)
                        .then(recipe => console.log('findOneAndUpdate result is', recipe));
                    } else { // add
                        return new Recipe(parameters).save();
                    }
                });
            }
        },
        addOrUpdateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const { id, username, password, email } = args;

                if (username === null || username === '') {
                    
                }

                User.findOne({ id })
                .then(user => {
                    let salt = genRandomString(16);
                    let passwordHash = sha512(password, salt);
                
                    let parameters = {
                        username,
                        salt,
                        password: passwordHash,
                        email,
                    };
                    
                    if(user) { // update
                        return User.findOneAndUpdate({ _id: id }, parameters);
                    } else { // add
                        return new User(parameters).save();
                    }
            
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
