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
function ChooseAddEditRecipe({stepData, addEditRecipeData, showModalData}) {
    if (stepData.modalStep !== 'ChooseAddEditRecipe') {
        return null;
    }

    function handleAddRecipe() {
        addEditRecipeData.resetAddEditRecipe();
        stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1)
    }

    function handleEditRecipe() {
        addEditRecipeData.resetAddEditRecipe();
        stepData.handleStepChange('EditRecipeStep', stepData.stepNumber + 1)
    }

    let modalBody;

    if (addEditRecipeData.addedRecipe) {
        modalBody = <Modal.Body>
            <div className="alert alert-success" id="addedRecipeAlert" role="alert">
                Success! Your recipe has been added!
            </div>
        </Modal.Body>;
    } else if (addEditRecipeData.updatedRecipe) {
        modalBody = <Modal.Body>
            <div className="alert alert-success" id="addedRecipeAlert" role="alert">
                Success! Your recipe has been updated!
            </div>
        </Modal.Body>;
    } else {
        modalBody = null;
    }

    return (<Modal show={showModalData.showModal} onHide={() => showModalData.toggleShowModal()}>
        <Modal.Header className="justifyContentCenter">
            <h1>Choose An Option</h1>
        </Modal.Header>

        {modalBody !== null && modalBody}
        
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-primary" onClick={() => handleAddRecipe()}>Add Recipe</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleEditRecipe()}>Edit Recipe</button>
        </Modal.Footer>
    </Modal>)
}

export default ChooseAddEditRecipe;