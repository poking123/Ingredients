import React from 'react';
import { graphql } from 'react-apollo';
import { addRecipeMutation } from '../../queries/queries';
import Modal from 'react-bootstrap/Modal';
import IngredientRows from '../RecipeInput/IngredientRows';

/* stepData has 
 - modalStep
 - handleStepChange
 - stepNumber

 ingredientsData has
 - ingredients
 - handleIngredientChange
 - ingredientsAreEmpty
 - removeIngredientIds
*/
function AddRecipeStep2({isMobile, isTablet, stepData, recipeName, ingredientsData, addRecipeMutation}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep2') {
        return null;
    }

    function saveRecipeCheck() {
        if (!ingredientsData.ingredientsAreEmpty()) {
            console.log('recipeName is', recipeName);
            console.log('ingredientsData.ingredients is', ingredientsData.ingredients);
            ingredientsData.removeIngredientIds();
            addRecipeMutation({
                variables: {
                    name: recipeName,
                    ingredients: ingredientsData.ingredients
                }
            });
            stepData.handleStepChange('ChooseAddEditRecipe');
        }
    }

    return (<Modal show={true} size="md">
            <Modal.Header>
                <h1>Add Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <IngredientRows isMobile={isMobile} isTablet={isTablet} ingredientsData={ingredientsData} />
            </Modal.Body>

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('AddRecipeStep', stepData.stepNumber - 1)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => saveRecipeCheck()}>Save Recipe</button>
            </Modal.Footer>
    </Modal>)
}

export default graphql(addRecipeMutation, { name: "addRecipeMutation" })(AddRecipeStep2);