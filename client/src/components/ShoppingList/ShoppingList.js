import React from 'react';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: '',
            ingredientName: '',
            quantity: '', // even though it's a number?
            noQuantity: false,
            ingredientsList: [],
            hasRecipeName: false,
            hasIngredientName: false,
            hasQuantity: false
        };
    }

    render() {
        return <div>
            Shopping Cart
        </div>
    }
}


export default ShoppingList;