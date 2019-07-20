import React from 'react';

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: []
        };
    }

    render() {
        return (
            <div id="EditRecipeContainer"></div>
        )
    }
    
}


export default EditRecipe;