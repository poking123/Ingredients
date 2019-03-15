$(document).ready(function() {

    // No Quantity Checkmark - Checked
    // Gray Out Quantity Input
    var noQuantities = document.getElementsByClassName('ingredientNoQuantity');

    var noQuantityCheck = function(e) {
        var noQuantityCheckbox = e.target;
        var quantityInput = noQuantityCheckbox.previousElementSibling;
        var ingredientID = noQuantityCheckbox.nextElementSibling;
        if (noQuantityCheckbox.checked) { // Is Checked
            // Clear out Quantity Input, Gray it out, and don't let people type in it
            quantityInput.style.backgroundColor = 'gray';
            quantityInput.disabled = true;
            sessionStorage.setItem(ingredientID.value, quantityInput.value);
            quantityInput.value = '';
        } else { // Is Not Checked
            quantityInput.style.backgroundColor = 'white';
            quantityInput.disabled = false;
            quantityInput.value = sessionStorage.getItem(ingredientID.value);
        }
    };

    for (var i = 0; i < noQuantities.length; i++) {
        var noQuantity = noQuantities[i];
        noQuantity.addEventListener('change', noQuantityCheck);
    }


    
    
    // Edit Recipe - Save Button
    $('button.editRecipe').on('click', function(e){
        var ingredientsList = [];
        
        var ingredientsWrapper = document.querySelector('div.ingredientsWrapper');

        // Creates a List of all Ingredients
        for (var i = 0; i < ingredientsWrapper.children.length; i++) {
            var row = ingredientsWrapper.children[i];

            var ingredientName = row.children[0].value;
            var ingredientQuantity = row.children[1].value;
            var ingredientNoQuantity = row.children[2].checked;

            var ingredient = {
                name: ingredientName,
                quantity: ingredientQuantity,
                noQuantity: ingredientNoQuantity
            };
            ingredientsList.push(ingredient);
        }
        
        // save button
        var save = document.querySelector('button.editRecipe');
        // recipeID in hidden input next to save button
        var recipeID = save.nextElementSibling.value;
        
        var recipeName = document.getElementById('editRecipeRecipeName').value;
        var recipe = {
            name: recipeName.value,
            ingredients: ingredientsList
        };
        
        // POST Request to update Ingredients
        $.ajax({
            type: 'POST',
            url: 'Edit_Recipe/recipe/update/' + recipeID,
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: function(data){
              // redirect to the home page (index.js)
              location.href = '/';
            }
        });

        return false;

    });
    
    var deleteRow = function(e) {
        var ingredientRow = e.target.parentElement;
        var ingredientID = e.target.previousElementSibling;
        sessionStorage.removeItem(ingredientID.value);
        ingredientRow.remove();
    }
    
    // Edit Recipe Page - Delete Row
    $('button.deleteRow').on('click', deleteRow);
    
    var recipeName = document.querySelector('input#editRecipeRecipeName');
    recipeName.minLength = 8;
    recipeName.maxLength = 64;
    // Edit Recipe Page - Resize Input
    recipeName.addEventListener('input', resizeInput);
    resizeInput.call(document.querySelector('input#editRecipeRecipeName'));
    function resizeInput() {
        this.style.width = this.value.length + "ch";
    }

    // Quantity Input Restrictions
    var ingredientQuantities = document.querySelectorAll('input.ingredientQuantity');
    var noDash = function(e) {
        if (e.key === '-' || e.key === '+') {
            e.preventDefault();
        }
    };
    var noDashPaste = function(e) {
        if (e.clipboardData.getData('text').includes('-') || e.clipboardData.getData('text').includes('+')) {
            e.preventDefault();
        }
    };

    for (var i = 0; i < ingredientQuantities.length; i++) {
        // Do Not Allow User to Enter '-' in quantity input
        ingredientQuantities[i].addEventListener('keydown', noDash);
        // Do Not Allow User to Paste '-' in quantity input
        ingredientQuantities[i].addEventListener('paste', noDashPaste);
    }
    
});