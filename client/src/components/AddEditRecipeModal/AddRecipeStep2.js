import React from 'react';
import Modal from 'react-bootstrap/Modal';
import IngredientRows from '../RecipeInput/IngredientRows';

/* stepData has 
 - modalStep
 - handleStepChange
 - stepNumber
*/
function AddRecipeStep2({isMobile, isTablet, stepData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep2') {
        return null;
    }

    return (<Modal show={true} size="md">
            <Modal.Header>
                <h1>Add Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <IngredientRows isMobile={isMobile} isTablet={isTablet} ingredients={[]} />
            </Modal.Body>

            <Modal.Footer className="spaceBetweenModalFooter">
                <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('AddRecipeStep', stepData.stepNumber - 1)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => stepData.handleStepChange('ChooseAddEditRecipe')}>Save Recipe</button>
            </Modal.Footer>
    </Modal>)
}

export default AddRecipeStep2;