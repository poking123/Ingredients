import React from 'react';
import Modal from 'react-bootstrap/Modal';

function EditRecipeStep2({modalStep, handleStepChange}) {
    if (modalStep !== 'EditRecipeStep2') {
        return null;
    }

    return (<Modal show={true}>
        <Modal.Header>Edit Recipe</Modal.Header>
        <Modal.Body>Hey Body</Modal.Body>
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-primary" onClick={() => handleStepChange('EditRecipeStep3')}>Next</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleStepChange('EditRecipeStep1')}>Back</button>
        </Modal.Footer>
    </Modal>)
}

export default EditRecipeStep2;