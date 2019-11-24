import React from 'react';
import Modal from 'react-bootstrap/Modal';

/*
recipeNameData has
- recipeName
- handleRecipeNameChange
- recipeNameIsNotEmpty
- hasRecipeName
*/

function EditRecipeStep1({stepData, recipeNameData}) {
    let stepName = stepData.modalStep + stepData.stepNumber;
    if (stepName !== 'EditRecipeStep1') {
        return null;
    }

    function nextStepCheck() {
        if (recipeNameData.hasRecipeName()) {
            // stepData.handleStepChange('EditRecipeStep', stepData.stepNumber + 1);
            
            console.log('has recipeName');
            
            // stepData.handleStepChange('AddRecipeStep', stepData.stepNumber + 1);
        } else {
            console.log('does not have recipeName');
            document.getElementById('recipeNameAlert').classList.remove('displayNone');
        }
    }

    return (<Modal show={true}>
        <Modal.Header>
            <h1>Edit Recipe</h1>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
                <label htmlFor="editRecipeRecipeName">Recipe Name</label>
                <input type="text" className="form-control" id="editRecipeRecipeName" value={recipeNameData.recipeName} onChange={(e) => recipeNameData.handleRecipeNameChange(e)} placeholder="Enter An Existing Recipe Name" />
            </div>
            <div className="alert alert-danger displayNone" id="recipeNameAlert" role="alert">
                <strong>Oops!</strong> That Recipe Name was not found.
            </div>
        </Modal.Body>
        <Modal.Footer className="justifyContentCenter">
            <button type="button" className="btn btn-secondary" onClick={() => stepData.handleStepChange('ChooseAddEditRecipe', 0)}>Back</button>
            <button type="button" className="btn btn-primary" onClick={() => nextStepCheck()}>Next</button>
        </Modal.Footer>
    </Modal>)
}

export default EditRecipeStep1;