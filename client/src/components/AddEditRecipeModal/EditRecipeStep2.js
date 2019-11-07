import React from 'react';
import Modal from 'react-bootstrap/Modal';

function EditRecipeStep2({stepData, handleStepChange}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'EditRecipeStep2') {
        return null;
    }

    return (<Modal show={true}>
        <Modal.Header>Edit Recipe</Modal.Header>
        <Modal.Body>Hey Body</Modal.Body>
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-primary" onClick={() => stepData.handleStepChange('EditRecipeStep', stepData.stepNumber - 1)}>Next</button>
            <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('EditRecipeStep', stepData.stepNumber + 1)}>Back</button>
        </Modal.Footer>
    </Modal>)
}

export default EditRecipeStep2;