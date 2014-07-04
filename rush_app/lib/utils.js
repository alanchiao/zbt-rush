//Class for random user interface related utility functions
Utils = function(){
    var that = Object.create(Utils.prototype);

    /* Upon click of a, swap b and c */
    that.onSwap = function(a, b, c){
        $(a).click(function(){
            
        });
    }

    /* Set up listener to depress single element in
    list upon click. Undepress previously depressed
    element */
    that.selectInList = function(listSelector){

    }
    
    that.formToJson = function(form){
       var json = {};
       $(form).find('.input-field').each(function(){
           var fieldName = $(this).attr('name');
           json[fieldName] = $(this).val();
           $(this).val('');
       });
       return json;
    }
    
    //prevent modification of object slots
    Object.freeze(that);
    return that;
}

utils = Utils();
