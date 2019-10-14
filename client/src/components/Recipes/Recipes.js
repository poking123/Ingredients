import React from 'react';
import ChooseAddEditRecipe from '../AddEditRecipeModal/ChooseAddEditRecipe';
import AddRecipeStep1 from '../AddEditRecipeModal/AddRecipeStep1';

class Recipes extends React.Component {
    constructor() {
        super();
        this.state = {
            modalStep: 'ChooseAddEditRecipe',
            recipeName: '',
            ingredients: [],
            showModal: true,
            width: window.innerWidth
        }
    }

    handleStepChange = stepName => {
        this.setState({
            modalStep: stepName
        });
    }

    handleRecipeChangeName = recipeName => {
        this.setState({
            recipeName
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

        return (<div id="modalContainer">
            <ChooseAddEditRecipe modalStep={this.state.modalStep} handleStepChange={this.handleStepChange} />
            <AddRecipeStep1 isMobile={isMobile} isTablet={isTablet} modalStep={this.state.modalStep} handleStepChange={this.handleStepChange} recipeName={this.state.recipeName} handleRecipeChangeName={this.handleRecipeChangeName} />
        </div>)
    }
}

export default Recipes;