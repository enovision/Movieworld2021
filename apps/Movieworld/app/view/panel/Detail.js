Ext.define('Movieworld.view.panel.Detail', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card',
        'Movieworld.view.panel.DetailMovieCard',
        'Movieworld.view.panel.DetailPersonCard',
        'Movieworld.view.panel.DetailTvCard',
        'Movieworld.view.panel.Frontrow',
        'Movieworld.view.panel.WorkPanel'
    ],
    alias: 'widget.DetailPanel',
    layout: 'card',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'FrontrowPanel'
            }, {
                xtype: 'DetailMovieCard'
            }, {
                xtype: 'DetailTvCard'
            }, {
                xtype: 'DetailPersonCard'
            }, {
                xtype: 'WorkPanel'
            }]
        });

        me.callParent(arguments);
    },

    getWorkPanel: function () {
        return this.down('WorkPanel');
    }
});


