describe('The Storage service', function() {

    var theStorageService;
    beforeEach(function(){
        module('storage');

        inject(function( storage ){
            theStorageService = storage;
        });
    });

    it( 'should provide the storage Service', function() {
        expect(theStorageService).to.be.an('object');
    });
});
