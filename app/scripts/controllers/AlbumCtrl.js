(function() {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
        //this.albumDataSongs = angular.copy(albumPicasso.songs);
        console.log(this.albumData);
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
