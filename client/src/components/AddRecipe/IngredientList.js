import React from 'react';

const IngredientList = (props) => {
    const ingredientsList = props.ingredientsList.map(ingredient => {
        if (!ingredient.noQuantity) {
            return (
                <li key={ingredient.key}>
                    <p>{ingredient.quantity}&nbsp;</p>
                    <p className="displayNone">{ingredient.noQuantity}</p>
                    <p>{ingredient.name}</p>
                    <p className="xButton" onClick={() => {props.deleteIngredient(ingredient.key)}} >&nbsp;&nbsp;X</p>
                </li>
            )
        } else {
            return (
                <li key={ingredient.key}>    
                    <p className="displayNone">{ingredient.quantity}</p>
                    <p className="displayNone">{ingredient.noQuantity}</p>
                    <p>{ingredient.name}</p>
                    <p className="xButton" onClick={() => {props.deleteIngredient(ingredient.key)}} >&nbsp;&nbsp;X</p>
                </li>
            )
        }
    });

    return (
        <React.Fragment>
            {ingredientsList}
        </React.Fragment>
    )
}

export default IngredientList;