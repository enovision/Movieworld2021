Ext.define('Movieworld.view.toolbar.Status', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.StatusToolbar',

    requires: [
        'Ext.form.Label',
        'Movieworld.singleton.Icons'
    ],

    initComponent: function () {

        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'label',
                text: 'Enovision Movieworld'
            }, '-', {
                xtype: 'label',
                itemId: 'version',
                text: 'Version:'
            }, '->', {
                xtype: 'label',
                text: 'This product uses the TMDb API but is not endorsed or certified by TMDb.'
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

        me.callParent();
    },

    setVersion: function(version) {
        var fldVersion = this.down('#version');
        var text = fldVersion.text + ' ' + version;
        fldVersion.setText(text);
    }
});