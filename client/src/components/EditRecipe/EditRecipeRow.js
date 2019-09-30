import React  from 'react';

function EditRecipeRow(props) {
    let noQuantityInput;

    if (props.recipe.noQuantity) {
        noQuantityInput = <input type="checkbox" class="ingredientNoQuantity" checked />
    } else {
        noQuantityInput = <input type="checkbox" class="ingredientNoQuantity" />;
    }

    return (<div className="ingredientRow">
        <input type="text" class="ingredientName" value= { props.recipe.name } />
        <input type="number" class="ingredientQuantity" value= { props.recipe.quantity } min="0" />
        { noQuantityInput }
        <button type="button" class="btn btn-danger deleteRow">Delete</button>
    </div>);
}

export default EditRecipeRow;