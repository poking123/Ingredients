import { gql } from 'apollo-boost';

const getRecipeQuery = gql`
    query GetRecipe($id: ID){
        recipe (id: $id) {
            id
            name
            ingredients {
                name
                quantity
            }
        }
    }
`;

const getRecipesQuery = gql`
    {
        recipes {
            id
            name
            ingredients {
                name
                quantity
            }
        }
    }
`;

const addRecipeMutation = gql`
    mutation ($name: String!, $ingredients: [IngredientInput]!){
        addRecipe(name: $name, ingredients: $ingredients){
            name
            ingredients {
                name
                quantity
            }
        }
    }
`;

export { getRecipeQuery, getRecipesQuery, addRecipeMutation };
