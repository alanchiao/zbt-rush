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
       
       return function(e){
          var collection = collections[collectionName][0];
          var el = e.currentTarget;
          var elId = el.dataset.id;
          collection.remove(elId);
       } 
    }
    
    /** Note the logic currently only handles the case when
    the child collection has only one attribute, with the 
    same name as the collection name (lower-cased) 
    
    Ex: Ride has Phone under it.
    Ride["phone"] = phoneId.
    Phone["phone"] = phoneNumber.
    **/

    that.editItem = function(collectionName){
        return function(e){
            var collection = collections[collectionName][0];
            var childColls  = collections[collectionName][1];

            var el = e.currentTarget;
            var elId = el.dataset.id;
            var elAttributes = utils.formToJson(e.target);
            for (var key in childColls){
                if (key in elAttributes){
                    childColl = childColls[key];
                    //Remove original version of childColl
                    oldChildId = collection.find(elId).fetch()[0][key];
                    oldChildData = childColl.find(oldChildId).fetch()[0][key];
                    if (oldChildData !== elAttributes[key]){
                        childColl.remove(oldChildId);
                        //Add new version of childColl;
                        newChildId = childColl.insert({key: elAttributes[key]});
                        elAttributes[key] = newChildId;
                    }
                    else {
                        //keep old child
                        elAttributes[key] = oldChildId;
                    }  
                }
            }
            collection.update(elId, {$set: elAttributes}, function(error){
                if(error){
                    throwError(error.reason);
                }
            });
        }
    }

    return that;
}();