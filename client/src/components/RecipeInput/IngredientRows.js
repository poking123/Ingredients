import React from 'react';
import IngredientRow from '../RecipeInput/IngredientRow';
import uuidv4 from 'uuid/v4';

class IngredientRows extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: this.props.ingredients
        };
    }

    checkEmptyIngredients = () => {
        if (this.state.ingredients.length === 0) {
            this.addIngredientRow();
        }
    }

    handleEditRecipeRowChange = (e, index) => {
        let targetName = e.target.name;
        let newIngredientValue = e.target.value;

        let ingredient = this.state.ingredients[index];

        let newIngredients = this.state.ingredients;

        if (targetName === 'ingredientName') { // find index of the ingredient name
            ingredient.name = newIngredientValue; // ingredient name
        } else if (targetName === 'quantity') {
            ingredient.quantity = newIngredientValue; // ingredient quantity
        } else if (targetName === 'noQuantity') {
            // Important - e.target.checked is the checked value boolean before you clicked it
            if (e.target.checked) { // going to have no quantity
                sessionStorage.setItem(ingredient._id, ingredient.quantity);
                ingredient.quantity = null;
            } else { // going to have quantity
                let ssQuantity = sessionStorage.getItem(ingredient._id);
                if (ssQuantity === 'null') ssQuantity = null;
                ingredient.quantity = (ssQuantity !== null) ? ssQuantity : 0;
            }
        }
        newIngredients[index] = ingredient;
        this.setState({ingredients: newIngredients});
    }

    deleteEditRecipeIngredient = index => {
        let newIngredients = this.state.ingredients;
        newIngredients.splice(index, 1);
        this.setState({ingredients: newIngredients});
    }

    addIngredientRow = () => {
        let newIngredients = this.state.ingredients;
        newIngredients.push({
            name: '',
            quantity: 0,
            _id: uuidv4()
        });
        this.setState({ingredients: newIngredients});
    }

    componentDidMount() {
        this.checkEmptyIngredients();
    }

    componentDidUpdate() {
        this.checkEmptyIngredients();
    }

    render() {
        let ingredientRowsHTML = this.state.ingredients.map((ingredient, index) => {
            return <IngredientRow index={index} ingredient={ingredient} handleEditRecipeRowChange={this.handleEditRecipeRowChange} deleteEditRecipeIngredient={this.deleteEditRecipeIngredient} key={ingredient._id} />
        });

        if (this.props.isMobile) {
            return (<div className="ingredientsWrapper">
                <div className="ingredientRow">
                    <h2>Name</h2>
                    <h2>Qty</h2>
                    <h2 id="noQuantityH2" data-toggle="tooltip" title="For ingredients we do not wish to add a quantity to. It is always assumed that these ingredients have infinite quantity.">No Qty</h2>
                    <div></div>
                </div>

                {ingredientRowsHTML}

                <div className="ingredientRow">
                    <div></div>
                    <div></div>
                    <div></div>
                    <button className="btn btn-success" onClick={() => this.addIngredientRow()}>Add</button>
                </div>
            </div>);  
        } else {
            return (<div className="ingredientsWrapper">
                <div className="ingredientRow">
                    <h2>Ingredient Name</h2>
                    <h2>Quantity</h2>
                    <h2 id="noQuantityH2" data-toggle="tooltip" title="For ingredients we do not wish to add a quantity to. It is always assumed that these ingredients have infinite quantity.">No Quantity</h2>
                    <div></div>
                </div>

                {ingredientRowsHTML}

                <div className="ingredientRow">
                    <div></div>
                    <div></div>
                    <div></div>
                    <button className="btn btn-success" onClick={() => this.addIngredientRow()}>Add Row</button>
                </div>
            </div>);  
        }

        
    }
}

export default IngredientRows;