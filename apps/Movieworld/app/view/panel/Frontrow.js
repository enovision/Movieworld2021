Ext.define('Movieworld.view.panel.Frontrow', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.layout.container.Fit',
        'Movieworld.singleton.Icons',
        'Movieworld.view.view.FrontrowDataview'
    ],
    alias: 'widget.FrontrowPanel',
    layout: 'fit',
    title: 'Frontrow',
    iconCls: IconCls.getFrontrow(),

    deferredRender: false,

    initComponent: function () {
        var me = this;

        var tbarItems = [{
            xtype: 'label',
            text: 'Sort:'
        }, {
            xtype: 'button',
            text: 'Title',
            iconCls: IconCls.getSort_desc(),
            scope: me,
            handler: function (btn) {
                me.SortClicked(btn, 'name');
            }
        }, {
            xtype: 'button',
            text: 'Popularity',
            iconCls: IconCls.getSort_asc(),
            scope: me,
            handler: function (btn) {
                me.SortClicked(btn, 'vote_average');
            }
        }];

        Ext.apply(me, {
            defaults: {
                listeners: {
                    activate: function (view) {
                        view.down('dataview').refresh();
                    }
                }
            },
            items: [{
                itemId: 'Popular',
                title: 'Popular',
                iconCls: IconCls.getThumbsUp(),
                layout: 'fit',
                items: [{
                    xtype: 'FrontrowDataview',
                    _store: 'Popular',
                    listeners: {
                        scope: me,
                        itemclick: function (dataview, record, item, index, e) {
                            me.DataviewItemClicked(dataview, record, item, index, e);
                        }
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    itemId: 'TopToolbar',
                    dock: 'top',
                    items: tbarItems
                }]
            }, {
                title: 'In the cinema',
                iconCls: IconCls.getCinema(),
                itemId: 'Boxoffice',
                layout: 'fit',
                items: [{
                    xtype: 'FrontrowDataview',
                    _store: 'Boxoffice',
                    listeners: {
                        scope: me,
                        itemclick: function (dataview, record, item, index, e) {
                            me.DataviewItemClicked(dataview, record, item, index, e);
                        }
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    itemId: 'TopToolbar',
                    dock: 'top',
                    items: tbarItems
                }]
            }, {
                title: 'Now on TV',
                iconCls: IconCls.getTv(),
                itemId: 'BoxofficeTV',
                layout: 'fit',
                items: [{
                    xtype: 'FrontrowDataview',
                    _store: 'BoxofficeTV',
                    listeners: {
                        scope: me,
                        itemclick: function (dataview, record, item, index, e) {
                            me.DataviewItemClicked(dataview, record, item, index, e);
                        }
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    itemId: 'TopToolbar',
                    dock: 'top',
                    items: tbarItems
                }]
            }, {
                itemId: 'PopularTV',
                title: 'TV Popular',
                iconCls: 'icon-star',
                layout: 'fit',
                items: [{
                    xtype: 'FrontrowDataview',
                    _store: 'PopularTV',
                    listeners: {
                        scope: me,
                        itemclick: function (dataview, record, item, index, e) {
                            me.DataviewItemClicked(dataview, record, item, index, e);
                        }
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    itemId: 'TopToolbar',
                    dock: 'top',
                    items: tbarItems
                }]
            }]
        });

        me.callParent(arguments);
    },

    // --------------------------------------------------------------------------
    // event handlers : DataView (Frontrow)
    // --------------------------------------------------------------------------

    SortClicked: function (btn, field) {
        var me = this;

        var card = me.getActiveTab();
        card.down('FrontrowDataview').getStore().sort(field);

        if (btn.iconCls == IconCls.getSort_asc()) {
            btn.setIconCls(IconCls.getSort_desc());
        } else {
            btn.setIconCls(IconCls.getSort_asc());
        }
    },

    DataviewItemClicked: function (dataview, rec, Index) {
        var me = this;
        // rec.set('type', 'M');
        this.fireEvent('griditemclicked', false, rec);
    }
});
