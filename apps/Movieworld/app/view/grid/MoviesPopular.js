Ext.define('Movieworld.view.grid.MoviesPopular', {
    extend: 'Ext.grid.Panel',
    xtype: 'MoviesPopularGrid',
    controller: 'MoviesPopularController',

    requires: [
        'Ext.grid.column.Template',
        'Movieworld.singleton.Toolbox',
        'Movieworld.view.grid.MoviesPopularController'
    ],
    border: false,
    hideHeaders: true,

    emptyText: 'No records found',

    store: 'MoviesPopular',

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
            // '<div class="results released"><i class="fa fa-calendar"></i> {item_date}</div>',
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
        }
    }
}); 