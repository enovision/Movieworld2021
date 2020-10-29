Ext.define('Movieworld.view.panel.DetailPersonCard', {
    controller: 'DetailPersonCardController',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.toolbar.Fill',
        'Movieworld.singleton.Icons',
        'Movieworld.view.panel.DetailPersonCardController',
        'Movieworld.view.toolbar.Download',
        'Movieworld.view.view.MediaDataview'
    ],
    extend: 'Ext.panel.Panel',
    alias: 'widget.DetailPersonCard',
    title: 'Person Details',
    layout: 'fit',
    header: false,
    iconCls: IconCls.getUsers(),

    items: [{
        xtype: 'tabpanel',
        deferredRender: 'false',
        layout: 'fit',
        items: [{
            title: 'Biography',
            reference: 'Biography',
            iconCls: IconCls.getBio(),
            //  xtype: 'panel', /* otherwise autoScroll is not working */
            tpl: new Ext.XTemplate(
                '<div class="person_wrap">',
                '   <div class="header">Bio</div>',
                '   <div class="pure-g">',
                '      <div class="image-wrap pure-u-sm-1-1 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-3">',
                '         <img class="thumb" src="{profile_h632}"/>',
                '      </div>',
                '      <div class="pure-u-sm-1-1 pure-u-md-2-3 pure-u-lg-2-3 pure-u-xl-2-3">',
                '         <div class="title">{name}</div>',
                '         <div class="data-field">{biography}</div>',
                '      </div>',
                '   </div>',
                '</div>'
            ).compile(),
            autoScroll: true
        }, {
            xtype: 'panel', /* otherwise no dockedItems are possible */
            title: 'Images',
            iconCls: IconCls.getImage(),
            autoScroll: true,
            items: [{
                xtype: 'MediaDataview',
                reference: 'PersonDetailProfiles',
                _type: 'profiles',
                _store: 'Profile',
                listeners: {
                    MediaItemClicked: 'onMediaItemClicked'
                }
            }],
            dockedItems: [{
                xtype: 'DownloadToolbar',
                dock: 'top',
                hidden: true
            }]
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: IconCls.getHide_up(),
            tooltip: 'Collapse Info',
            handler: 'onBtnCollapseClicked'
        }, {
            text: 'Add to Who worked with who',
            iconCls: IconCls.getLink(),
            handler: 'onBtnCompareClicked'
        }, '->', {
            xtype: 'button',
            text: 'See it on TMDb',
            disabled: true,
            iconCls: 'tmdb',
            reference: 'btnTMDB',
            handler: 'onBtnTmdbClicked'
        }, {
            xtype: 'button',
            text: 'Website',
            disabled: true,
            _Website: false, //
            iconCls: IconCls.getWebsite(),
            reference: 'btnHomepage',
            handler: 'onBtnWebsiteClicked'
        }]
    }, {
        xtype: 'panel',
        dock: 'top',
        reference: 'PersonInfo',
        height: 95,
        tpl: new Ext.XTemplate(
            '<div class="tv-info wrap">',
            '   <div class="pure-g"/>',
            '      <div class="thumbnail pure-u-sm-4-24 pure-u-md-2-24 pure-u-lg-1-24 pure-u-xl-1-24">',
            '         <img class="thumb" src="{profile_w185}"/>',
            '      </div>',
            '      <div class="info pure-u-sm-8-24 pure-u-md-5-24 pure-u-lg-4-24 pure-u-xl-4-24">',
            '         <div class="title">{name}</div>',
            '         <div class="vote"></div>',
            '      </div>',
            '      <div class="info-2 pure-u-sm-9-24 pure-u-md-15-24 pure-u-lg-15-24 pure-u-xl-15-24">',
            '         <div class="data-field"><i class="mw-born gray width-10"></i>&nbsp;&nbsp;{birthday}</div>',
            '         <tpl if="this.isNotEmpty(deathday)">',
            '             <div class="data-field"><i class="mw-died gray width-10"></i>&nbsp;&nbsp;{deathday}</div>',
            '         </tpl>',
            '         <tpl if="this.isNotEmpty(place_of_birth)">',
            '             <div class="data-field"><i class="fa fa-map-marker gray width-10"></i>&nbsp;&nbsp;{place_of_birth}</div>',
            '         </tpl>',
            '      </div>',
            '    </div>',
            '</div>',
            {
                isNotEmpty: function (val) {
                    return val !== '' && val !== null;
                }
            }).compile()
    }],
    updatePersonContent: function (records) {
        this.fireEvent('onUpdatePersonContent', records);
    }
});
