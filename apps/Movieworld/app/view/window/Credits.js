Ext.define('Movieworld.view.window.Credits', {
    extend: 'Ext.window.Window',
    alias: 'widget.CreditsWindow',

    requires: [
        'Ext.button.Button',
        'Ext.data.StoreManager',
        'Ext.grid.Panel',
        'Ext.grid.column.Template',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Movieworld.singleton.Icons'
    ],

    width: 700,
    height: 500,
    modal: true,
    layout: 'fit',
    resizable: false,
    title: 'Credits',
    iconCls: IconCls.getCredits(),

    initComponent: function () {
        var me = this;

        var tplLegal = new Ext.XTemplate(
            '<div class="credits_legal wrap">',
            '<p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>',
            '<p>This product is not for sale, the source code is freely available and there are ',
            'no commercial objectives with this product.</p>',
            '<p>All of the content on this Site ("Materials"), the trademarks, service marks, and logos ',
            'contained on this Site ("Marks"), are owned by or licensed to <b>TMDb Inc.</b> and are subject ',
            'to copyright and other intellectual property rights under United States and foreign laws and ',
            'international conventions. They reserve all rights not expressly granted in and to this Site and ',
            'the Materials. You agree that you will not circumvent, disable or otherwise interfere with security ',
            'related features of this Site or features that:</p>',
            '<ul>',
            '<li>(a) prevent or restrict use or copying of any Materials or</li>',
            '<li>(b) enforce limitations on use of this Site or the Materials on this Site</li>',
            '</ul>',
            '<p>For the impressum of Enovision GmbH, click <a class="credits url" href=\"{impressum}\" target=\"_blank\">here</a></p>',
            '<img class="credits logo" src="resources/img/logo_250.png" alt="Logo Enovision" />',
            '</div>'
        );

        var tplFront = new Ext.XTemplate(
            '<div class="credits wrap">',
            '<div class="credits developer">Developer: {developer}</div>',
            '<div class="credits url"><a href="{url_enovision}" target="_blank">Website Enovision</a></div>',
            '<div class="credits url"><a href="{url_tmdb}" target="_blank">Website TMDb</a></div>',
            '<div class="credits release"> (p) {year}</div>',
            '</div>'
        );

        var data = {
            impressum: 'http://www.enovision.net/impressum',
            url_enovision: 'http://www.enovision.net',
            url_tmdb: 'http://www.themoviedb.org',
            developer: 'Johan van de Merwe',
            year: '2012-2015'
        };

        Ext.apply(me, {

            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                deferredRender: true,
                items: [{
                    xtype: 'panel',
                    title: '&nbsp;',
                    iconCls: IconCls.getMovie(),
                    cls: 'credits front',
                    tpl: tplFront,
                    listeners: {
                        afterrender: function (panel) {
                            panel.tpl.overwrite(panel.body, data);
                        }
                    }
                }, {
                    xtype: 'panel',
                    title: 'Legal',
                    iconCls: IconCls.getLegal(),
                    bodyPadding: 20,
                    tpl: tplLegal,
                    listeners: {
                        afterrender: function (panel) {
                            panel.tpl.overwrite(panel.body, data);
                        }
                    }
                }, {
                    xtype: 'grid',
                    store: Ext.StoreMgr.lookup('Credits'),
                    title: 'Software',
                    itemId: 'CreditsGrid',
                    iconCls: IconCls.getSoftware(),
                    autoScroll: true,
                    layout: 'fit',
                    columns: [{
                        text: "Software",
                        width: 140,
                        dataIndex: 'name',
                        renderer: function (val) {
                            return '<img src="' + 'resources/img/credits/logo_' + val + '.jpg" width="130px" />';
                        }
                    }, {
                        text: "Copyright",
                        flex: 1,
                        dataIndex: 'copyright'
                    }, {
                        text: "License",
                        flex: 1,
                        dataIndex: 'license'
                    }, {
                        text: '<i class="mw-web"></i>',
                        xtype: 'templatecolumn',
                        width: 50,
                        dataIndex: 'website',
                        tooltip: 'To Website',
                        tpl: new Ext.XTemplate(
                             '<a href="{website}" target="_blank"><i class="mw-web"></i></a>'
                        ).compile()
                    }]
                }, {
                    xtype: 'grid',
                    store: Ext.StoreMgr.lookup('ChangeLog'),
                    title: 'Changelog',
                    iconCls: IconCls.getLog(),
                    autoScroll: true,
                    layout: 'fit',
                    columns: [{
                        text: "Date",
                        width: 100,
                        dataIndex: 'date'
                    }, {
                        text: "Modification",
                        flex: 1,
                        dataIndex: 'description'
                    }, {
                        text: "Version",
                        width: 70,
                        dataIndex: 'version'
                    }]
                }]
            }],
            buttons: [{
                xtype: 'button',
                text: 'Close',
                scope: me,
                handler: function () {
                    me.destroy();
                }
            }]

        });

        me.callParent(arguments);
    }

});