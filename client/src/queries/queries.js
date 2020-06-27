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

const addOrUpdateRecipeMutation = gql`
    mutation ($id: ID, $name: String!, $ingredients: [IngredientInput]!, $clientId: String!){
        addOrUpdateRecipe(id: $id, name: $name, ingredients: $ingredients, clientId: $clientId){
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

const addOrUpdateUserMutation = gql`
    mutation ($id: ID, $username: String!, $password: String!, $email: String!){
        addOrUpdateUser(id: $id, username: $username, password: $password, email: $email){
            username
            email
        }
    }
`;

export {
    getRecipeQuery, 
    getRecipesQuery, 
    addOrUpdateRecipeMutation,
    addOrUpdateUserMutation,
};