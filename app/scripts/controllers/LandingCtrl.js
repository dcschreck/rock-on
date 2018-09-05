(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }

    angular
        .module('rockOn')
        .controller('LandingCtrl', LandingCtrl);
})();
