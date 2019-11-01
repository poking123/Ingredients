import React from 'react';
import Modal from 'react-bootstrap/Modal';

/* stepData has 
 - modalStep
 - handleStepChange
 - stepNumber
*/

function AddRecipeStep1({stepData, recipeNameData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'AddRecipeStep1') {
        return null;
    }

    function nextStepCheck() {
        if (recipeNameData.recipeNameIsNotEmpty()) {
            stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1)
        } else {
            document.getElementById('recipeNameAlert').classList.remove('displayNone');
        }
    }

    return (<Modal show={true} size="md">
            <Modal.Header>
                <h1>Add New Recipe</h1>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="addRecipeRecipeName">Recipe Name</label>
                    <input type="text" className="form-control" id="addRecipeRecipeName" value={recipeNameData.recipeName} onChange={(e) => recipeNameData.handleRecipeNameChange(e)} placeholder="Enter Recipe Name" />
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