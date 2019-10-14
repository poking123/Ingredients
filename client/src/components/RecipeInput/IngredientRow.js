import React from 'react';

function IngredientRow({index, ingredient, handleEditRecipeRowChange, deleteEditRecipeIngredient}) {
    let noQuantityInput;
    let quantityInput;

    noQuantityInput = <input type="checkbox" name="noQuantity" className="ingredientNoQuantity" onChange={e => handleEditRecipeRowChange(e, index)} checked={ingredient.quantity === null} />
    if (ingredient.quantity !== null) { // has quantity
        quantityInput = <input type="number" name="quantity" className="ingredientQuantity hasQuantity" onChange={e => handleEditRecipeRowChange(e, index)} value={ingredient.quantity} min="0" />;
    } else { // no quantity
        quantityInput = <input type="number" name="quantity" className="ingredientQuantity noQuantity" onChange={e => handleEditRecipeRowChange(e, index)} value='' min="0" disabled />;
    }

    return (<div className="ingredientRow">
        <input type="text" name="ingredientName" className="ingredientName" onChange={e => handleEditRecipeRowChange(e, index)} value={ingredient.name} placeholder='New Ingredient' />
        { quantityInput }
        { noQuantityInput }
        <button type="button" className="btn btn-danger" onClick={() => deleteEditRecipeIngredient(index)}>Delete</button>
    </div>);
}

export default IngredientRow;