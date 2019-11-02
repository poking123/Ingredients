import React from 'react';
import Modal from 'react-bootstrap/Modal';
import IngredientRows from '../RecipeInput/IngredientRows';
import $ from 'jquery';

/* stepData has 
 - modalStep
 - handleStepChange
 - stepNumber

 ingredientsData has
 - ingredients
 - handleIngredientChange
 - ingredientsAreEmpty
*/
function AddRecipeStep2({isMobile, isTablet, stepData, recipeName, ingredientsData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep2') {
        return null;
    }

    function saveRecipeCheck() {
        if (ingredientsData.ingredientsAreEmpty()) {
            let recipe = {
                name: recipeName,
                ingredients: ingredientsData.ingredients
            };

            addNewRecipeAJAX(recipe);
            stepData.handleStepChange('ChooseAddEditRecipe');
        }
    }

    function addNewRecipeAJAX(recipe) {
        $.ajax({
            type: 'POST',
            url: 'api/recipes/addRecipe',
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: function(data){
            }
        });
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
                {/* We need a function to check that the ingredients are properly put in, sends an AJAX request to add the recipe, then go to ChooseAddEditRecipe */}
            </Modal.Footer>
    </Modal>)
}

export default AddRecipeStep2;