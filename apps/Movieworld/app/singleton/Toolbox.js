Ext.define('Movieworld.singleton.Toolbox', {
    requires: [
        'Ext.dom.Query',
        'Ext.util.Format'
    ],

    singleton: true,
    alternateClassName: ['Toolbox', 'Tools'],

    constructor: function (config) {
    },

    AjaxFailure: function (form, action) {
        Ext.Msg.show({
            title: 'Oops...',
            msg: 'Seems something went wrong here',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
        });
    },

    // --------------------------------------------------------------------------
    // Standard Renderers
    // --------------------------------------------------------------------------

    ConvertNumber: function (number) {
        Ext.util.Format.thousandSeperator = '.';
        Ext.util.Format.decimalSeperator = ',';
        return Ext.util.Format.number(number, '0,0');
    },

    /**
     * @return {string}
     */
    ConvertThumb: function (val, record) {
        if (val.length > 0) {
            if (val.substring(0, 4) != '<img') {
                return '<img src="' + val + '" width="92"</img>';
            } else {
                return val;
            }
        } else {
            return '&nbsp;';
        }
    },

    /**
     * @return {string}
     */
    ConvertIcon: function (val, record) {
        if (this.length > 0) {
            if (this.substring(0, 4) != '<img') {
                return '<img src="' + val + '" height="16" width="16"</img>';
            } else {
                return val;
            }
        } else {
            return '&nbsp;';
        }
    },

    /**
     * @return {string}
     */
    ConvertImage: function (val, meta, record) {
        if (val.length > 0) {
            return '<img src="' + val + '" height="' + record.get('height') + '" width="' + record.get('width') + '"</img>';
        } else {
            return val;
        }
    },

    getResolutionClass: function () {

        var width = Ext.getBody().getViewSize().width + 16;
        // 16 is correction
        if (width > 1600) {
            var resClass = 'res-high';
        } else if (width > 1199) {
            resClass = 'res-low';
        } else {
            resClass = 'res-very-low';
        }
        return resClass;

    },

    BrowserResize: function (selecter) {
        var prefix = "res-";

        var scope = Ext.DomQuery.select(selecter);

        if (scope.length > 0) {
            Ext.each(scope, function (el) {
                var classes = el.getAttribute('class').split(" ").filter(function (c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                classes.push(Toolbox.getResolutionClass());
                // new class
                el.setAttribute('class', classes.join(" "));
            });
        }
    },

    onBtnWebsiteClicked: function (button) {
        var page = button._Website;
        // abused the button a bit
        window.open(page, '_blank');
    },

    onDetailImdbClicked: function (button) {
        var page = 'http://www.imdb.com/title/' + button._imdb_id;
        window.open(page, '_blank');
    },

    onDetailTmdbClicked: function (button) {
        var type = button._type == 'M' ? 'movie' : (button._type == 'T' ? 'tv' : 'person');
        var page = 'http://www.themoviedb.org/' + type + '/' + button._tmdb_id;
        window.open(page, '_blank');
    },

    onDetailTvdbClicked: function (button) {
        var page = 'http://thetvdb.com/index.php?tab=series&id=' + button._tvdb_id;
        window.open(page, '_blank');
    },

    onDetailReleaseClicked: function (button) {
        Ext.create('Movieworld.view.window.ReleaseInfo', {
            _movieId: button._movieId,
            _movieTitle: button._movieTitle,
            _movieThumb: button._movieThumb,
            _movieReleased: button._movieReleased
        }).show();
    },

    onTranslationsClicked: function (button) {
        Ext.create('Movieworld.view.window.Translations', {
            _id_tmdb: button._id_tmdb,
            _name: button._name,
            _thumb: button._thumb,
            _first_air_date: button._first_air_date
        }).show();
    }
});
