Ext.define('Movieworld.view.grid.PersonsPopular', {
    extend: 'Ext.grid.Panel',
    xtype: 'PersonsPopularGrid',
    controller: 'PersonsPopularController',

    requires: [
        'Ext.grid.column.Template',
        'Ext.grid.plugin.DragDrop',
        'Movieworld.singleton.Toolbox',
        'Movieworld.view.grid.PersonsPopularController'
    ],

    border: true,

    emptyText: 'No records found',

    store: 'PersonsPopular',

    columns: [{
        text: 'Results',
        header: false,
        xtype: 'templatecolumn',
        flex: true,
        tpl: new Ext.XTemplate(
            '<div class="results item {[this.getResClass()]}">',
            '<div class="results image-wrap">',
            '<img class="results thumb" src="{thumbnail}"/>',
            '</div>',
            '<div class="results wrap">',
            '<div class="results name">{name}</div>',
            // '<div class="results released"><i class="fa fa-asterisk gray"></i> {item_date}</div>',
            '</div>',
            '</div>',
            {
                getResClass: function () {
                    return Toolbox.getResolutionClass();
                }
            })
    }],
    viewConfig: {
        style: {
            overflow: 'auto',
            overflowX: 'hidden'
        },
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'PersonsPopularDD',
            enableDrag: true, // I can drag
            enableDrop: false // but you can't drop on me
        }
    },
    listeners: {
        beforeitemcontextmenu: 'onBeforeItemContextMenu'
    }
});
