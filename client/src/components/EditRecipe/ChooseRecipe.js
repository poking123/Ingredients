import React from 'react';
import $ from 'jquery';
import EditRecipeRow from './EditRecipeRow';
import { Link } from "react-router-dom";
import SelectSearch from 'react-select-search';

class ChooseRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: [],
            recipeId: null,
            recipe: null
        };
    }

    handleChange = () => {
        this.setState({
            recipeId: document.querySelector('input[name=recipe]').value
        });
        // alert(document.querySelector('input[name=recipe]').value);
    }

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
                    recipe
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

            let rows = [];
            recipe && recipe.ingredients && recipe.ingredients.forEach(ingredient => {
                rows.push(<EditRecipeRow ingredients={ ingredient } />);
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
                        <div id="recipeContainer">
                            <input type="text" id="editRecipeRecipeName" value={recipe.name}></input>

                            <div className="headerWrapper">
                                <h3>Ingredient Name</h3>
                                <h3>Quantity</h3>
                                <h3 id="noQuantityH3">No Quantity</h3>
                            </div>

                            <div className="ingredientsWrapper">
                                { rows }
                            </div>

                            
                        </div>
                    }
                    
                </div>
            );
          }
    }
}
export default ChooseRecipe;