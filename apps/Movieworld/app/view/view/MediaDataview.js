Ext.define('Movieworld.view.view.MediaDataview', {
    extend: 'Ext.view.View',
    requires: [
        'Ext.data.StoreManager',
        'Ext.util.Format',
        'Movieworld.singleton.Toolbox'
    ],
    alias: 'widget.MediaDataview',
    // deferInitialRefresh : false,
    cls: 'mediaview panel',
    multiSelect: false,
    scrollable: true,

    _store: false,
    _type: 'posters', // can be posters or backdrops

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.StoreManager.lookup(me._store),
            tpl: Ext.create('Ext.XTemplate',
                '<div class="mediaview wrap pure-g {[this.getResClass()]} {[this.getClass()]}">',
                '<tpl for=".">',
                '<div class="mediaview-element pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-4">',
                '   <div class="bordered margin-5">',
                '      <div id="id-{id}" class="mediaview item" href=\"{file_h632}\" rel=\"gallery\" >',
                '         <div class="mediaview image-wrap">',
                '            <img class="mediaview thumb pure-img" title=\"{title}\" src=\"{file_w300}\"/>',
                '         </div>',
                '         <div class="mediaview name">{name}</div>',
                '         <div class="mediaview statistics">',
                '            <div class="media-meta pure-g">',
                '               <div class="pure-u-1-3"><i class="fa fa-arrows-h"></i>&nbsp;<span class="inverse">{width}</span></div>',
                '               <div class="pure-u-1-3"><i class="fa fa-arrows-v"></i>&nbsp;<span class="inverse">{height}</span></div>',
                '               <tpl if="vote_average &gt; 0"><div class="pure-u-1-3"><i class="fa fa-star"></i>&nbsp;<span class="inverse">{[this.getVote(values.vote_average)]}</span></div></tpl>',
                '            </div>',
                '         </div>',
                '      </div>',
                '   </div>',
                '</div>',
                '</tpl>',
                '</div>',
                {
                    scope: me,
                    getClass: function () {
                        return me._type;
                    },
                    getVote: function (rate) {
                        return Ext.util.Format.number(rate, '0.0');
                    },
                    getResClass: function () {
                        return Toolbox.getResolutionClass();
                    }
                }),
            itemSelector: 'div.mediaview.item',
            overItemCls: 'mediaview-hover'
        });

        me.on('itemclick', function (dataview, record, item, index, e) {
            me.fireEvent('MediaItemClicked', me._type, dataview, record, item, index, e);
        }, me);

        me.callParent();
    },
    LoadMedia: function (id, records) {
        var me = this;

        me.update('', false, function () {
            var store = me.getStore();
            store.loadData(records);
        });
    }
});
