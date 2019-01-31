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
    
    // on click to add recipe
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
              location.href = '/';
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
        var parentTD = e.target.parentElement;
        var tr = parentTD.parentElement;
        var lastTD = tr.lastElementChild;
        var input = lastTD.firstElementChild;
        var recipeID = input.value;
        
        // DELETE Request to delete Ingredients
        $.ajax({
            type: 'DELETE',
            url: '/recipe/delete/' + recipeID,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });

        return false;

    });
    
    // Edit Recipe - Save Button
    $('button.editRecipe').on('click', function(e){
        var recipeName = document.getElementById('recipeName');
        
        var tbody = document.getElementById('recipeTableBody');
        var tr = tbody.children[1];
        var tdQuantity = tr.children[1].children;
        var tdIngredient = tr.children[2].children;
        console.log(tdQuantity);
        var quantites = [];
        var ingredients = [];
        
        for (var i = 0; i < tdQuantity.length; i++) {
            quantites.push(Number(tdQuantity[i].value));
            ingredients.push(tdIngredient[i].value);
        }
        
        var ingredientsList = [];
        
        for (var i = 0; i < quantites.length; i++) {
            var ingredient = {
                name: ingredients[i],
                quantity: quantites[i]
            };
            ingredientsList.push(ingredient);
        }
        
        var save = document.querySelector('button.editRecipe');
        var recipeID = save.nextElementSibling.value;
        
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
              //do something with the data via front-end framework
              location.href = '/';
            }
        });

        return false;

    });
    
});