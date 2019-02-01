$(document).ready(function(){
    
    // Edit Recipe - Save Button
    $('button.editRecipe').on('click', function(e){
        var ingredientsList = [];
        
        var tbody = document.getElementById('recipeTableBody');
        // each ingredient is a row (tr) in the table
        var trs = tbody.children;
        // skips the first header and the last add ingredient button
        for (var i = 1; i < trs.length - 1; i++) {
            var tr = trs[i];
            var ingredientTD = tr.children[0];
            var quantityTD = tr.children[1];
            var ingredientInput = ingredientTD.children[0];
            var quantityInput = quantityTD.children[0];
            
            var ingredient = {
                name: ingredientInput.value,
                quantity: Number(quantityInput.value)
            };
            ingredientsList.push(ingredient);
        }
        
        // save button
        var save = document.querySelector('button.editRecipe');
        // recipeID in hidden input next to save button
        var recipeID = save.nextElementSibling.value;
        
        var recipeName = document.getElementById('editRecipeName');
        var recipe = {
            name: recipeName.value,
            ingredients: ingredientsList
        };
        
        // POST Request to update Ingredients
        $.ajax({
            type: 'POST',
            url: '/recipe/update/' + recipeID,
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: function(data){
              // redirect to the home page (index.js)
              location.href = '/';
            }
        });

        return false;

    });
    
    // Edit Recipe Page - Add Row
    $('button#addIngredientRow').on('click', function(e) {
        var td = e.target.parentElement;
        var tr = td.parentElement;
        var tbody = tr.parentElement;
        var lastTR = tbody.lastElementChild;
        tbody.removeChild(lastTR);
        
        var newTR = document.createElement('tr');
        var quantityTD = document.createElement('td');
        var ingredientTD = document.createElement('td');
        var deleteTD = document.createElement('td');
        
        // quantityTD
        var quantityInput = document.createElement('input');
        quantityInput.setAttribute('type', 'number');
        quantityTD.appendChild(quantityInput);
        
        // ingredientTD
        var ingredientInput = document.createElement('input');
        ingredientInput.setAttribute("type", "text");
        ingredientTD.appendChild(ingredientInput);
        
        // deleteTD
        var button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'deleteRow');
        var buttonText = document.createTextNode('Delete');
        button.appendChild(buttonText);
        button.setAttribute('type', 'button');
        button.addEventListener('click', deleteRow);
        deleteTD.appendChild(button);
        
        // appending to new tr
        newTR.appendChild(ingredientTD);
        newTR.appendChild(quantityTD);
        newTR.appendChild(deleteTD);
        
        tbody.appendChild(newTR);
        tbody.appendChild(lastTR);
    });
    
    var deleteRow = function(e) {
        var td = e.target.parentElement;
        var tr = td.parentElement;
        var tbody = tr.parentElement;
        tbody.removeChild(tr);
    }
    
    // Edit Recipe Page - Delete Row
    $('button.deleteRow').on('click', deleteRow);
    
    var recipeName = document.querySelector('input#editRecipeName');
    recipeName.minLength = 8;
    recipeName.maxLength = 64;
    // Edit Recipe Page - Resize Input
    recipeName.addEventListener('input', resizeInput);
    resizeInput.call(document.querySelector('input#editRecipeName'));
    function resizeInput() {
        this.style.width = this.value.length + "ch";
    }
    
});