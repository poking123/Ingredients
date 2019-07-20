import React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

class ChooseRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: '/api/recipes/',
            contentType: 'application/json',
            success: recipes => {
                this.setState({
                    recipes: recipes
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    render() {
        const recipes = this.state.recipes.map(recipe => 
            <Link className="dropdown-item" to={"/Edit_Recipe/recipe/" + recipe._id} key={recipe._id}>
                {recipe.name}
            </Link>
        );

        return (
            <div id="chooseRecipeContainer">
                <div className="form-group" id="RecipeSelectorForm">
                    <label htmlFor="RecipeSelector">Recipe Search</label>
                    <input type="text" className="form-control" id="RecipeSelector" placeholder="Search For A Recipe" />
                </div>
            </div>
        );
    }
}
export default ChooseRecipe;