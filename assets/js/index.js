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
    $('div.ingredientsWrapper ul li').on('click', function(e) {
        
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
                localStorage.setItem('originalText', text); // saves original text to local storage
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

    function clickOutside(e, tag) {
        if (e.target == tag) {
                return false;
        }
        return true;
    }

    var uncheckAll = function() {
        // get all LI
        var LIs = document.querySelectorAll('div.ingredientsWrapper ul li');

        // get corresponding checkboxes
        var checkboxes = document.querySelectorAll('div.ingredientsWrapper ul input[type="checkbox"]');

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
                var originalText = localStorage.getItem('originalText');

                // remove input
                input.remove();

                // validate input
                text = text.trim();
                
                var regex = /^(\d+\s+)?\D+$/;
                console.log(regex.test(text));

                li.innerText = (regex.test(text)) ? text : originalText;

                // update database if input is valud

            }
        }
    };

    document.addEventListener('click', function(e) {
        var children = document.querySelectorAll('div.ingredientsWrapper ul *');

        var uncheck = true;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (uncheck) {
                if (clickOutside(e, child)) {
                    console.log('outside click');
                    // uncheckAll();
                } else {
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
 
});