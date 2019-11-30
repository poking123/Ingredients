import React from 'react';
import { graphql } from 'react-apollo';
import { addRecipeMutation } from '../../queries/queries';
import Modal from 'react-bootstrap/Modal';
import IngredientRows from '../RecipeInput/IngredientRows';

/*
let showModalData = {
    showModal: this.state.showModal,
    toggleShowModal: this.toggleShowModal
}
*/

/* 
let stepData = {
    modalStep: this.state.modalStep,
    handleStepChange: this.handleStepChange,
    stepNumber: this.state.stepNumber,
    switchModalStep: this.switchModalStep,
    toggleSwitchModalStep: this.toggleSwitchModalStep
}
*/

/*
let recipeData = {
    recipeName: this.state.recipeName,
    recipeId: this.state.recipeId,
    handleRecipeNameChange: this.handleRecipeNameChange,
    recipeNameIsNotEmpty: this.recipeNameIsNotEmpty,
    addedRecipe: this.addedRecipe,
    getRecipe: this.getRecipe,
    setRecipe: this.setRecipe,
    returnDefaultState: this.returnDefaultState
}
*/

/*
let ingredientsData = {
    ingredients: this.state.ingredients,
    handleIngredientChange: this.handleIngredientChange,
    ingredientsAreEmpty: this.ingredientsAreEmpty,
    removeIngredientIds: this.removeIngredientIds
}
*/

function AddRecipeStep2({isMobile, isTablet, stepData, recipeData, ingredientsData, addRecipeMutation, showModalData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep2') {
        return null;
    }

    async function saveRecipeCheck() {
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
                    id: recipeData.recipeId,
                    name: recipeData.recipeName,
                    ingredients: ingredientsData.ingredients,
                    clientId: clientId
                }
            });
            let switchModalStep = stepData.switchModalStep;
            await recipeData.returnDefaultState();
            
            if (switchModalStep) { // Updating
                recipeData.updatedRecipe();
            } else { // adding
                recipeData.addedRecipe();
            }
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

    function handleBackButton() {
        stepData.handleStepChange('AddRecipeStep', stepData.stepNumber - 1);

        if (stepData.switchModalStep) {
            stepData.toggleSwitchModalStep();
        }
    }

    return (<Modal size="md" show={showModalData.showModal} onHide={() => showModalData.toggleShowModal()}>
            <Modal.Header>
                <h1>{recipeData.recipeName}</h1>
            </Modal.Header>

            <Modal.Body>
                <IngredientRows isMobile={isMobile} isTablet={isTablet} ingredientsData={ingredientsData} />
                <div className="alert alert-danger marginTop1REM displayNone" id="saveRecipeErrorAlert" role="alert"></div>
            </Modal.Body>
            

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => handleBackButton()}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => saveRecipeCheck()}>Save Recipe</button>
            </Modal.Footer>
    </Modal>)
}

export default graphql(addRecipeMutation, { name: "addRecipeMutation" })(AddRecipeStep2);