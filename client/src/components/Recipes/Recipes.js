import React from 'react';
import { withApollo } from 'react-apollo';
import { getRecipeQuery } from '../../queries/queries';

import ChooseAddEditRecipe from '../AddEditRecipeModal/ChooseAddEditRecipe';
import AddRecipeStep1 from '../AddEditRecipeModal/AddRecipeStep1';
import AddRecipeStep2 from '../AddEditRecipeModal/AddRecipeStep2';

import EditRecipeStep1 from '../AddEditRecipeModal/EditRecipeStep1';

class Recipes extends React.Component {
    defaultState = {
        modalStep: 'ChooseAddEditRecipe',
        stepNumber: 0,
        switchModalStep: false, 
        recipeId: '',
        recipeName: '',
        ingredients: [],
        addedRecipe: false,
        updatedRecipe: false,
        showModal: true,
        width: window.innerWidth
    }

    constructor() {
        super();
        this.state = this.defaultState;
    }

    toggleShowModal = () => {
        this.setState((prevState, props) => ({
            showModal: !prevState.showModal
        }), () => {
            if (this.state.showModal === false) {
                this.returnDefaultState();
            }
        });
    }

    handleStepChange = (stepName, stepNumber) => {
        this.setState((prevState, props) => {
            if (prevState.switchModalStep) {
                if (stepName === 'AddRecipeStep') {
                    stepName = 'EditRecipeStep';
                } else { // EditRecipeStep
                    stepName = 'AddRecipeStep';
                }
            }
            return {
                modalStep: stepName,
                stepNumber
            };
        })
    }

    toggleSwitchModalStep = () => {
        this.setState((prevState, props) => {
            return {
                switchModalStep: !prevState.switchModalStep
            };
        });
    }

    returnDefaultState = () => {
        this.setState(this.defaultState);
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

    getRecipe = async() => {
        let idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        let clientId;
        let hasClientId = false;
        if (idToken !== null && idToken.idToken !== undefined) {
            clientId = idToken.idToken.clientId;
            hasClientId = clientId !== undefined && clientId != null;
        }

        if (!hasClientId) {
            console.log('doesnt have clientId');
            return false;
        }

        let variables = {
            name: this.state.recipeName,
            clientId: clientId
        };

        let recipe = await this.props.client.query({
            query: getRecipeQuery,
            variables
        }).then(res => {
            if (!res.data.loading) {
                return res.data.recipe;
            }
        });
        for (let i = 0; i < recipe.ingredients.length; i++) {
            delete recipe.ingredients[i].__typename;
        }
        console.log('getting recipe. recipe is', recipe);
        return recipe;
    }

    setRecipe = recipe => {
        this.setState({
            recipeId: recipe.id,
            recipeName: recipe.name,
            ingredients: recipe.ingredients
        });
    }

    handleIngredientChange = ingredients => {
        this.setState(ingredients);
    }

    removeIngredientIds = () => {
        let ingredients = this.state.ingredients;
        for (let i = 0; i < ingredients.length; i++) {
            delete ingredients[i]._id;
        }
    }

    ingredientsAreEmpty = () => {
        // ingredients is an object with fields
        // - name
        // - quantity (quantity is null if no quantity)

        for (let i = 0; i < this.state.ingredients.length; i++) {
            let ingredient = this.state.ingredients[i];
            if (ingredient.name === undefined || ingredient.name === null || ingredient.name.trim() === '') {
                return true;
            }
            
            if (ingredient.quantity !== undefined && ingredient.quantity !== null) {
                if (ingredient.quantity <= 0) {
                    return true;
                }
            }
        };
        return false;
    }

    addedRecipe = () => {
        this.setState({
            addedRecipe: true
        });
    }

    updatedRecipe = () => {
        this.setState({
            updatedRecipe: true
        });
    }

    resetAddEditRecipe = () => {
        this.setState({
            addedRecipe: false,
            updatedRecipe: false
        });
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

        /*
            ChooseAddEditRecipe
            AddRecipeStep1
            AddRecipeStep2
            EditRecipeStep1
        */

        let showModalData = {
            showModal: this.state.showModal,
            toggleShowModal: this.toggleShowModal
        }

        /*
            ChooseAddEditRecipe
            AddRecipeStep1
            AddRecipeStep2
        */
        let stepData = {
            modalStep: this.state.modalStep,
            handleStepChange: this.handleStepChange,
            stepNumber: this.state.stepNumber,
            switchModalStep: this.state.switchModalStep,
            toggleSwitchModalStep: this.toggleSwitchModalStep
        }

        // AddRecipeStep1
        // AddRecipeStep2
        // EditRecipeStep1
        let recipeData = {
            recipeName: this.state.recipeName,
            recipeId: this.state.recipeId,
            handleRecipeNameChange: this.handleRecipeNameChange,
            recipeNameIsNotEmpty: this.recipeNameIsNotEmpty,
            addedRecipe: this.addedRecipe,
            updatedRecipe: this.updatedRecipe,
            resetAddEditRecipe: this.resetAddEditRecipe,
            getRecipe: this.getRecipe,
            setRecipe: this.setRecipe,
            returnDefaultState: this.returnDefaultState
        }

        // ChooseAddEditRecipe
        let addEditRecipeData = {
            addedRecipe: this.state.addedRecipe,
            updatedRecipe: this.state.updatedRecipe,
            resetAddEditRecipe: this.resetAddEditRecipe
        }

        // AddRecipeStep2
        let ingredientsData = {
            ingredients: this.state.ingredients,
            handleIngredientChange: this.handleIngredientChange,
            ingredientsAreEmpty: this.ingredientsAreEmpty,
            removeIngredientIds: this.removeIngredientIds
        }

        return (<div id="modalContainer">
            <ChooseAddEditRecipe stepData={stepData} addEditRecipeData={addEditRecipeData} showModalData={showModalData} />
            <AddRecipeStep1 stepData={stepData} recipeData={recipeData} showModalData={showModalData} />
            <AddRecipeStep2 isMobile={isMobile} isTablet={isTablet} stepData={stepData} recipeData={recipeData} ingredientsData={ingredientsData} showModalData={showModalData} />
            <EditRecipeStep1 stepData={stepData} recipeData={recipeData} showModalData={showModalData} />
        </div>)
    }
}

export default withApollo(Recipes);