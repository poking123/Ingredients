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
function AddRecipeStep2({isMobile, isTablet, stepData, recipeName, ingredientsData, addRecipeMutation, addedRecipe}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep2') {
        return null;
    }

    function saveRecipeCheck() {
        let hasIngredients = !ingredientsData.ingredientsAreEmpty();

        let idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        let clientId;
        let hasClientId = false;
        if (idToken !== null && idToken.idToken !== undefined) {
            clientId = idToken.idToken.clientId;
            hasClientId = clientId !== undefined && clientId != null;
        }
        
        if (hasIngredients && hasClientId) {
            ingredientsData.removeIngredientIds(); // removes ids from ingredients since it was causing errors
            addRecipeMutation({
                variables: {
                    name: recipeName,
                    ingredients: ingredientsData.ingredients,
                    clientId: clientId
                }
            });
            addedRecipe();
            stepData.handleStepChange('ChooseAddEditRecipe');
        } else {
            let errorList = '';
            if (!hasIngredients) {
                errorList += '<li>Empty ingredient names or non-positive quantities</li>'
            }
            if (!clientId) {
                errorList += '<li>Not Logged In</li>'
            }
            let errors = '<p>Errors:</p><ul>' + errorList + '</ul>';

            let saveRecipeError = document.getElementById('saveRecipeErrorAlert');
            saveRecipeError.classList.remove('displayNone');
            saveRecipeError.innerHTML = errors;
            console.log(errors);
        }
    }

    return (<Modal show={true} size="md">
            <Modal.Header>
                <h1>Add Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <IngredientRows isMobile={isMobile} isTablet={isTablet} ingredientsData={ingredientsData} />
                <div className="alert alert-danger marginTop1REM displayNone" id="saveRecipeErrorAlert" role="alert"></div>
            </Modal.Body>
            

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('AddRecipeStep', stepData.stepNumber - 1)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => saveRecipeCheck()}>Save Recipe</button>
            </Modal.Footer>
    </Modal>)
}

export default graphql(addRecipeMutation, { name: "addRecipeMutation" })(AddRecipeStep2);