$(document).ready(function(){
    
    // on click to add ingredient
    $('button.addIngredient').on('click', function(e){
        e.preventDefault();
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
                
//                var recipeName = document.querySelector('input[name="recipeName"]');
//                recipeName.value = "hiihihihi";
                
            }
        });
        return false;
    });
    
    // on submit to add recipe
    $('#addRecipe').on('click', function(e){
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
            url: '/recipe/add',
            data: JSON.stringify(recipe),
            contentType: 'application/json',
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