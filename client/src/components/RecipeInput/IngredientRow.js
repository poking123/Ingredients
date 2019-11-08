import React from 'react';

function IngredientRow({isMobile, isTablet, index, ingredient, handleEditRecipeRowChange, deleteEditRecipeIngredient}) {
    let noQuantityInput;
    let quantityInput;

    let ingredientRowClass = 'ingredientRow';

    let deleteText;

    if (isMobile) {
        ingredientRowClass += ' mobileIngredientRow';
        deleteText = <i className="fas fa-minus"></i>;
    } else if (isTablet) {
        ingredientRowClass += ' tabletIngredientRow';
        deleteText = 'Delete';
    } else {
        deleteText = 'Delete';
    }

    noQuantityInput = <input type="checkbox" name="noQuantity" className="ingredientNoQuantity" onChange={e => handleEditRecipeRowChange(e, index)} checked={ingredient.quantity === null} />
    // Has Quantity
    if (ingredient.quantity !== null) { 
        quantityInput = <input type="number" name="quantity" className="form-control ingredientQuantity hasQuantity" onChange={e => handleEditRecipeRowChange(e, index)} value={ingredient.quantity} min="1" max="999" />;
    } else { // No Quantity
        quantityInput = <input type="number" name="quantity" className="form-control ingredientQuantity noQuantity" onChange={e => handleEditRecipeRowChange(e, index)} value='' min="1" max="999" disabled />;
    }

    return (<div className={ingredientRowClass}>
        <input type="text" name="ingredientName" className="form-control ingredientName" onChange={e => handleEditRecipeRowChange(e, index)} value={ingredient.name} placeholder='New Ingredient' />
        { quantityInput }
        { noQuantityInput }
        <button type="button" className="btn btn-danger" onClick={() => deleteEditRecipeIngredient(index)}>{deleteText}</button>
    </div>);
    
}

export default IngredientRow;