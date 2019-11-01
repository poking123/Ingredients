import React from 'react';
import ChooseAddEditRecipe from '../AddEditRecipeModal/ChooseAddEditRecipe';
import AddRecipeStep1 from '../AddEditRecipeModal/AddRecipeStep1';
import AddRecipeStep2 from '../AddEditRecipeModal/AddRecipeStep2';

class Recipes extends React.Component {
    constructor() {
        super();
        this.state = {
            modalStep: 'ChooseAddEditRecipe',
            stepNumber: 0,
            recipeName: '',
            ingredients: [],
            showModal: true,
            width: window.innerWidth
        }
    }

    handleStepChange = (stepName, stepNumber) => {
        this.setState({
            modalStep: stepName,
            stepNumber
        });
    }

    handleRecipeNameChange = e => {
        this.setState({
            recipeName: e.target.value
        });
    }

    recipeNameIsNotEmpty = () => {
        let recipeName = this.state.recipeName.trim();
        return recipeName !== null && recipeName !== undefined && recipeName !== '';
    }

    handleIngredientChange = () => {

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ 
            width: window.innerWidth 
        });
    };

    render() {
        const { width } = this.state;
        let isMobile;
        let isTablet;

        if (width <= 479) { // max of most phones
            isMobile = true;
            isTablet = false;
        } else if (width <= 991) { // max of most large tablets
            isMobile = false;
            isTablet = true;
        } else { // Desktop
            isMobile = false;
            isTablet = false;
        }

        let stepData = {
            modalStep: this.state.modalStep,
            handleStepChange: this.handleStepChange,
            stepNumber: this.state.stepNumber
        }

        let recipeNameData = {
            recipeName: this.state.recipeName,
            handleRecipeNameChange: this.handleRecipeNameChange,
            recipeNameIsNotEmpty: this.recipeNameIsNotEmpty
        }

        let ingredientsData = {
            ingredients: this.state.ingredients,
            handleIngredientChange: this.handleIngredientChange
        }

        return (<div id="modalContainer">
            <ChooseAddEditRecipe stepData={stepData} />
            <AddRecipeStep1 stepData={stepData} recipeNameData={recipeNameData} />
            <AddRecipeStep2 isMobile={isMobile} isTablet={isTablet} stepData={stepData} ingredientsData={ingredientsData} />
        </div>)
    }
}

export default Recipes;