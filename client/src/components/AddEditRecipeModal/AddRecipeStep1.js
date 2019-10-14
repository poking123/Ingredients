import React from 'react';
import Modal from 'react-bootstrap/Modal';
import IngredientRows from '../RecipeInput/IngredientRows';

function AddRecipeStep1({isMobile, isTablet, modalStep, handleStepChange, handleRecipeChangeName}) {
    if (modalStep !== 'AddRecipeStep1') {
        return null;
    }

    return (<Modal show={true} size="lg">
            <Modal.Header>
                <h1>Add Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <IngredientRows isMobile={isMobile} isTablet={isTablet} ingredients={[]} />
            </Modal.Body>

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => handleStepChange('ChooseAddEditRecipe')}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => handleStepChange('AddRecipeStep2')}>Next</button>
            </Modal.Footer>
    </Modal>)
}

export default AddRecipeStep1;