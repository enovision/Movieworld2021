/**
 * Created by jvandemerwe on 7-12-2016.
 */
Ext.define('Movieworld.view.panel.DetailTvCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailTvCardController',

    requires: [
        'Ext.data.StoreManager',
        'Movieworld.singleton.Icons'
    ],

    init: function () {

    },

    control: {
        '#': {
            updateTvContent: 'onUpdateTvContent'
        }
    },

    onBtnTranslationsClicked: function (btn) {
        this.getView().fireEvent('TranslationsClicked', btn);
    },
    onBtnIMDBClicked: function (btn) {
        this.getView().fireEvent('ImdbClicked', btn);
    },
    onBtnTMDBClicked: function (btn) {
        this.getView().fireEvent('TmdbClicked', btn);
    },
    onBtnTVDBClicked: function (btn) {
        this.getView().fireEvent('TvdbClicked', btn);
    },
    onBtnWebsiteClicked: function (btn) {
        this.getView().fireEvent('btnWebsiteClicked', btn);
    },

    onBtnCollapseClicked: function(btn) {
        var view = this.getView();
        var panel = this.lookupReference('SeasonsInfo');
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

    /**
     * @function onUpdateTvContent
     * @param records
     */
    onUpdateTvContent: function (records) {
        var me = this;
        var view = me.getView();

        var TvDetailInfo = me.lookup('TvDetailInfo');
        var mediaPanel = me.lookup('TvDetailTab');

        view.setActiveTab(0);

        mediaPanel.hideDownloadTbar();

        var record = records[0];
        var data = record.data;

        // first record of only 1 record !!!
        mediaPanel.loadMediaDataViews(record.get('id_tmdb'), record.get('type'));

        var TvSeasonsGrid = me.lookup('TvSeasonsGrid');
        TvSeasonsGrid.setDisabled(true);
        TvSeasonsGrid._season = false;

        if (data.seasons.length > 0) {
            var s1 = data.seasons[0].season_number;
            TvSeasonsGrid.LoadEpisodes(record.get('id_tmdb'), s1, record.get('seasons'));
            // first season
        }

        var tpl = TvDetailInfo.tpl;
        tpl.overwrite(TvDetailInfo.body, data);

        var SeasonsInfo = me.lookup('SeasonsInfo');
        SeasonsInfo.tpl.overwrite(SeasonsInfo.body, data);

        // TRANSLATIONS ---- //
        btn = me.lookup('btnTranslations');
        btn['_id_tmdb'] = record.get('id_tmdb');
        btn['_name'] = record.get('name');
        btn['_thumb'] = record.get('poster_w185');
        btn['_first_air_date'] = record.get('first_air_date');

        var btn = me.lookup('btnWebsite');
        var title = record.get('name');
        // btn.setText('Website ' + title);

        btn['_Website'] = record.get('homepage');
        // abuse the button

        if (btn._Website !== '') {
            btn.enable();
        } else {
            btn.disable();
        }

        // TMDB ---- //
        btn = me.lookup('btnTMDB');
        var id = record.get('id_tmdb');
        btn['_tmdb_id'] = id;
        // abuse the button
        btn['_type'] = 'T';
        // abuse the button

        if (btn.id !== '') {
            btn.enable();
            btn.setTooltip('Tmdb Id: ' + id);
        } else {
            btn.disable();
        }

        // IMDB ---- //
        btn = me.lookup('btnIMDB');

        var eIds = record.get('external_ids');

        var imdb = eIds.hasOwnProperty('imdb_id') ? eIds.imdb_id : '';

        btn['_imdb_id'] = imdb;
        // abuse the button

        if (btn._imdb_id !== '') {
            btn.enable();
            btn.setTooltip('Imdb Id: ' + imdb);
        } else {
            btn.disable();
        }

        // TVDB ---- //
        btn = me.lookup('btnTVDB');
        eIds = record.get('external_ids');
        btn['_tvdb_id'] = eIds.hasOwnProperty('tvdb_id') ? eIds.tvdb_id : '';
        btn['_type'] = 'T';

        if (btn._tvdb_id !== '') {
            btn.enable();
            btn.setTooltip('Tvdb Id: ' + eIds.tvdb_id);
        } else {
            btn.disable();
        }

        var vote = record.get('vote_average');

        $('.right.vote').raty({
            number: 10,
            start: vote,
            readOnly: true,
            path: 'resources/javascript/raty/img'
        });

        $('.tv-info .vote').raty({
            number: 10,
            start: vote,
            readOnly: true,
            path: 'resources/javascript/raty/img'
        });

    },
    onLoadTrailers: function (trailers) {
        var me = this;
        var view = this.getView();

        var btn = me.lookup('btnTrailers');
        var menu = btn.menu;
        // menu is a property !
        menu.removeAll();

        var store = Ext.StoreManager.lookup('Trailer');
        store.loadData(trailers);

        var records = store.getRange();

        btn.disable();

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
            btn.enable();
        }, me);
    }
});