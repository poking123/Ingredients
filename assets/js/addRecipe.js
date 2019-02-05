$(document).ready(function(){
    
    // on click to add ingredient
    $('button.addIngredient').on('click', function(e) {
        var ingredientNameInput = document.querySelector('input#ingredientName');
        var ingredientName = ingredientNameInput.value;
        var quantityInput = document.querySelector('input#quantity');
        var quantity = Number(quantityInput.value);
        
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
                    ingredientNameInput.style.borderColor = 'black';
                    quantityInput.style.borderColor = 'black';
                }
            });
        } else {
            if (ingredientName === '' || ingredientName === null) {
                ingredientNameInput.style.borderColor = 'red';
            }
            
            if (quantity <= 0) {
                quantityInput.style.borderColor = 'red';
            }
        }
        
        return false;
    });
    
    // on click to add recipe
    $('#addRecipe').on('click', function(e) {
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

        // POST Request to add Recipes
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
        return false;
    });
    
    // on click for X next to ingredients
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
    
});