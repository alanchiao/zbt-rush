CollectionHandler = function(){
    var that = {};

    var collections = {};


    that.addCollection = function(name, collection){
        collections[name] = collection;
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

    that.editItem = function(collectionName){
        var collection = collections[collectionName];

        return function(e){
            var el = e.currentTarget;
            var elId = el.dataset.id;
            var elAttributes = utils.formToJson(e.target);
                         
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
