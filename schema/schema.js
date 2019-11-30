const graphql = require('graphql');
const Recipe = require('../models/RecipeModel');

const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

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
        addRecipe: {
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
