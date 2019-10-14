import React from 'react';
import $ from 'jquery';
import IngredientRows from '../RecipeInput/IngredientRows';
import { Link } from "react-router-dom";
import SelectSearch from 'react-select-search';
import { runInThisContext } from 'vm';

class ChooseRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: [],
            recipeId: null,
            recipe: null,
            editRecipeName: null,
            editRecipeIngredients: []
        };
    }

    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: '/api/recipes/',
            contentType: 'application/json',
            success: recipes => {
                this.setState({
                    isLoaded: true,
                    recipes
                });
            },
            error: (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSave = e => {
        console.log('got here');
        let editedRecipe = {
            name: this.state.editRecipeName,
            ingredients: this.state.editRecipeIngredients
        };

        $.ajax({
            type: 'POST',
            url: '/api/recipes/updateRecipe/' + this.state.recipeId,
            contentType: 'application/json',
            data: JSON.stringify(editedRecipe),
            success: recipes => {
                window.location.href = '/';
                console.log('updated recipe');
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    printRecipe = () => {
        this.state.editRecipeIngredients.forEach(ing => {
            console.log('name is', ing.name);
            console.log('quantity is', ing.quantity);
        });
    }

    handleEditRecipeRowChange = (e, index) => {
        let targetName = e.target.name;
        let newIngredientValue = e.target.value;

        let ingredient = this.state.editRecipeIngredients[index];

        let newEditRecipeIngredients = this.state.editRecipeIngredients;

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
        newEditRecipeIngredients[index] = ingredient;
        this.setState({editRecipeIngredients: newEditRecipeIngredients});
    }

    deleteEditRecipeIngredient = index => {
        let newEditRecipeIngredients = this.state.editRecipeIngredients;
        newEditRecipeIngredients.splice(index, 1);
        this.setState({editRecipeIngredients: newEditRecipeIngredients});
    }

    addIngredientRow = () => {
        let newEditRecipeIngredients = this.state.editRecipeIngredients;
        newEditRecipeIngredients.push({
            name: '',
            quantity: 0
        });
        this.setState({editRecipeIngredients: newEditRecipeIngredients});
    }

    // handleChange = () => {
    //     this.setState({
    //         recipeId: document.querySelector('input[name=recipe]').value
    //     });
    //     // alert(document.querySelector('input[name=recipe]').value);
    // }

    setRecipeId = () => {
        const recipeSelect = document.getElementById('recipeSelect');
        const recipeId = recipeSelect.options[recipeSelect.selectedIndex].value;
        if (recipeId !== '') {
            this.setState({
                recipeId: recipeId
            });
            this.setRecipe(recipeId);
        } else {
            this.setState({
                recipeId: null,
                recipe: null
            });
        }
        
    }

    setRecipe = (recipeId) => {
        $.ajax({
            type: 'GET',
            url: '/api/recipes/' + recipeId,
            contentType: 'application/json',
            success: recipe => {
                this.setState({
                    isLoaded: true,
                    recipe,
                    editRecipeName: recipe.name,
                    editRecipeIngredients: recipe.ingredients
                });
            },
            error: (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                    editRecipeName: null,
                    editRecipeIngredients: []
                });
            }
        });
    }

    render() {
        const { error, isLoaded, recipes, recipe } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            const newRecipes = recipes.map(recipe => {
                return {...recipe, value: recipe._id}
            });

            const selectOptions = recipes.map(recipe => {
                return <option value={recipe._id} key={recipe._id}>{recipe.name}</option>
            });

            return (
                <div id="chooseRecipeContainer">
                    <h1>Edit Recipe</h1>
                    <div id="selectSearchContainer">
                        {/* This ia a better looking search, but I'm just gonna switch to a select to make it work */}
                        {/* <SelectSearch options={newRecipes} onChange={() => this.handleChange()} value="" name="recipe" placeholder="Search For A Recipe" /> */}
                            <select id="recipeSelect" onChange={() => this.setRecipeId()}>
                                <option value="">Select your option</option>
                                {selectOptions}
                            </select>
                    </div>

                    { this.state.recipeId && this.state.recipe &&
                        <div id="editRecipeContainer">
                            <input type="text" id="editRecipeRecipeName" name="editRecipeName" value={recipe.name} onChange={e => this.handleChange(e)}></input>

                            <div className="ingredientsWrapper">
                                <IngredientRows ingredients={this.state.editRecipeIngredients}/>
                            </div>

                            <button type="button" className="btn btn-info editRecipe" onClick={(e) => this.handleSave(e)}>Save</button>
                            
                        </div>
                    }
                    
                </div>
            );
          }
    }
}
export default ChooseRecipe;