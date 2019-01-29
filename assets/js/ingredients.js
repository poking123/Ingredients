$(document).ready(function(){
    
    // on click to add ingredient
    $('button.addIngredient').on('click', function(){
        
        var ingredientName = $('form input#ingredientName');
        var quantity = $('form input#quantity');
        var data = {
            ingredientName: ingredientName.val(),
            quantity: quantity.val()
        };

        // POST Request to add Ingredients
        $.ajax({
            type: 'POST',
            url: '/',
            data: data,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });
        return false;
    });
    
    // on submit to add recipe
    $('form#addRecipe').on('submit', function(){
        
        var recipeName = document.querySelector('input[name="recipeName"]');
        var ingredients = [];
        var lis = document.querySelectorAll('ul.ingredients li.include');
        lis.forEach(function(li) {
            var ingredient = {
                name: li[1].innerText,
                quantity: li[0].innerText
            };
            ingredients.push(ingredient);
        });
        var recipe = {
            name: recipeName.val(),
            ingredients: ingredients
        };
        

        // POST Request to add Recipes
        $.ajax({
            type: 'POST',
            url: '/recipe',
            data: recipe,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });
        return false;
    });
    
    // on click for X next to ingredients
    $('p.xButton').on('click', function(e){
        var ingredientName = e.target.id;
        
        // DELETE Request to delete Ingredients
        $.ajax({
            type: 'DELETE',
            url: '/' + ingredientName,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });

        return false;

    });
    
    // Delete button for ingredients
    $('button.deleteRecipe').on('click', function(e){
        var recipeID = e.target.id;
        
        // DELETE Request to delete Ingredients
        $.ajax({
            type: 'DELETE',
            url: '/recipe/' + recipeID,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });

        return false;

    });
    
});