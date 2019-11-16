const graphql = require('graphql');
const Recipe = require('../models/recipeModel');

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
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { 
                id: { type: GraphQLID },
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                let {id, name} = args;
                let query = {};

                if (id !== undefined) {
                    query._id = id
                }
                if (name !== undefined) {
                    query.name = name
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                ingredients: { type: new GraphQLList(IngredientInputType) }
            },
            resolve(parent, args){
                let recipe = new Recipe({
                    name: args.name,
                    ingredients: args.ingredients
                });
                return recipe.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
