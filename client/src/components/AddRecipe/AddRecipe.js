import React from 'react';
import $ from 'jquery';
import IngredientList from './IngredientList';
import pluralize from 'pluralize';
import uuidv4 from 'uuid/v4';

class AddRecipe extends React.Component {
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

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        }, () => {
            if (target.id === 'ingredientNameInput') {
                if (value === '' || value === null) {
                    this.setState({ hasIngredientName: false});
                } else {
                    this.setState({ hasIngredientName: true});
                }
            } else if (target.id === 'quantityInput') {
                if (this.value <= 0) {
                    this.setState({ hasQuantity: false});
                } else {
                    this.setState({ hasQuantity: true});
                }
            } else if (target.id === 'noQuantityInput') {
                this.noQuantityInputCheck();
            } else if (target.id === 'recipeNameInput') {
                if (value === '' || value === null) {
                    this.setState({ hasRecipeName: false});
                } else {
                    this.setState({ hasRecipeName: true});
                }
            }
        });
    }

    noQuantityInputCheck = () => {

        let quantityInput = document.querySelector('#quantityInput');// get input
        let quantityError = document.getElementById('quantityError');
        let quantityLabel = document.getElementById('quantityLabel');
        
        if (this.state.noQuantity) { // Is Checked
            // Clear out Quantity Input, Gray it out, and don't let people type in it
            quantityInput.style.backgroundColor = 'gray';
            quantityInput.disabled = true;
            sessionStorage.setItem('ingredientQuantity', quantityInput.value);
            this.setState({quantity: sessionStorage.getItem('ingredientQuantity')});
            // quantityInput.value = '';

            // remove errors
            quantityInput.style.borderColor = 'black';
            quantityError.style.display = 'none';
            quantityLabel.style.color = 'black';
        } else { // Is Not Checked
            quantityInput.style.backgroundColor = 'white';
            quantityInput.disabled = false;
            this.setState({quantity: sessionStorage.getItem('ingredientQuantity')});
            // quantityInput.value = ;
        }
    }

    addIngredient = (e) => {
        e.preventDefault();

        
        var ingredientName = this.state.ingredientName;
        var quantity = this.state.quantity;
        var noQuantity = this.state.noQuantityInput;

        
        // checking that the ingredient name is not empty
        // and the quantity is greater than 0
        if (this.state.hasIngredientName && (this.state.hasQuantity || this.state.noQuantity)) { // No Error
            // Clears the SessionStorage of the ingredientQuantity
            sessionStorage.removeItem('ingredientQuantity');

            var ingredient = {
                name: pluralize(ingredientName, quantity),
                quantity: quantity,
                noQuantity: noQuantity,
                key: uuidv4()
            };

            this.setState({
                ingredientsList: [...this.state.ingredientsList, ingredient],
                recipeName: '',
                ingredientName: '',
                quantity: '',
                noQuantity: false
            });


        }
        this.handleIngredientNameError();
        this.handleQuantityError();
    }

    handleIngredientNameError = () => {
        const ingredientNameInput = document.getElementById('ingredientNameInput');
        const nameError = document.getElementById('nameError');
        const ingredientlabel = document.getElementById('ingredientNameLabel');

        if (!this.state.hasIngredientName) {
            ingredientNameInput.style.borderColor = 'red';
            
            nameError.innerText = 'Please Input an Ingredient Name';
            nameError.style.color = 'red';
            
            ingredientlabel.style.color = 'red';
        } else {
            ingredientNameInput.style.borderColor = 'black';
            nameError.style.display = 'none';
            ingredientlabel.style.color = 'black';
        }
    }

    handleQuantityError = () => {
        const quantityInput = document.getElementById('quantityInput');
        const quantityError = document.getElementById('quantityError');
        const quantityLabel = document.getElementById('quantityLabel');

        if (!this.state.hasQuantity && !this.state.noQuantity) {
            quantityInput.style.borderColor = 'red';
            
            quantityError.innerText = 'Please Input a Positive Quantity';
            quantityError.style.color = 'red';
            
            quantityLabel.style.color = 'red';
        } else {
            quantityInput.style.borderColor = 'black';
            quantityError.style.display = 'none';
            quantityLabel.style.color = 'black';
        }
    }

    handleRecipeNameError = (nameAlreadyExists) => {
        const recipeNameLabel = document.getElementById('recipeNameLabel');
        const recipeNameSpan = document.getElementById('recipeNameError');
        const recipeName = document.getElementById('recipeNameInput');

        if (nameAlreadyExists) { // Name already exists
            recipeNameSpan.style.display = 'inline';
            recipeNameSpan.innerText = this.state.recipeName + ' is already in the database.';
            recipeNameSpan.style.color = 'red';

            recipeNameLabel.style.color = 'red';
            recipeName.style.borderColor = 'red';
            return;
        } else {
            recipeNameSpan.style.display = 'none';
            recipeNameLabel.style.color = 'black';
            recipeName.style.borderColor = 'black';
        }

        if (!this.state.hasRecipeName) { // No Name
            recipeNameSpan.style.display = 'inline';
            recipeNameSpan.innerText = 'Recipe Name Cannot Be Blank.';
            recipeNameSpan.style.color = 'red';

            recipeNameLabel.style.color = 'red';
            recipeName.style.borderColor = 'red';
        } else {
            if (!nameAlreadyExists) {
                recipeNameSpan.style.display = 'none';
                recipeNameLabel.style.color = 'black';
                recipeName.style.borderColor = 'black';
            }
        }
    }

    handleIngredientsListError = () => {
        var ingredientListSpan = document.getElementById('ingredientListError');

        if (this.state.ingredientsList.length <= 0) {
            ingredientListSpan.innerText = 'Please Add Ingredients To The Recipe';
            ingredientListSpan.style.color = 'red';
        }
    }

    // Delete Ingredient - on click for X next to ingredients
    deleteIngredient = (e, key) => {
        this.setState(prevState => ({
            ingredientsList: prevState.ingredientsList.filter(i => i.key !== key)
        }));
    };

    addRecipe = (e) => {
        e.preventDefault();

        var recipe = {
            name: this.state.recipeName,
            ingredients: this.state.ingredientsList
        };

        // Checks If Recipe Name is already used
        $.ajax({
            type: 'POST',
            url: '/api/recipes/checkIfNameExists',
            data: JSON.stringify({recipeName: this.state.recipeName}),
            contentType: 'application/json',
            success: (nameAlreadyExists) => {
                if (!nameAlreadyExists && this.state.hasRecipeName && this.state.ingredientsList.length > 0) {
                    this.addRecipeAJAX(recipe); // Add Recipe - Ajax Call
                    return false;
                }
                this.handleRecipeNameError();
                this.handleIngredientsListError();
            }
        });
    }

    noDashPaste = (e) => {
        if (e.clipboardData.getData('text').includes('-') || e.clipboardData.getData('text').includes('+')) {
            e.preventDefault();
        }
    }

    noKeyDownDash = (e) => {
        if (e.key === '-' || e.key === '+') {
            e.preventDefault();
        }
    };

    // Add Recipe - Ajax Call
    addRecipeAJAX = (recipe) => {
        $.ajax({
            type: 'POST',
            url: '/api/recipes/addRecipe',
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: (data) => {
                //do something with the data via front-end framework
                window.location.href = '/';
            }
        });
    }

    

    render() {
        return (<div id="AddRecipeContainer">
            <h1>Add Recipe</h1>
            <form>
                <label id="recipeNameLabel">Recipe Name:</label>
                <input type="text" name="recipeName" id="recipeNameInput" value={this.state.recipeName} onChange={this.handleInputChange}  />
                <span id="recipeNameError"></span>
                <br /><br />

                <div id="ingredientInputWrapper">
                    {/* Ingredient Name Input */}
                    <div id="ingredientNameInputWrapper">
                        <label id="ingredientNameLabel">Ingredient Name:</label>
                        <input type="text" name="ingredientName" id="ingredientNameInput" value={this.state.ingredientName} onChange={this.handleInputChange} />
                        <span id="nameError"></span>
                    </div>

                    {/* Quantity Input */}
                    <div id="quantityInputWrapper">
                        <label id="quantityLabel">Quantity:</label>
                        <input type="number" name="quantity" id="quantityInput" min="0" value={this.state.quantity} onChange={this.handleInputChange} onPaste={this.noDashPaste} onKeyDown={this.noKeyDownDash} />
                        <span id="quantityError"></span>
                    </div>

                    <div id="noQuantityInputWrapper">
                        <label id="noQuantityLabel" data-toggle="tooltip" title="For ingredients we do not wish to add a quantity to. It is always assumed that these ingredients have infinite quantity.">
                            No Quantity:
                        </label>
                        <input type="checkbox" id="noQuantityInput" name="noQuantity" checked={this.state.noQuantity} onChange={this.handleInputChange} />
                    </div>
                    
                    {/* Add Ingredient Button */}
                    <div>
                        <button className="btn btn-primary addIngredient" onClick={this.addIngredient}>Add Ingredient</button><br />
                    </div>
                    
                </div>
                {/* End Ingredient Input Wrapper */}

                <span id="ingredientListError"></span>

                {/*    List of Added Ingredients */}
                <ul className="ingredients">
                    <IngredientList ingredientsList={this.state.ingredientsList} deleteIngredient={this.deleteIngredient}/>
                </ul>

                <br /><br />

                {/* Add Recipe Button */}
                <input type="submit" name="submit" value="Add Recipe" id="addRecipe" onClick={this.addRecipe} />
                <span id="recipeNameError"></span>
            </form>
        </div>)
    }
}


export default AddRecipe;