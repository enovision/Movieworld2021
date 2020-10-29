Ext.define('Movieworld.view.panel.DetailTvCard', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.DetailTvCard',
    controller: 'DetailTvCardController',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'Ext.layout.container.boxOverflow.Menu',
        'Ext.menu.Menu',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Movieworld.singleton.Icons',
        'Movieworld.view.grid.TvSeasons',
        'Movieworld.view.panel.DetailTvCardController',
        'Movieworld.view.panel.MediaPanel'
    ],

    title: 'TV Program Details',
    header: false,
    iconCls: IconCls.getTv(),
    layout: 'fit',

    deferredRender: false,

    items: [{
        xtype: 'panel',
        reference: 'TvDetailInfo',
        title: 'Overview',
        iconCls: IconCls.getOverview(),
        cls: 'DetailInfo',
        autoScroll: true,
        bodyPadding: 20,
        tpl: new Ext.XTemplate(
            '<div class="pure-g">',
            '   <div class="detail_wrap_left pure-u-sm-1-1 pure-u-md-1-4 pure-u-lg-1-4 pure-u-xl-1-4"/>',
            '      <div class="header">Facts</div>',
            '      <div class="data-header">Original Title</div>',
            '      <div class="data-field">{original_name}</div>',
            '      <div class="data-header">Created by</div>',
            '      <div>',
            '         <ul class="data-field">',
            '            <tpl for="created_by">',
            '               <li>{name}</li>',
            '            </tpl>',
            '         </ul>',
            '      </div>',
            '      <div class="data-header">In production</div>',
            '      <div class="data-field">{[this.getYN(values.in_production)]}</div>',
            '      <div class="data-header">Episode runtime</div>',
            '      <div>',
            '         {[this.getList(values.episode_run_time)]}',
            '      </div>',
            '      <div class="data-header">Languages:</div>',
            '      <div>',
            '         {[this.getList(values.languages)]}',
            '      </div>',
            '      <div class="data-header">Genres</div>',
            '      <div>',
            '         <ul class="data-field">',
            '            <tpl for="genres">',
            '               <li>{name}</li>',
            '            </tpl>',
            '         </ul>',
            '      </div>',
            '   </div>',
            '   <div class="detail_wrap_right pure-u-sm-1-1 pure-u-md-3-4 pure-u-lg-3-4 pure-u-xl-3-4">',
            '      <div class="image-wrap">',
            '         <img src="{poster_w185}"></img>',
            '      </div>',
            '      <div class="info-wrap">',
            '         <div class="title">{original_name}</div>',
            '         <div class="data-field">{overview}</div>',
            '      </div>',
            '   </div>',
            '</div>',
            {
                getList: function (items) {
                    if (items.length > 0) {
                        var o = '<ul class="data-field list">';
                        Ext.each(items, function (i) {
                            o = o + '<li>' + i + '</li>';
                        });
                        return o + '</ul>';
                    } else {
                        return '';
                    }
                },
                getYN: function (item) {
                    return item === true ? 'Yes' : 'No';
                }
            })
    }, {
        xtype: 'MediaPanel',
        title: 'Images',
        iconCls: IconCls.getImage(),
        tabPosition: 'left',
        reference: 'TvDetailTab',
        _store: {
            'backdrop': 'BackdropTV',
            'poster': 'PosterTV'
        },
        listeners: {
            'loadtrailers': 'onLoadTrailers'
        }
    }, {
        xtype: 'TvSeasonsGrid',
        reference: 'TvSeasonsGrid',
        title: 'Seasons',
        iconCls: IconCls.getLeaf(),
        disabled: true
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'menu',
        defaults: {
            xtype: 'button',
            disabled: true
        },
        items: [{
            iconCls: IconCls.getHide_up(),
            tooltip: 'Collapse Info',
            handler: 'onBtnCollapseClicked',
            disabled: false
        },{
            text: 'Translations',
            iconCls: IconCls.getTranslation(),
            disabled: false,
            reference: 'btnTranslations',
            handler: 'onBtnTranslationsClicked'
        }, {
            text: 'Trailers',
            iconCls: IconCls.getCamera(),
            reference: 'btnTrailers',
            menu: Ext.create('Ext.menu.Menu')
        }, '->', {
            text: 'Show on IMDB',
            iconCls: 'imdb',
            reference: 'btnIMDB',
            handler: 'onBtnIMDBClicked'
        }, {
            text: 'Show on TMDB',
            iconCls: 'tmdb',
            reference: 'btnTMDB',
            handler: 'onBtnTMDBClicked'
        }, {
            text: 'Show on TVDB',
            disabled: true,
            iconCls: 'tvdb',
            reference: 'btnTVDB',
            handler: 'onBtnTVDBClicked'
        }, {
            text: 'Website',
            iconCls: IconCls.getWebsite(),
            disabled: true,
            reference: 'btnWebsite',
            handler: 'onBtnWebsiteClicked'
        }]
    }, {
        xtype: 'panel',
        dock: 'top',
        reference: 'SeasonsInfo',
        layout: 'fit',
        tpl: new Ext.XTemplate(
            '<div class="tv-info wrap">',
            '   <div class="pure-g">',
            '      <div class="thumbnail pure-u-sm-4-24 pure-u-md-2-24 pure-u-lg-2-24 pure-u-xl-2-24">',
            '         <img class="thumb pure-img" src="{poster_w185}"/>',
            '      </div>',
            '      <div class="info pure-u-sm-8-24 pure-u-md-8-24 pure-u-lg-8-24 pure-u-xl-8-24">',
            '         <div class="title">{name}</div>',
            '         <div class="vote"></div>',
            '         <div class="data-field">({vote_count} votes)</div>',
            '      </div>',
            '      <div class="info-2 pure-u-sm-9-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24">',
            '         <div class="data-field"><b>First Aired:&nbsp;</b>{first_air_date}</div>',
            '         <div class="data-field"><b>Last Aired:&nbsp;</b>{last_air_date}</div>',
            '         <div class="data-field"><b># Episodes:&nbsp;</b>{number_of_episodes}</div>',
            '         <div class="data-field"><b># Seasons:&nbsp;</b>{number_of_seasons}</div>',
            '         <div class="data-field country"><b>Country:&nbsp;</b>{[this.getFlag(values.origin_country)]}</div>',
            '         <div class="data-field"><b>Status:&nbsp;</b>{status}</div>',
            '      </div>',
            '   </div>',
            '</div>',
            {
                getFlag: function (country) {
                    return '<img src="./resources/img/flags/png/' + country[0].toLowerCase() + '.png" width="16px" />';
                }
            })
    }]
});