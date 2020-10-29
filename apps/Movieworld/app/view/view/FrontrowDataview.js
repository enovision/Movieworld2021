Ext.define('Movieworld.view.view.FrontrowDataview', {
    extend: 'Ext.view.View',
    requires: [
        'Ext.data.StoreManager',
        'Ext.ux.DataView.Animated',
        'Movieworld.singleton.Toolbox'
    ],
    alias: 'widget.FrontrowDataview',
    deferInitialRefresh: false,
    cls: 'dataview panel',
    scrollable: true,

    _store: false,

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            store: Ext.StoreManager.lookup(me._store),
            tpl: Ext.create('Ext.XTemplate',
                '<div class="dataview pure-g wrap">',
                '<tpl for=".">',
                '   <div class="dataview-element pure-u-1-2 pure-u-md-1-3 pure-u-xl-1-4">',
                '      <div class="bordered margin-5">',
                '         <div class="pure-g dataview item {[this.getResClass()]}">',
                '            <div class="dataview image pure-u-1-1 pure-u-lg-1-3">',
                '                <img class="dataview thumb left pure-img" src=\"{thumb}\"/>',
                '            </div>',
                '            <div class="pure-u-1-1 pure-u-lg-2-3 dataview meta">',
                '               <div class="dataview title">{name}</div>',
                '               <tpl if="type==\'T\'"><div class="dataview release_date"><i class="fa fa-calendar"></i> {release_date}</div></tpl>',
                '               <tpl if="type==\'M\'"><div class="dataview release_date"><i class="fa fa-calendar"></i> {release_date}</div></tpl>',
                '               <tpl if="vote_average &gt; 0"><div class="dataview rate"><i class="fa fa-star">&nbsp;</i><span class="score">{vote_average}</span></div></tpl>',
                '            </div>',
                '         </div>',
                '     </div>',
                '   </div>',
                '</tpl>',
                '</div>',
                {
                    scope: me,
                    getResClass: function () {
                        return '';
                        // return Toolbox.getResolutionClass();
                    }
                }).compile(),
            plugins: [
                Ext.create('Ext.ux.DataView.Animated', {
                    duration: 500,
                    idProperty: 'id_tmdb'
                })
            ],
            itemSelector: 'div.dataview-element',
            overItemCls: 'dataview-hover',
            multiSelect: false
        });

        me.callParent();

        me.on('resize', function () {
            Toolbox.BrowserResize('.dataview.item');
        }, me);
    }
});
