import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ChooseAddEditRecipe({modalStep, handleStepChange}) {
    if (modalStep !== 'ChooseAddEditRecipe') {
        return null;
    }

    return (<Modal show={true}>
        <Modal.Header className="justifyContentCenter">
            <h1>Choose An Option</h1>
        </Modal.Header>
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-primary" onClick={() => handleStepChange('AddRecipeStep1')}>Add Recipe</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleStepChange('EditRecipeStep1')}>Edit Recipe</button>
        </Modal.Footer>
    </Modal>)
}

export default ChooseAddEditRecipe;