$(document).ready(function(){
    
    // Delete button for ingredients
    // $('button.deleteRecipe').on('click', function(e){
    //     var parentTD = e.target.parentElement;
    //     var tr = parentTD.parentElement;
    //     var lastTD = tr.lastElementChild;
    //     var input = lastTD.firstElementChild;
    //     var recipeID = input.value;
        
    //     // DELETE Request to delete Ingredients
    //     $.ajax({
    //         type: 'DELETE',
    //         url: '/recipe/delete/' + recipeID,
    //         success: function(data){
    //             //do something with the data via front-end framework
    //             location.reload();
    //         }
    //     });
    //     return false;
    // });

    // // Make Recipe Button
    // $('button.makeRecipe').on('click', function(e) {
    //     var parentTD = e.target.parentElement;
    //     var tr = parentTD.parentElement;
    //     var lastTD = tr.lastElementChild;
    //     var input = lastTD.firstElementChild;
    //     var recipeID = input.value;

    //     $.ajax({
    //         type: 'POST',
    //         url: '/checkInventory/' + recipeID,
    //         data: JSON.stringify({recipeID: recipeID}),
    //         contentType: 'application/json',
    //         success: function(canMakeRecipe){
    //             if (canMakeRecipe) {
    //                 alert('WE can make it');
    //             }
    //         }
    //     });

    // })

    // Click Ingredient LI to Edit
    $('div.inventoryIngredientsWrapper ul li').on('click', function(e) {
        // if the click hits the input, do nothing
        
        // Checkbox
        // if (e.target.tagName === "LI") {
        //     var checkbox = e.target.nextElementSibling;
        // } else if (e.target.tagName === "INPUT") {
        //     console.log(e.target);
        //     var checkbox = e.target.parentElement.nextElementSibling;
        // }

        if (e.target.tagName === "LI") {      
            var checkbox = e.target.nextElementSibling;

            if (!checkbox.checked) {
                // Uncheck All first
                uncheckAll();

                checkbox.checked = true;
    
                var text = e.target.innerText;
                sessionStorage.setItem('originalText', text); // saves original text to session storage
                e.target.innerText = '';
                
                // Text Input
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('value', text);
    
                e.target.appendChild(input);
                // highlights everything in the input
                input.select();
            }
        }
        
        
        
    });

    // returns true if the click was outside the <tag>
    // returns false if the click 
    function isOutsideClick(e, tag) {
        if (e.target == tag) {
                return false;
        }
        return true;
    }

    // Update Recipe - Ajax Call
    var updateRecipeAJAX = function(recipe) {
        $.ajax({
            type: 'POST',
            url: '/recipe/update',
            data: JSON.stringify(recipe),
            contentType: 'application/json',
            success: function(data){
                location.reload();
            }
        });
    }

    // goes through all checkboxes and unchecks them
    // re-adds recipe if the ingredient is verified
    var uncheckAll = function() {
        // get all LI
        var LIs = document.querySelectorAll('div.inventoryIngredientsWrapper ul li');

        // get corresponding checkboxes
        var checkboxes = document.querySelectorAll('div.inventoryIngredientsWrapper ul input[type="checkbox"]');

        // going through all checkboxes to remove input if checked
        for (var i = 0; i < checkboxes.length; i++) {
            var checkbox = checkboxes[i];
            // if checkbox is checked
            if (checkbox.checked) {
                // uncheck
                checkbox.checked = false;
                
                // get input text
                var li = LIs[i];
                var input = li.firstChild;
                var text = input.value;
                var originalText = sessionStorage.getItem('originalText');

                // remove input
                input.remove();

                // validate input
                text = text.trim();
                
                var regex = /^(\d+\s+)?\D+$/;
                
                var validated = regex.test(text);
                li.innerText = (validated) ? text : originalText;

                if (validated) { // update database if input is valud
                    // re-add recipe to database
                    
                    // get recipeID
                    var recipeID = document.querySelector('div.inventoryWrapper input').value;

                    // get recipe name
                    var recipeName = document.getElementById('recipeName');

                    // make ingredients list
                    var ingredients = [];

                    // LIs
                    var LIs = document.querySelectorAll('div.inventoryIngredientsWrapper ul li');
                    for (var i = 0; i < LIs.length; i++) {
                        var text = LIs[i].innerText;
                        text = text.split(' ');
                        if (text.length === 2) {
                            var ingredient = {
                                name: text[1],
                                quantity: text[0],
                                noQuantity: false
                            };
                        } else {
                            var ingredient = {
                                name: text[0],
                                quantity: 0,
                                noQuantity: true
                            };
                        }
                        ingredients.push(ingredient);
                    }

                    // recipe
                    var recipe = {
                        ID: recipeID,
                        ingredients: ingredients
                    };
                    
                    // AJAX request to update recipe
                    updateRecipeAJAX(recipe);
                    
                }

                

            }
        }
    };

    

    // clicking anywhere in the document
    // will uncheckAll() if anything is checked
    document.addEventListener('click', function(e) {
        var children = document.querySelectorAll('div.inventoryIngredientsWrapper ul *');

        var uncheck = true;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (uncheck) {
                if (!isOutsideClick(e, child)) {
                    uncheck = false;
                }
            } else {
                break;
            }
        }

        if (uncheck) {
            uncheckAll();
        }

        
    });

    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            uncheckAll();
        }
    });
 
});