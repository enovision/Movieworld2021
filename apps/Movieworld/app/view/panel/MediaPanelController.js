/**
 * Created by J.vd.Merwe on 03-Jan-17.
 */
Ext.define('Movieworld.view.panel.MediaPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MediaPanelController',

    requires: [
        'Movieworld.singleton.AppSettings'
    ],

    init: function (view) {

    },

    control: {
        '#': {
            onHideMediaToolbar: 'onHideDownloadTbar',
            onLoadMediaDataViews: 'onLoadMediaDataViews'
        }
    },

    onHideDownloadTbar: function () {
        var tbar = this.lookupReference('MovieDownloadTbar');
        tbar.hide();
    },
    onMediaItemClicked: function (type, dataview, record, item) {
        var me = this;
        var tbar = me.lookupReference('MovieDownloadTbar');
        var width = type === 'posters' ? 48 : 120;
        tbar.resetDownload();
        tbar.updateImage(record.get('file_w185'), 68, width);
        tbar.storeRecord(record, item);
        tbar.show();
    },

    onHeightSliderRender: function (slider) {
        var view = this.getView();
        view._sliderHeight = slider.getValues();
    },

    onWidthSliderRender: function (slider) {
        var view = this.getView();
        view._sliderWidth = slider.getValues();
    },

    onResetClicked: function () {
        var view = this.getView();
        var sliders = view.query('multislider');
        Ext.each(sliders, function (s) {
            s.reset();
            if (s.getItemId() === 'SliderWidth') {
                view._sliderWidth = s.getValues();
            } else {
                view._sliderHeight = s.getValues();
            }
        });

        var views = view.query('MediaDataview');
        Ext.each(views, function (view) {
            var store = view.getStore();
            store.clearFilter();
        });
    },

    onSliderChanged: function (slider) {
        var view = this.getView(),
            card = view.getActiveTab(),
            store = card.getStore();

        if (slider.reference === 'SliderWidth') {
            view._sliderWidth = slider.getValues();
        } else {
            view._sliderHeight = slider.getValues();
        }

        store.clearFilter(true);

        store.filter([{
            filterFn: function (item) {
                return (item.get("width") >= view._sliderWidth[0] && item.get("width") <= view._sliderWidth[1] && item.get("height") >= view._sliderHeight[0] && item.get("height") <= view._sliderHeight[1]);
            }
        }]);
    },

    onLoadMediaDataViews: function (id_tmdb, type) {
        var me = this;
        var view = me.getView();

        // clear the panels first
        var panel = view.query('MediaDataview');
        Ext.each(panel, function (item, idx) {
            item.update('');
        });

        var server = AppSettings.getServer();
        var url = type === 'M' ? server + 'movies/MovieMedia' : server + 'movies/TvMedia';
        Ext.Ajax.request({
            url: url,
            cors: true,
            useDefaultXhrHeader: false,
            method: 'GET',
            params: {
                id_tmdb: id_tmdb,
                type: type
            },
            success: function (json) {
                var response = Ext.decode(json.responseText);

                var backdrops = me.lookupReference('MovieDetailBackdrops');
                var posters = me.lookupReference('MovieDetailPosters');

                if (response.records['posters']) {
                    view.setActiveTab(posters);
                    posters.LoadMedia(id_tmdb, response.records['posters']);
                    posters.enable();
                } else {
                    posters.disable();
                }
                // backdrops
                if (response.records['backdrops']) {
                    view.setActiveTab(backdrops);
                    backdrops.LoadMedia(id_tmdb, response.records['backdrops']);
                    backdrops.enable();
                } else {
                    backdrops.disable();
                }

                if (!response.records['backdrops'] && !response.records['posters']) {
                    view.disable(); // disable the media panel
                } else {
                    view.enable();  // enable the media panel
                }

                view.fireEvent('loadtrailers', response.records['trailers']);
            }
        });
    }
});