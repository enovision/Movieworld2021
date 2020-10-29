/**
 * Created by jvandemerwe on 02.12.16.
 */
Ext.define('Movieworld.view.grid.PersonsPopularController', {
    extend: 'Movieworld.view.grid.PopularController',
    alias: 'controller.PersonsPopularController',

    requires: [
        'Ext.menu.Menu',
        'Movieworld.singleton.Icons'
    ],

    init: function () {
        this.callParent();
    },

    onBeforeItemContextMenu: function (view, record, item, index, e) {
        var me = this;
        var enabled = record.get('type') != 'P' ? false : true;
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Add to Who worked with who',
                iconCls: IconCls.getLink(),
                enabled: enabled,
                scope: me.getView(),
                handler: function (b, e) {
                    me.fireViewEvent('btnCompareClicked', record);
                }
            }]
        });
        e.stopEvent();
        menu.showAt(e.getXY());
    }
});