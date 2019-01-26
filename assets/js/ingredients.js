$(document).ready(function(){
    
    // POST Request to add Ingredients
    $('button.addIngredient').on('click', function(){
        
        var ingredientName = $('form input#ingredientName');
        var quantity = $('form input#quantity');
        var data = {
            ingredientName: ingredientName.val(),
            quantity: quantity.val()
        };

        // sends a post request
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
    
    // DELETE Request to delete Ingredients
    $('p.xButton').on('click', function(e){
        var ingredientName = e.target.id;
        // sends a delete request
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
    
});