/**
 * @class Movieworld.view.Viewport
 */
Ext.define('Movieworld.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.layout.container.Border',
        'Ext.panel.Panel',
        'Movieworld.view.panel.Content',
        'Movieworld.view.panel.Detail',
        'Movieworld.view.panel.Search',
        'Movieworld.view.toolbar.History',
        'Movieworld.view.toolbar.Search',
        'Movieworld.view.toolbar.Status'
    ],

    alternateClassName: ['MovieworldViewPortClassic'],


    layout: 'border',
    items: [{
        xtype: 'SearchPanel',
        flex: .28,
        region: 'west'
    }, {
        xtype: 'DetailPanel',
        region: 'center'
    }, {
        xtype: 'ContentPanel',
        flex: .28,
        region: 'east'

    }, {
        xtype: 'StatusToolbar',
        region: 'south'
    }, {
        xtype: 'panel',
        title: 'Enovision Movieworld',
        region: 'north',
        border: false,
        iconCls: 'enovision',
        dockedItems: [{
            xtype: 'SearchToolbar',
            dock: 'top'
        }, {
            xtype: 'HistoryToolbar',
            dock: 'top'
        }],
        listeners: {
            afterrender: function (panel) {
                // var header = panel.header;
                // header.setHeight(35);
            },
            beforerender: function () {
                /* Ext.get('loading').hide(); */
            }
        }
    }]
});

