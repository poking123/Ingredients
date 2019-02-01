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
 
});