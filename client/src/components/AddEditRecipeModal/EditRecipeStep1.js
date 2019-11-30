import React from 'react';
import Modal from 'react-bootstrap/Modal';

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

function EditRecipeStep1({stepData, recipeData, showModalData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'EditRecipeStep1') {
        return null;
    }

    function nextStepCheck() {
        // getRecipe (graphql returns a Promise)
        recipeData.getRecipe().then(recipe => {
            if (recipe) {
                // stepData.handleStepChange('EditRecipeStep', stepData.stepNumber + 1);
                recipeData.setRecipe(recipe);
                stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1);
                stepData.toggleSwitchModalStep();
            } else {
                document.getElementById('recipeNameAlert').classList.remove('displayNone');
            }
        });
    }

    return (<Modal show={showModalData.showModal} onHide={() => showModalData.toggleShowModal()}>
        <Modal.Header>
            <h1>Edit Recipe</h1>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
                <label htmlFor="editRecipeRecipeName">Recipe Name</label>
                <input type="text" className="form-control" id="editRecipeRecipeName" value={recipeData.recipeName} onChange={(e) => recipeData.handleRecipeNameChange(e)} placeholder="Enter An Existing Recipe Name" />
            </div>
            <div className="alert alert-danger displayNone" id="recipeNameAlert" role="alert">
                <strong>Oops!</strong> That Recipe Name was not found.
            </div>
        </Modal.Body>
        <Modal.Footer className="spaceBetweenModalFooter justifyContentCenter">
            <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('ChooseAddEditRecipe', 0)}>Back</button>
            <button type="button" className="btn btn-primary" onClick={() => nextStepCheck()}>Next</button>
        </Modal.Footer>
    </Modal>)
}

export default EditRecipeStep1;