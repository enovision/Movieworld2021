Ext.define('Movieworld.view.toolbar.History', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.HistoryToolbar',

    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Movieworld.singleton.Icons'
    ],

    itemId: 'historyToolbar',
    enableOverflow: true,
    height: 50,
    hidden: true,

    items: [],

    UpdateHistory: function (name, type, record) {
        var me = this;

        var items = me.query('[breadcrumb]');

        if (items.length === 7) {
            if (me.down('#moreHistory') === null) {
                me.add({
                    xtype: 'button',
                    text: 'More History',
                    ui: 'xxl-button',
                    breadcrumb: true,
                    scale: 'large',
                    itemId: 'moreHistory',
                    iconCls: IconCls.getHistory(),
                    menu: Ext.create('Ext.menu.Menu')
                });
            }
        }

        record.set('type', type); // otherwise the event will not listen well

        var menu = (me.down('#moreHistory') !== null) ? me.down('#moreHistory').menu : me;

        var iconCls = '';
        var glyph = '';
        var icon = '';

        if (items.length < 7) {
            iconCls = type === 'P' ? 'history thumb' : (type === 'M' ? IconCls.getFilm() : IconCls.getTv());
            icon = type === 'P' ? record.get('profile_w45') : '';
            xtype = 'button';
        } else {
            iconCls = type === 'P' ? IconCls.getUsers() : (type === 'M' ? IconCls.getFilm() : IconCls.getTv());
            var xtype = 'menuitem';
        }

        var text = type === 'M' ? record.get('title') : record.get('name');
        if (text.length > 25) {
            text = text.substr(0, 22) + '...';
        }

        menu.add({
            xtype: xtype,
            scale: 'large',
            ui: 'xxl-button',
            icon: icon,
            iconCls: iconCls + ' fa-2x',
            // glyph: Glyphs.getGlyph(glyph),
            breadcrumb: true,
            text: text,
            _record: record,
            handler: function (btn) {
                var record = btn._record;
                me.fireEvent('HistoryClicked', record);
            }
        });

        me.show();
    },

    ClearHistory: function () {
        var me = this;
        var b = me.query('[breadcrumb]');
        Ext.each(b, function (item, idx) {
            item.destroy();
        }, me);
        me.hide();
    }
});