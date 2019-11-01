import React from 'react';
import Modal from 'react-bootstrap/Modal';

/* stepData has 
 - modalStep
 - handleStepChange
 - stepNumber
*/
function ChooseAddEditRecipe({stepData}) {
    if (stepData.modalStep !== 'ChooseAddEditRecipe') {
        return null;
    }

    return (<Modal show={true}>
        <Modal.Header className="justifyContentCenter">
            <h1>Choose An Option</h1>
        </Modal.Header>
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-primary" onClick={() => stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1)}>Add Recipe</button>
            <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('EditRecipeStep', stepData.stepNumber + 1)}>Edit Recipe</button>
        </Modal.Footer>
    </Modal>)
}

export default ChooseAddEditRecipe;