/**
 * @class Movieworld.singleton.AppConfig
 * Application Settings (no secrets here)
 *
 * @namespace Movieworld.singleton
 *
 * @constructor
 * @param {object} AppSettings
 * @author J.J. van de Merwe, Enovision GmbH
 */

Ext.define('Movieworld.singleton.AppSettings', {
    alternateClassName: ['AppConfig', 'AppSettings'],
    singleton: true,

    config: {
        iconmovie: 'fa fa-film',
        icontv: 'fa fa-tv',
        iconperson: 'fa fa-user',
        server: 'https://tmdb.websprinter.nl/',
        youtubeBaseUrl: 'https://www.youtube.com/watch?v=',
        tmdbBaseUrl: 'http://www.themoviedb.org/',
        imdbBaseUrl: 'http://www.imdb.com/title/',
        tvdbBaseUrl: 'http://thetvdb.com/index.php?tab=series&id='
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    getIcon: function (type) {
        if (type === 'P')
            return this.getIconperson();
        if (type === 'M')
            return this.getIconmovie();
        if (type === 'T')
            return this.getIcontv();
        return false;
    }
});