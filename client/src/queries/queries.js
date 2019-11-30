import { gql } from 'apollo-boost';

const getRecipeQuery = gql`
    query GetRecipe($id: ID, $name: String, $clientId: String){
        recipe (id: $id, name: $name, clientId: $clientId) {
            id
            name
            ingredients {
                id
                name
                quantity
            }
            clientId
        }
    }
`;

const getRecipesQuery = gql`
    {
        recipes {
            id
            name
            ingredients {
                id
                name
                quantity
            }
            clientId
        }
    }
`;

const addRecipeMutation = gql`
    mutation ($id: ID, $name: String!, $ingredients: [IngredientInput]!, $clientId: String!){
        addRecipe(id: $id, name: $name, ingredients: $ingredients, clientId: $clientId){
            name
            ingredients {
                id
                name
                quantity
            }
            clientId
        }
    }
`;

export { getRecipeQuery, getRecipesQuery, addRecipeMutation };
