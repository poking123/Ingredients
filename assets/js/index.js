$(document).ready(function(){
    
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

    // Make Recipe Button
    $('button.makeRecipe').on('click', function(e) {
        var parentTD = e.target.parentElement;
        var tr = parentTD.parentElement;
        var lastTD = tr.lastElementChild;
        var input = lastTD.firstElementChild;
        var recipeID = input.value;

        $.ajax({
            type: 'POST',
            url: '/checkInventory/' + recipeID,
            data: JSON.stringify({recipeID: recipeID}),
            contentType: 'application/json',
            success: function(canMakeRecipe){
                if (canMakeRecipe) {
                    alert('WE can make it');
                }
            }
        });

    })
 
});