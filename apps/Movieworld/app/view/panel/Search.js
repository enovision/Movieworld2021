Ext.define('Movieworld.view.panel.Search', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SearchPanel',
    requires: [
        'Ext.layout.container.Card',
        'Movieworld.singleton.Icons',
        'Movieworld.view.grid.PersonsPopular',
        'Movieworld.view.grid.SearchResults'
    ],
    layout: 'card',
    deferredRender: false,

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'PersonsPopularGrid',
                itemId: 'PersonsPopularGrid',
                iconCls: IconCls.getUsers(),
                title: 'Most requested Persons'
            }, {
                xtype: 'SearchResultsGrid',
                itemId: 'SearchResultsGrid'
            }]
        });

        me.callParent(arguments);
    },

    getPersonsPopularCard: function () {
        return this.down('#PersonsPopularGrid');
    },

    getSearchResultsCard: function () {
        return this.down('#ResultsGrid');
    }

});


