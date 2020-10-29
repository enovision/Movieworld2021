/**
 * Created by jvandemerwe on 7-12-2016.
 */
Ext.define('Movieworld.view.panel.DetailMovieCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailMovieCardController',

    requires: [
        'Ext.data.StoreManager',
        'Movieworld.singleton.Icons'
    ],

    control: {
        '#': {
           updateMovieContent: 'onUpdateMovieContent'
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onBtnReleaseInfoClicked: function (btn) {
        this.getView().fireEvent('ReleaseClicked', btn);
    },

    onBtnIMDBClicked: function (btn, e) {
        this.getView().fireEvent('ImdbClicked', btn);
    },

    onBtnTMDBClicked: function (btn, e) {
        this.getView().fireEvent('TmdbClicked', btn);
    },

    onBtnWebsiteClicked: function (btn) {
        this.getView().fireEvent('btnWebsiteClicked', btn);
    },

    onBtnCollapseClicked: function(btn) {
        var view = this.getView();
        var panel = this.lookupReference('MovieInfo');
        if (panel.isHidden() === true) {
            btn.setTooltip('Collapse Info');
            btn.setIconCls(IconCls.getHide_up());
            panel.show();
        } else {
            btn.setTooltip('Expand Info');
            btn.setIconCls(IconCls.getHide_down());
            panel.hide();
        }
    },

    onUpdateMovieContent: function (records) {
        var me = this;
        // var view = me.getView();

        var mediaPanel = this.lookupReference('MovieDetailTab');
        mediaPanel.hideDownloadTbar();

        var record = records[0];
        var data = record.data;
        // first record of only 1 record !!!
        mediaPanel.loadMediaDataViews(record.get('id_tmdb'), record.get('type'));

        var MovieDetailInfo = panel = this.lookupReference('MovieDetailInfo');
        var tpl = MovieDetailInfo.tpl;
        tpl.overwrite(panel.body, data);

        var MovieInfo = this.lookupReference('MovieInfo');
        MovieInfo.tpl.overwrite(MovieInfo.body, data);

        var btn = me.lookupReference('btnWebsite');

        var title = record.get('title');
        // btn.setText('Website' + title);
        btn.setText('Website');

        btn['_Website'] = record.get('homepage');
        // abuse the button

        if (btn._Website !== '') {
            btn.enable();
        } else {
            btn.disable();
        }

        // IMDB ---- //
        btn = me.lookupReference('btnIMDB');

        var imdb_id = record.get('imdb_id');

        btn['_imdb_id'] = imdb_id;
        // abuse the button

        if (btn._imdb_id !== '') {
            btn.enable();
            btn.setTooltip('Imdb Id: ' + imdb_id);
        } else {
            btn.disable();
        }

        // TMDB ---- //
        btn = me.lookup('btnTMDB');

        var tmdb_id = record.get('id_tmdb');
        btn['_tmdb_id'] = tmdb_id;
        // abuse the button
        btn['_type'] = 'M';
        // abuse the button

        if (btn.id !== '') {
            btn.enable();
            btn.setTooltip('Tmdb Id: ' + tmdb_id);
        } else {
            btn.disable();
        }


        var id_tmdb = record.get('id_tmdb');
        // RELEASES ---- //
        btn = me.lookup('btnReleaseInfo');
        btn['_movieId'] = id_tmdb;
        btn['_movieTitle'] = record.get('title');
        btn['_movieThumb'] = record.get('poster_w92');
        btn['_movieReleased'] = record.get('release_date');

        var vote = record.get('vote_average');

        jQuery('.vote').raty({
            number: 10,
            start: vote,
            readOnly: true,
            path: 'resources/javascript/raty/img'
        });
    },

    onLoadTrailers: function (trailers) {
        var me = this;
        var view = this.getView();

        var btnTrailers = me.lookup('btnTrailers');
        var menu = btnTrailers.menu;
        // menu is a property !
        menu.removeAll();

        var store = Ext.StoreManager.lookup('Trailer');
        store.loadData(trailers);

        var records = store.getRange();

        btnTrailers.disable();

        Ext.each(records, function (item, idx) {
            menu.add({
                text: item.get('name'),
                _service: item.get('service'),
                iconCls: 'icon-' + item.get('service'), //item.get('service'), // see app_icons.css
                _source: item.get('source'),
                _size: item.get('size'),
                handler: function (btn) {
                    view.fireEvent('TrailerClicked', btn);
                }
            });
            btnTrailers.enable();
        });
    }
});