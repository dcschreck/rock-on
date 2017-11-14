(function() {
    /**
    * @function SongPlayer
    * @desc Public service that plays or pauses audio file
    * @returns {Object} SongPlayer
    */
    function SongPlayer() {
        /**
        * @desc Object that is returned by SongPlayer service
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc Song that is currently being played or has been paused
        * @type {Object}
        */
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        /**
        * @function playSong
        * @desc Sets currentBuzzObject to play and playing property of the song to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        /**
        * @function SongPlayer.play
        * @desc Public method that plays audio file
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                // currentBuzzObject.play();
                // song.playing = true;
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        /**
        * @function SongPlayer.play
        * @desc Public method that pauses audio file
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
