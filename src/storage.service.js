angular.module('mekane',[])
.service('storage', storageService);

function storageService( $q, $http ){

    var defaults = {
        dbHost: 'http://couch-server:5984',
        dbName: 'dbName',
        design: '/_design/views/_view/'
    };

    return {
        newMemoryStore: newMemoryStore,
        newCouchStore: newCouchStore
    };


    function newMemoryStore(){
        var memStore = {};

        return {
            save: saveInMemory,
            load: loadFromMemory,
            list: listFromMemory
        };


        function saveInMemory( data ){
            return $q(function(resolve, reject){
                var id = data.id || generateUuid();
                data['id'] = id;
                memStore[id] = data;
                resolve(id);
            });
        }

        function loadFromMemory( id ){
            return $q(function(resolve, reject){
                if ( memStore[id] ){
                    resolve(memStore[id]);
                }
                else {
                    reject('id '+id+' not found');
                }
            });
        }

        function listFromMemory(){
            return $q(function(resolve, reject){
                var result = Object.keys(memStore).map(function(key){
                    return memStore[key];
                });
                resolve( result );
            });
        }
    }

    function newCouchStore( options ){
        var opts = options || {};
        var dbHost = opts.dbHost || defaults.dbHost;
        var dbName = opts.dbName || defaults.dbName;
        var design = opts.design || defaults.design;
        var couchUrl = dbHost + '/' + dbName;

        return {
            save: save,
            load: load,
            list: list
        };


        function save( data ){
            return $http.post( couchUrl+'/', data ); 
        }

        function load( id ){
            return $http.get( couchUrl+'/'+id ).then(function(result){
                return result.data;
            });
        }

        function list(){
            return $http.get( couchUrl+design+'listByName' ).then(function(results){
                return results.data.rows.map(function(row){
                    return row.value;
                });
            });
        }
    }

    function generateUuid(){
    /*
     * @license
     * angular-uuid-service v0.0.1
     * (c) 2014 Daniel Lamb http://daniellmb.com
     * License: MIT
     */
        var time = new Date().getTime(), sixteen = 16;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (match) {
            var remainder = (time + sixteen * Math.random()) % sixteen | 0;
            time = Math.floor(time / sixteen);
            return (match == "x" ? remainder : remainder & 7 | 8).toString(sixteen);
        });
    }
}
