Ext.define('Movieworld.view.window.Feedback', {
    requires: [
        'Ext.button.Button',
        'Ext.data.JsonP',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Movieworld.singleton.AppSettings',
        'Movieworld.singleton.Icons',
        'TipToast.Toast'
    ],
    alternateName: ['Feedback'],
    extend: 'Ext.window.Window',
    height: 500,
    width: 600,
    iconCls: IconCls.getFeedback(),
    modal: true,
    title: 'Feedback',
    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    anchor: '-24'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Name',
                    allowBlank: false,
                    msgTarget: 'side',
                    listeners: {
                        'afterrender': function (field) {
                            field.focus(false, 1000);
                        }
                    }
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Reply',
                    defaults: {
                        listeners: {
                            scope: this,
                            change: function (radio, newValue) {
                                var me = this;
                                if (newValue === true) {
                                    var email = me.down('form [name=email]');
                                    if (radio.inputValue === 'none') {
                                        email.hide();
                                        email.disable();
                                    } else {
                                        if (radio.inputValue === 'mail') { // this works
                                            email.setFieldLabel('Email');
                                        } else {
                                            email.setFieldLabel('Phone');
                                        }
                                        email.show();
                                        email.enable();
                                        email.focus();
                                    }
                                }
                            }
                        }
                    },
                    items: [{
                        name: 'reply',
                        inputValue: 'mail',
                        boxLabel: 'Email'
                    }, {
                        name: 'reply',
                        inputValue: 'phone',
                        boxLabel: 'Call me'
                    }, {
                        name: 'reply',
                        inputValue: 'none',
                        boxLabel: 'None',
                        checked: true
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    hidden: true,
                    disabled: true,
                    fieldLabel: 'Email',
                    allowBlank: false,
                    msgTarget: 'side'
                }, {
                    xtype: 'textfield',
                    name: 'subject',
                    fieldLabel: 'Subject'
                }, {
                    xtype: 'textareafield',
                    height: 203,
                    width: 558,
                    name: 'message',
                    fieldLabel: 'Message',
                    allowBlank: false,
                    msgTarget: 'side'
                }]
            }],
            buttons: [{
                xtype: 'tbfill'
            }, {
                xtype: 'button',
                width: 100,
                text: 'Reset Form',
                scope: me,
                handler: function (b, e) {
                    me.down('form').getForm().reset();
                }
            }, {
                xtype: 'button',
                width: 100,
                text: 'Send',
                itemId: 'btnSend',
                scope: me,
                handler: me.SendContactForm
            }, {
                text: 'Close',
                scope: this,
                handler: function () {
                    me.destroy();
                }
            }]
        });

        me.callParent(arguments);
    },

    SendContactForm: function () {
        var me = this;

        var form = me.down('form');

        if (form.isValid() == false) {
            return;
        }

        Ext.data.JsonP.request({
            url: AppSettings.getServer() + 'feedback/submit',
            //method: 'POST',
            //cors: true,
            //dataType: 'jsonp',
            //useDefaultXhrHeader: false,
            callbackKey: 'cbJSON',
            params: form.getValues(),
            success: function (response) {
                if (response.success === true) {
                    TipToast.info('Info', response.message);
                    me.destroy();
                } else {
                    Ext.Msg.show({
                        title: 'Alert',
                        msg: response.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (response) {
                Ext.Msg.show({
                    title: 'Alert',
                    msg: response.message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
});