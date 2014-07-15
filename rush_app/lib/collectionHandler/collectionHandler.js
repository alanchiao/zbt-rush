CollectionHandler = function(){
    var that = {};

    var collections = {};


    that.addCollection = function(name, collection, childCols){
        collections[name] = [collection, childCols];
    }

    that.getCollection = function(name){
        return collections[name];
    }

    that.deleteItem = function(collectionName){
       var collection = collections[collectionName];
       
       return function(e){
          var el = e.currentTarget;
          var elId = el.dataset.id;
          collection.remove(elId);
       } 
    }
    
    /** Note the logic currently only handles the case when
    the child collection has only one attribute, with the 
    same name as the collection name (lower-cased) **/

    that.editItem = function(collectionName){
        var collection = collections[collectionName][0];
        var childCols  = collection[collectionName][1];

        return function(e){
            var el = e.currentTarget;
            var elId = el.dataset.id;
            var elAttributes = utils.formToJson(e.target);
            for (var key in childCols){
                if (key in elAttributes){
                    childCol = childCols[key];
                    childCol.insert({key: elAttributes[key]});
                }
            }
                         
            collection.update(elId, {$set: elAttributes}, function(error){
                if(error){
                    throwError(error.reason);
                }
            });
        }
    }

    Object.freeze(that);
    return that;
}();
