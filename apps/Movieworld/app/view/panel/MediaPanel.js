Ext.define('Movieworld.view.panel.MediaPanel', {
    extend: 'Ext.tab.Panel',
    controller: 'MediaPanelController',

    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.layout.container.boxOverflow.Scroller',
        'Ext.slider.Multi',
        'Ext.toolbar.Separator',
        'Movieworld.singleton.Icons',
        'Movieworld.view.panel.MediaPanelController',
        'Movieworld.view.toolbar.Download',
        'Movieworld.view.view.MediaDataview'
    ],
    alias: 'widget.MediaPanel',
    title: 'Images',
    iconCls: IconCls.getImage(),
    split: true,
    collapsible: true,
    deferredRender: false,
    activeTab: 0,

    _sliderWidth: [],
    _sliderHeight: [],

    _store: false,

    items: [{
        title: 'Backdrops',
        xtype: 'MediaDataview',
        reference: 'MovieDetailBackdrops',
        _type: 'backdrops',
        // _store: me._store.backdrop,
        listeners: {
            MediaItemClicked: 'onMediaItemClicked'
        }
    }, {
        title: 'Posters',
        xtype: 'MediaDataview',
        reference: 'MovieDetailPosters',
        _type: 'posters',
        // _store: me._store.poster,
        listeners: {
            'MediaItemClicked': 'onMediaItemClicked'
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        reference: 'SizeFilter',
        dock: 'top',
        overflowHandler: 'scroller',
        padding: 10,
        items: [{
            xtype: 'label',
            html: '<i class="' + IconCls.getWidth() + '"></i>',
            tooltip: 'Minimal height'
        }, {
            //fieldLabel: 'Minimal Width',
            hideLabel: true,
            xtype: 'multislider',
            reference: 'SliderWidth',
            width: 400,
            values: [400, 1920],
            increment: 20,
            minValue: 0,
            maxValue: 2000,
            listeners: {
                changecomplete: 'onSliderChanged',
                afterrender: 'onWidthSliderRender'
            }
        }, '-', {
            xtype: 'label',
            html: '<i class="' + IconCls.getHeight() + '"></i>',
            tooltip: 'Minimal width'

        }, {
            hideLabel: true,
            xtype: 'multislider',
            width: 400,
            reference: 'SliderHeight',
            values: [400, 1080],
            increment: 20,
            minValue: 0,
            maxValue: 1100,
            listeners: {
                buffer: 70,
                changecomplete: 'onSliderChanged',
                afterrender: 'onHeightSliderRender'
            }
        }, '-', {
            xtype: 'button',
            text: 'Reset',
            listeners: {
                click: 'onResetClicked'
            }
        }]
    }, {
        xtype: 'DownloadToolbar',
        reference: 'MovieDownloadTbar',
        dock: 'top',
        hidden: true
    }],
    hideDownloadTbar: function() {
        this.fireEvent('onHideMediaToolbar');
    },
    loadMediaDataViews: function(id, type) {
        this.fireEvent('onLoadMediaDataViews', id, type);
    }
});