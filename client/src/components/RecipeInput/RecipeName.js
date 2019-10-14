import React from 'react';

function RecipeName({recipeName, handleRecipeChangeName}) {

    return (<div>
        <h2>Recipe Name</h2>
        <input type="text" placeholder="Recipe Name" value={recipeName} onChange={(e) => handleRecipeChangeName(e.target.value)} />
    </div>);
}

export default RecipeName;