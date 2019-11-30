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

function AddRecipeStep1({stepData, recipeData, showModalData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep1') {
        return null;
    }

    function nextStepCheck() {
        if (recipeData.recipeNameIsNotEmpty()) {
            stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1);
        } else {
            document.getElementById('recipeNameAlert').classList.remove('displayNone');
        }
    }

    return (<Modal size="md" show={showModalData.showModal} onHide={() => showModalData.toggleShowModal()}>
            <Modal.Header>
                <h1>Add New Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="addRecipeRecipeName">Recipe Name</label>
                    <input type="text" className="form-control" id="addRecipeRecipeName" value={recipeData.recipeName} onChange={(e) => recipeData.handleRecipeNameChange(e)} placeholder="Enter Recipe Name" />
                </div>
                <div className="alert alert-danger displayNone" id="recipeNameAlert" role="alert">
                    <strong>Oops!</strong> Please input a non-empty Recipe Name.
                </div>
            </Modal.Body>

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('ChooseAddEditRecipe', 0)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => nextStepCheck()}>Next</button>
            </Modal.Footer>
    </Modal>)
}


export default AddRecipeStep1;