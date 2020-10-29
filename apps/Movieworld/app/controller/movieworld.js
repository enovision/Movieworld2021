/**
 * Created by jvandemerwe on 7-12-2016.
 */
Ext.define('Movieworld.controller.movieworld', {
    extend: 'Ext.app.Controller',

    requires: [
        'Movieworld.singleton.AppSettings',
        'Movieworld.view.window.Credits',
        'Movieworld.view.window.Feedback',
        'Movieworld.view.window.ReleaseInfo',
        'Movieworld.view.window.Translations',
        'TipToast.Toast',
        'VideoPlayer.view.window.PlayerWindow'
    ],

    refs: [{
        ref: 'StatusToolbar',
        selector: 'StatusToolbar'
    }, {
        ref: 'SearchToolbar',
        selector: 'SearchToolbar'
    }, {
        ref: 'HistoryToolbar',
        selector: 'HistoryToolbar'
    }, {
        ref: 'SearchGrid',
        selector: 'SearchPanel #SearchResultsGrid'
    }, {
        ref: 'ResultGridToolbar',
        selector: 'SearchResultsGrid #TopToolbar'
    }, {
        ref: 'PersonsPopularGrid',
        selector: 'SearchPanel #PersonsPopularGrid'
    }, {
        ref: 'DetailPanel',
        selector: 'DetailPanel'
    }, {
        ref: 'DetailMovieCard',
        selector: 'DetailMovieCard'
    }, {
        ref: 'DetailTvCard',
        selector: 'DetailTvCard'
    }, {
        ref: 'DetailWorkPanel',
        selector: 'DetailWorkPanel'
    }, {
        ref: 'DetailPersonCard',
        selector: 'DetailPersonCard'
    }, {
        ref: 'SearchPanel',
        selector: 'SearchPanel'
    }, {
        ref: 'ContentPanel',
        selector: 'ContentPanel'
    }, {
        ref: 'WorkPanel',
        selector: 'WorkPanel'
    }, {
        ref: 'WorkPanelMovies',
        selector: 'WorkPanel #gridMovies'
    }, {
        ref: 'ContentResultsGrid',
        selector: 'ContentResultsGrid'
    }, {
        ref: 'TvSeasonsGrid',
        selector: 'TvSeasonsGrid'
    }],

    control: {
        'SearchToolbar': {
            SearchClicked: 'onSearchClicked',
            ResetSearchClicked: 'onResetSearchClicked',
            BoxOfficeClicked: 'onBoxOfficeClicked',
            CreditsClicked: 'onCreditsClicked',
            FeedbackClicked: 'onFeedbackClicked',
            ClearHistoryClicked: 'onClearHistoryClicked',
            WorkClicked: 'onWorkClicked'
        },
        'StatusToolbar': {
            FeedbackClicked: 'onFeedbackClicked',
            CreditsClicked: 'onCreditsClicked'
        },
        'HistoryToolbar': {
            HistoryClicked: 'onHistoryClicked'
        },
        'SearchToolbar checkboxfield': {
            change: 'onSearchCheckboxClicked'
        },
        'SearchResultsGrid': {
            itemclick: 'onGridItemClicked',
            btnCompareClicked: 'onAddToCompareClicked'
        },
        'SearchResultsGrid #TopToolbar checkboxfield': {
            change: 'onSearchGridCheckboxClicked'
        },
        'PersonsPopularGrid': {
            itemclick: 'onGridItemClicked',
            btnCompareClicked: 'onAddToCompareClicked'
        },
        'MoviesPopularGrid': {
            itemclick: 'onGridItemClicked'
        },
        'ContentResultsGrid': {
            itemclick: 'onGridItemClicked',
            btnCompareClicked: 'onAddToCompareClicked'
        },
        'WorkPanel #gridMovies': {
            itemclick: 'onGridItemClicked'
        },
        'WorkPanel #gridPersons': {
            itemdblclick: 'onGridItemClicked'
        },
        'DetailPersonCard': {
            btnWebsiteClicked: 'onBtnWebsiteClicked',
            TmdbClicked: 'onDetailTmdbClicked',
            btnCompareClicked: 'onAddToCompareClicked'
        },
        'DetailMovieCard': {
            btnWebsiteClicked: 'onBtnWebsiteClicked',
            ImdbClicked: 'onDetailImdbClicked',
            TmdbClicked: 'onDetailTmdbClicked',
            ReleaseClicked: 'onDetailReleaseClicked',
            TrailerClicked: 'onTrailerClicked'
        },
        'DetailTvCard': {
            btnWebsiteClicked: 'onBtnWebsiteClicked',
            TmdbClicked: 'onDetailTmdbClicked',
            TvdbClicked: 'onDetailTvdbClicked',
            ImdbClicked: 'onDetailImdbClicked',
            TrailerClicked: 'onTrailerClicked',
            TranslationsClicked: 'onTranslationsClicked'
        },
        'FrontrowPanel': {
            griditemclicked: 'onGridItemClicked'
        },
        'TvSeasonsGrid': {
            griditemselected: 'onTvEpisodeSelected'
        }
    },

    /**
     * Called when the view is created
     */
    init: function (view) {
        var me = this;

        me.callParent();

        var changeTbl = Ext.StoreMgr.lookup('ChangeLog');
        changeTbl.on('load', function (store) {
            var changeRecord = changeTbl.getAt(0);
            var version = changeRecord.get('version');
            me.getStatusToolbar().setVersion(version);
        }, me);
    },

    // --------------------------------------------------------------------------
    // event handlers : SearchToolbar + StatusToolbar + HistoryToolbar
    // --------------------------------------------------------------------------

    onSearchClicked: function (SearchField, Movies, Persons) {
        var me = this;
        var store = Ext.StoreManager.lookup('Search');

        var panel = me.getSearchPanel();
        panel.getLayout().setActiveItem(1);

        var proxy = store.getProxy();
        proxy.setExtraParams({
            search: SearchField.getValue(),
            chkMovies: true,
            chkPersons: true,
            chkTV: true
        });

        store.loadPage(1);
    },

    onResetSearchClicked: function (toolbar) {
        var me = this;
        var store = Ext.StoreManager.lookup('Search');
        store.removeAll();
        // set checkboxes back on
        var chk = toolbar.query('checkboxfield');
        Ext.each(chk, function (obj, idx) {
            obj.setValue(true);
        });

        var panel = me.getSearchPanel();
        panel.getLayout().setActiveItem(1);
    },

    onSearchCheckboxClicked: function (checkbox, newValue, oldValue) {
        var me = this;
        var toolbar = me.getSearchToolbar();
        var chkMovies = toolbar.down('#chkMovies').getValue();
        var chkPeople = toolbar.down('#chkPeople').getValue();
        var chkTV = toolbar.down('#chkTV').getValue();
        var itemId = checkbox.itemId;

        var ResultGridToolbar = me.getResultGridToolbar();
        ResultGridToolbar.down('#' + itemId).setValue(newValue);

        var store = Ext.StoreManager.lookup('Search');
        store.clearFilter(true);
        // silent

        store.filter([{
            filterFn: function (item) {

                var types = [];
                if (chkMovies)
                    types.push('M');
                if (chkPeople)
                    types.push('P');
                if (chkTV)
                    types.push('T');

                if (types.indexOf(item.get('type')) !== -1) {
                    return item;
                }
            }
        }]);

        var panel = me.getSearchPanel();
        panel.getLayout().setActiveItem(1);

    },

    onBoxOfficeClicked: function () {
        var me = this;
        var panel = me.getDetailPanel();
        var store;

        panel.getLayout().setActiveItem(0);

        store = Ext.StoreManager.lookup('PersonsPopular');
        store.loadPage(1);

        panel = me.getSearchPanel();
        panel.getLayout().setActiveItem(0);

        store = Ext.StoreManager.lookup('MoviesPopular');
        store.loadPage(1);

        panel = me.getContentPanel();
        panel.getLayout().setActiveItem(0);
    },

    onWorkClicked: function () {
        var me = this;
        var panel = me.getDetailPanel();
        panel.getLayout().setActiveItem(4);
    },

    onFeedbackClicked: function () {
        Ext.create('Movieworld.view.window.Feedback').show();
    },

    onCreditsClicked: function () {
        Ext.create('Movieworld.view.window.Credits').show();
    },

    onHistoryClicked: function (rec) {
        var me = this;
        me.onGridItemClicked('history', rec);
    },

    onClearHistoryClicked: function (rec) {
        var me = this;
        var History = me.getHistoryToolbar();
        History.ClearHistory();
    },

    // --------------------------------------------------------------------------
    // event handlers : Any Grid Item Clicked
    // --------------------------------------------------------------------------

    onTvEpisodeSelected: function (grid, record) {
        var me = this;

        var store = Ext.StoreManager.lookup('Content');

        var proxy = store.getProxy();
        proxy.setExtraParams({
            id_tmdb: record.get('tv_id'),
            season: record.get('season_number'),
            episode: record.get('episode_number'),
            type: 'E'
        });

        var resultsGrid = me.getContentResultsGrid();
        resultsGrid.down('#RoleToolbar').hide();

        store.loadPage(1);

    },

    onGridItemClicked: function (grid, record) {
        var me = this;

        var UpdateHistory = grid !== 'history';

        var id_tmdb = record.get('id_tmdb');
        var Type = record.get('type');

        me.onLoadDetailPanelContent(grid, id_tmdb, Type, UpdateHistory);

        var panel = me.getContentPanel();
        panel.getLayout().setActiveItem(1);

        var store = Ext.StoreManager.lookup('Content');

        var proxy = store.getProxy();

        proxy.setExtraParams({
            id_tmdb: id_tmdb,
            type: Type,
            role: 'A'
        });

        var resultsGrid = me.getContentResultsGrid();
        resultsGrid.down('#RoleSelecter').items.items[0].setValue(true);
        if (Type !== 'P') {
            resultsGrid.down('#RoleToolbar').hide();
        } else {
            resultsGrid.down('#RoleToolbar').show();
        }

        store.loadPage(1);
    },

    // --------------------------------------------------------------------------
    // events related to the people compare panel
    // --------------------------------------------------------------------------

    onAddToCompareClicked: function (view, record) {
        var me = this;
        var panel = me.getWorkPanel();
        panel.updatePersons(record);
        TipToast.info('Info', 'Added "' + record.get('name') + '" to who \'worked with who\' list');
    },

    // --------------------------------------------------------------------------
    // event handlers : ResultsGrid (checkboxes)
    // --------------------------------------------------------------------------

    onSearchGridCheckboxClicked: function (checkbox, newValue) {
        var me = this;
        var toolbar = me.getSearchToolbar();

        var itemId = checkbox.itemId;
        toolbar.down('#' + itemId).setValue(newValue);

    },

    // --------------------------------------------------------------------------
    // event handlers : DetailPanel (panel)
    // --------------------------------------------------------------------------

    onLoadDetailPanelContent: function (grid, id_tmdb, type, UpdateHistory) {
        var me = this;
        var panel = me.getDetailPanel();
        var store;

        if (typeof (UpdateHistory) == 'undefined') {
            UpdateHistory = true;
        }

        if (type == 'P') {
            var card = me.getDetailPersonCard();
            store = Ext.StoreManager.lookup('Person');
            store.loadPage(1, {
                params: {
                    id_tmdb: id_tmdb
                },
                callback: function (records, operation, success) {
                    panel.getLayout().setActiveItem(card);
                    card.updatePersonContent(records);
                    var History = me.getHistoryToolbar();
                    var name = records[0].get('name');
                    var record = records[0];
                    if (UpdateHistory == true) {
                        History.UpdateHistory(name, 'P', record);
                    }
                }
            });

        } else if (type == 'M') {
            card = me.getDetailMovieCard();
            store = Ext.StoreManager.lookup('Movie');
            store.loadPage(1, {
                params: {
                    id_tmdb: id_tmdb,
                    type: type
                },
                callback: function (records) {
                    panel.getLayout().setActiveItem(card);
                    // parent
                    card.fireEvent('updateMovieContent', records);
                    // child
                    var History = me.getHistoryToolbar();
                    var name = records[0].get('title');
                    var record = records[0];
                    if (UpdateHistory == true) {
                        History.UpdateHistory(name, 'M', record);
                    }
                }
            });
        } else {
            card = me.getDetailTvCard();
            store = Ext.StoreManager.lookup('Tv');
            store.loadPage(1, {
                params: {
                    id_tmdb: id_tmdb,
                    type: type
                },
                callback: function (records) {
                    panel.getLayout().setActiveItem(card);
                    // parent
                    card.fireEvent('updateTvContent', records);
                    // child
                    var History = me.getHistoryToolbar();
                    var name = records[0].get('title');
                    var record = records[0];
                    if (UpdateHistory == true) {
                        History.UpdateHistory(name, type, record);
                    }
                }
            });
        }
    },

    onBtnWebsiteClicked: function (button) {
        var page = button._Website;
        // abused the button a bit
        window.open(page, '_blank');
    },

    onDetailImdbClicked: function (button) {
        var page = AppSettings.getImdbBaseUrl() + button._imdb_id;
        window.open(page, '_blank');
    },

    onDetailTmdbClicked: function (button) {
        var type = button._type == 'M' ? 'movie' : (button._type == 'T' ? 'tv' : 'person');
        var page = AppSettings.getTmdbBaseUrl() + type + '/' + button._tmdb_id;
        window.open(page, '_blank');
    },

    onDetailTvdbClicked: function (button) {
        var page = AppSettings.getTvdbBaseUrl() + button._tvdb_id;
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
    },

    onTrailerClicked: function (button) {

        // text
        // _service
        // _source
        // _size

        if (button._service == 'youtube') {
            var href = AppSettings.getYoutubeBaseUrl() + button._source;
            if (button._size == 'HD') {
                href = href + '&hd=1';
            }

            var videos = [{
                'src': [{
                    'type': 'video/youtube',
                    'src': href
                }]
            }];

            Ext.create('VideoPlayerWindow', {
                title: button.text,
                // width: 800,
                // height: 450,
                enableYoutube: true,
                videos: videos,
                autoPlayVideo: true,
                showUrlLoad: false,
                showPlaylist: false,
                showRecent: false
            }).show();

        }
    }
});