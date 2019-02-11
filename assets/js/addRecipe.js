$(document).ready(function(){
    
    // on click to add ingredient
    $('button.addIngredient').on('click', function(e) {
        var ingredientNameInput = document.querySelector('input#ingredientName');
        var ingredientName = ingredientNameInput.value;
        var quantityInput = document.querySelector('input#quantity');
        var quantity = Number(quantityInput.value);
        
        // checking that the ingredient name is not empty
        // and the quantity is greater than 0
        if (ingredientName !== '' && ingredientName !== null && quantity > 0) {
            
            var ingredient = {
                name: ingredientName,
                quantity: quantity
            };


            // POST Request to add Ingredients
            $.ajax({
                type: 'POST',
                url: 'Add_Recipe/ingredient/add',
                data: JSON.stringify(ingredient),
                contentType: 'application/json',
                success: function(data){
                    //do something with the data via front-end framework
                    location.reload();
                    // sets the borders back to the color black
                    ingredientNameInput.style.borderColor = 'black';
                    quantityInput.style.borderColor = 'black';
                }
            });
        } else { // error
            // No Input for Ingredient Name
            var nameError = document.getElementById('nameError');
            var ingredientlabel = document.getElementById('ingredientNameLabel');
            if (ingredientName === '' || ingredientName === null) {
                // red border
                ingredientNameInput.style.borderColor = 'red';
                // red error message (span)
                nameError.innerText = 'Please Input an Ingredient Name';
                nameError.style.color = 'red';
                // red label - Ingredient Name
                ingredientlabel.style.color = 'red';
            } else {
                ingredientNameInput.style.borderColor = 'black';
                nameError.style.display = 'none';
                ingredientlabel.style.color = 'black';
            }
            
            // Quantity Input 0 or less
            var quantityError = document.getElementById('quantityError');
            var quantityLabel = document.getElementById('quantityLabel');
            if (quantity <= 0) {
                // red border
                quantityInput.style.borderColor = 'red';
                // red error message (span)
                quantityError.innerText = 'Please Input a Positive Quantity';
                quantityError.style.color = 'red';
                // red label - Ingredient Name
                quantityLabel.style.color = 'red';
            } else {
                quantityInput.style.borderColor = 'black';
                quantityError.style.display = 'none';
                quantityLabel.style.color = 'black';
            }
        }
        
        return false;
    });
    
    // Delete Ingredient - on click for X next to ingredients
    $('p.xButton').on('click', function(e) {
        var ingredientName = e.target.previousElementSibling;
        
        // DELETE Request to delete Ingredients
        $.ajax({
            type: 'DELETE',
            url: 'Add_Recipe/ingredient/delete/' + ingredientName.innerText,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });

        return false;

    });

    // Add Recipe - Ajax Call
    var addRecipe = function(recipe) {
        $.ajax({
            type: 'POST',
            url: 'Add_Recipe/recipe/add',
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: function(data){
              //do something with the data via front-end framework
              location.href = '/';
            }
        });
    }

    // Add Recipe
    $('input#addRecipe').on('click', function(e) {
        e.preventDefault();
        var recipeName = document.querySelector('input[name="recipeName"]');
        var ingredients = [];
        var lis = document.querySelectorAll('ul.ingredients li');
        
        lis.forEach(function(li) {
            // order of <p> in li
            // 0 - quantity
            // 1 - name
            // 2 - X
            
            var ingredient = {
                name: li.children[1].innerText,
                quantity: Number(li.children[0].innerText)
            };
            ingredients.push(ingredient);
        });

        var recipe = {
            name: recipeName.value,
            ingredients: ingredients
        };

        // Error Checking
        var hasName = false;
        if (recipe.name !== '' && recipe.name !== null) {
            hasName = true;
        }

        var hasIngredients = false;
        if (recipe.ingredients.length !== 0) {
            hasIngredients = true;
        }

        // Checks If Recipe Name is already used
        $.ajax({
            type: 'POST',
            url: 'Add_Recipe/checkIfNameExists',
            data: JSON.stringify({recipeName: recipeName.value}),
            contentType: 'application/json',
            success: function(nameAlreadyExists) {
                console.log(nameAlreadyExists);
                if (!nameAlreadyExists && hasName && hasIngredients) {
                    addRecipe(recipe); // Add Recipe - Ajax Call
                    return false;
                } else {
                    var recipeNameLabel = document.getElementById('recipeNameLabel');
                    var recipeNameSpan = document.getElementById('recipeNameError');
                    if (nameAlreadyExists) { // Name already exists
                        recipeNameSpan.style.display = 'inline';
                        recipeNameSpan.innerText = recipeName.value + ' is already in the database.';
                        recipeNameSpan.style.color = 'red';

                        recipeNameLabel.style.color = 'red';
                        recipeName.style.borderColor = 'red';
                    } else {
                        recipeNameSpan.style.display = 'none';
                        recipeNameLabel.style.color = 'black';
                        recipeName.style.borderColor = 'black';
                    }

                    if (!hasName) { // No Name
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

                    if (!hasIngredients) { // No ingredients
                        var ingredientListSpan = document.getElementById('ingredientListError');
                        ingredientListSpan.innerText = 'Please Add Ingredients To The Recipe';
                        ingredientListSpan.style.color = 'red';
                    }
                }
            }
        });
        
        

        
    });
    
    // Quantity Input Restrictions
    var quantity = document.getElementById('quantity');
    var noDash = function(e) {
        if (e.key === '-' || e.key === '+') {
            e.preventDefault();
        }
    };
    // Do Not Allow User to Enter '-' in quantity input
    quantity.addEventListener('keydown', noDash);
    
    var noDashPaste = function(e) {
        if (e.clipboardData.getData('text').includes('-') || e.clipboardData.getData('text').includes('+')) {
            e.preventDefault();
        }
    };
    // Do Not Allow User to Paste '-' in quantity input
    quantity.addEventListener('paste', noDashPaste);    
});