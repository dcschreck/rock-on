(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
    }

    angular
        .module('rockOn')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
