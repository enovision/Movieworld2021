Ext.define('Movieworld.view.panel.Content', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ContentPanel',
    border: true,
    requires: [
        'Ext.layout.container.Card',
        'Movieworld.singleton.Icons',
        'Movieworld.view.grid.ContentResults',
        'Movieworld.view.grid.MoviesPopular'
    ],
    layout: 'card',

    deferredRender: false,

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'MoviesPopularGrid',
                itemId: 'MoviesPopularGrid',
                iconCls: IconCls.getMovie(),
                title: 'Most requested Movies'
            }, {
                xtype: 'ContentResultsGrid',
                itemId: 'ContentResultsGrid'
            }]
        });

        me.callParent(arguments);
    },

    getMoviesPopularCard: function () {
        var me = this;
        return me.down('#MoviesPopularGrid');
    },

    getContentResultsCard: function () {
        var me = this;
        return me.down('#ContentResultsGrid');
    }

});


