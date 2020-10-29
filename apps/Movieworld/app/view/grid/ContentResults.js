Ext.define('Movieworld.view.grid.ContentResults', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ContentResultsGrid',

    requires: [
        'Ext.form.RadioGroup',
        'Ext.grid.column.Template',
        'Ext.grid.plugin.DragDrop',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Movieworld.singleton.AppSettings',
        'Movieworld.singleton.Icons',
        'Movieworld.singleton.Toolbox'
    ],

    title: 'Results Movies/Cast',
    header: false,

    emptyText: 'No records found',

    store: 'Content',

    _typeLoaded: false,

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            columns: [{
                text: 'Results',
                header: false,
                xtype: 'templatecolumn',
                flex: 1,
                tpl: new Ext.XTemplate(
                    '<div class="results item {[this.getResClass()]}">',
                    '<img class="results thumb pure-img" src="{thumbnail}"/>',
                    '<div class="results wrap">',
                    '<div class="results image-wrap">',
                    '<tpl if="type ==\'P\'">',
                    '   <span class="results name">{name}</span>',
                    '   <tpl if="this.isNotEmpty(values.character)">',
                    '      <div class="results character"><i class="fa fa-user"/></i> {character}</div>',
                    '   </tpl>',
                    '   <tpl if="this.isNotEmpty(values.job)">',
                    '      <div class="results job "><i class="fa fa-user"/></i> {job}</div>',
                    '   </tpl>',
                    '</tpl>',
                    '<tpl if="type ==\'M\'">',
                    '   <span class="results title"><i class="fa fa-film"/></i> {title}</span>',
                    '   <tpl if="this.isNotEmpty(values.character)">',
                    '        <div class="results character "><i class="fa fa-user"/></i> {character}</div>',
                    '   </tpl>',
                    '   <tpl if="this.isNotEmpty(values.job)">',
                    '        <div class="results character "><i class="fa fa-user"/></i> {job}</div>',
                    '   </tpl>',
                    '   <div class="results released "><i class="fa fa-calendar"></i> {released}</div>',
                    '</tpl>',
                    '<tpl if="type ==\'T\'">',
                    '   <span class="results title"><i class="fa fa-tv"/></i> {title}</span>',
                    '   <tpl if="this.isNotEmpty(values.character)">',
                    '       <div class="results character "><i class="fa fa-user"/></i> {character}</div>',
                    '   </tpl>',
                    '   <tpl if="this.isNotEmpty(values.job)">',
                    '       <div class="results character "><i class="fa fa-user"/></i> {job}</div>',
                    '   </tpl>',
                    '   <div class="results released "><i class="fa fa-calendar"></i> {released}</div>',
                    '</tpl>',
                    '</div>',
                    '</div>',
                    {
                        isNotEmpty: function(val) {
                            return val !== '' && typeof(val) !== 'undefined';
                        },
                        getIcon: function (type) {
                            return AppSettings.getIcon(type);
                        },
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
                    ddGroup: 'ContentResultsDD',
                    enableDrag: true, // I can drag
                    enableDrop: false
                    // but you can't drop on me
                }
            },
            listeners: {
                beforeitemcontextmenu: function (view, record, item, index, e) {
                    var disabled = record.get('type') !== 'P';
                    var menu = Ext.create('Ext.menu.Menu', {
                        items: [{
                            text: 'Add to Who worked with who',
                            iconCls: IconCls.getLink(),
                            disabled: disabled,
                            scope: me,
                            handler: function (b, e) {
                                me.fireEvent('btnCompareClicked', me, record);
                            }
                        }]
                    });
                    e.stopEvent();
                    menu.showAt(e.getXY());
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'RoleToolbar',
                items: [{
                    xtype: 'radiogroup',
                    itemId: 'RoleSelecter',
                    defaults: {
                        width: '100'
                    },
                    items: [{
                        boxLabel: 'Acting&nbsp;',
                        name: 'role',
                        inputValue: 'A',
                        checked: true
                    }, {
                        boxLabel: 'Other&nbsp;',
                        name: 'role',
                        inputValue: 'O'
                    }, {
                        boxLabel: 'TV',
                        name: 'role',
                        inputValue: 'T'
                    }],
                    listeners: {
                        scope: me,
                        change: me.onRoleChanged
                    }
                }]
            }, {
                xtype: 'pagingtoolbar',
                ui: 'small-toolbar',
                itemId: 'pagingTbar',
                margins: '5 0 0 0',
                store: me.store,
                dock: 'bottom'
            }]
        });

        me.callParent(arguments);

        me.on('resize', function () {
            Toolbox.BrowserResize('.results.item');
        }, me);
    },

    onRoleChanged: function (radio, newValue) {
        var store = this.getStore();
        store.getProxy().setExtraParam('role', newValue.role);
        store.loadPage(1);
    }
});