import React from 'react';
import EditRecipeRow from './EditRecipeRow';

function EditRecipeRows({ingredients, handleEditRecipeRowChange, deleteEditRecipeIngredient, addIngredientRow}) {

    let editRecipeRowsHTML = ingredients.map((ingredient, index) => {
        return <EditRecipeRow index={index} ingredient={ingredient} handleEditRecipeRowChange={handleEditRecipeRowChange} deleteEditRecipeIngredient={deleteEditRecipeIngredient} key={ingredient._id} />
    })
    
    return editRecipeRowsHTML;
}

export default EditRecipeRows;