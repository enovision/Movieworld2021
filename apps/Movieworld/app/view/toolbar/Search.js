Ext.define('Movieworld.view.toolbar.Search', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.SearchToolbar',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Movieworld.singleton.Icons'
    ],

    itemId: 'searchToolbar',

    _searchWidth: 250,

    initComponent: function () {

        var me = this;

        Ext.apply(me, {
            items: [{
                text: 'Home',
                iconCls: IconCls.getHome(),
                scope: me,
                handler: function (btn, e) {
                    me.fireEvent('BoxOfficeClicked', me);
                }
            }, '-', {
                xtype: 'textfield',
                emptyText: 'Please enter search...',
                width: me._searchWidth,
                listeners: {
                    scope: me,
                    specialkey: function (field, e) {
                        if (e.getKey() == e.ENTER) {
                            var chkMovies = me.down('#chkMovies').getValue();
                            var chkPeople = me.down('#chkPeople').getValue();
                            var chkTV = me.down('#chkTV').getValue();
                            me.fireEvent('SearchClicked', field, chkMovies, chkPeople, chkTV);
                        }
                    },
                    afterrender: function (field) {
                        me.searchfield = field;
                    }
                }
            }, {
                xtype: 'button',
                tooltip: 'Search',
                iconCls: IconCls.getSearch(),
                scope: me,
                handler: function (b, e) {
                    var chkMovies = me.down('#chkMovies').getValue();
                    var chkPeople = me.down('#chkPeople').getValue();
                    var chkTV = me.down('#chkTV').getValue();
                    me.fireEvent('SearchClicked', me.searchfield, chkMovies, chkPeople, chkTV);
                }
            }, {
                tooltip: 'Reset Search',
                iconCls: IconCls.getUndo(),
                scope: me,
                handler: function (btn, e) {
                    var s = me.searchfield;
                    if (s.getValue() !== '') {
                        s.setValue('');

                        me.fireEvent('ResetSearchClicked', me);
                    }
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'Movies',
                itemId: 'chkMovies',
                checked: true
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'TV',
                itemId: 'chkTV',
                checked: true
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'People',
                itemId: 'chkPeople',
                checked: true
            }, '-', {
                text: 'Who worked with who',
                iconCls: IconCls.getMen_at_work(),
                tooltip: 'Did your favorite actors play together?',
                scope: me,
                handler: function (btn, e) {
                    me.fireEvent('WorkClicked', me);
                }
            }, '->', {
                text: 'Clear History',
                iconCls: IconCls.getHistory(),
                scope: me,
                handler: function (btn, e) {
                    me.fireEvent('ClearHistoryClicked', me);
                }
            }, {
                text: 'Feedback',
                iconCls: IconCls.getFeedback(),
                scope: me,
                handler: function (btn, e) {
                    me.fireEvent('FeedbackClicked', me);
                }
            }, {
                text: 'Credits',
                iconCls: IconCls.getCredits(),
                scope: me,
                handler: function (btn, e) {
                    me.fireEvent('CreditsClicked', me);
                }
            }]
        });

        this.callParent();
    }
});