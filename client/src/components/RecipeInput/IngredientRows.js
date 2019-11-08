import React from 'react';
import IngredientRow from '../RecipeInput/IngredientRow';
import uuidv4 from 'uuid/v4';

/*
    props:
    ingredientsData has
    - ingredients
    - handleIngredientChange
    - ingredientsAreEmpty
    - removeIngredientIds
*/

class IngredientRows extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: this.props.ingredientsData.ingredients
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
            ingredient.quantity = parseInt(newIngredientValue); // ingredient quantity
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
        this.setState({ingredients: newIngredients}, () => {
            this.props.ingredientsData.handleIngredientChange(this.state.ingredients);
        });
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
            return <IngredientRow isMobile={this.props.isMobile} isTablet={this.props.isTablet} index={index} ingredient={ingredient} handleEditRecipeRowChange={this.handleEditRecipeRowChange} deleteEditRecipeIngredient={this.deleteEditRecipeIngredient} key={ingredient._id} />
        });

        let addText;
        let ingredientRowClass = 'ingredientRow';
        let quantityText;
        let noQuantityText;

        if (this.props.isMobile) {
            addText = <i className="fas fa-plus"></i>;
            ingredientRowClass += ' mobileIngredientRow';
            quantityText = 'Qty';
            noQuantityText = 'No Qty';
        } else if (this.props.isTablet) {
            addText = 'Add';
            quantityText = 'Qty';
            noQuantityText = 'No Qty';
        } else {
            addText = 'Add';
            quantityText = 'Quantity';
            noQuantityText = 'No Quantity';
        }

        return (<div className="ingredientsWrapper">
            <div className={ingredientRowClass}>
                <label>Name</label>
                <label>{quantityText}</label>
                <label id="noQuantityH2" data-toggle="tooltip" title="For ingredients we do not wish to add a quantity to. It is always assumed that these ingredients have infinite quantity.">{noQuantityText}</label>
                <label></label>
            </div>

            {ingredientRowsHTML}

            <div className={ingredientRowClass}>
                <div></div>
                <div></div>
                <div></div>
                <button className="btn btn-success" onClick={() => this.addIngredientRow()}>{addText}</button>
            </div>
        </div>);

    }
}

export default IngredientRows;