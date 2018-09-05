(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc Object that is returned by SongPlayer service
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc Gets and stores current album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

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
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
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

        var stopSong = function(song) {
            //console.log(song);
            if (song === undefined) {
                return;
            } else {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
        }

        /**
        * @function getSongIndex
        * @desc Find index of currently playing song
        * @param {Object} song
        * @return {number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc Song that is currently being played or has been paused
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;


        /**
        * @function SongPlayer.play
        * @desc Public method that plays audio file
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (song === null) {
                    return;
                } else if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Public method that pauses audio file
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc Method that goes to the previous song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function SongPlayer.next
        * @desc Method that goes to the next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.volume = 80;

        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }

        };

        return SongPlayer;
    }

    angular
        .module('rockOn')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
