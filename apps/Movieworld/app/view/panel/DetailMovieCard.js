Ext.define('Movieworld.view.panel.DetailMovieCard', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.DetailMovieCard',
    controller: 'DetailMovieCardController',

    title: 'Movie Details',
    header: false,
    iconCls: IconCls.getFilm(),
    layout: 'fit',
    deferredRender: false,

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'Ext.menu.Menu',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Movieworld.singleton.Icons',
        'Movieworld.singleton.Toolbox',
        'Movieworld.view.panel.DetailMovieCardController',
        'Movieworld.view.panel.MediaPanel'
    ],

    items: [{
        xtype: 'panel',
        reference: 'MovieDetailInfo',
        cls: 'DetailInfo',
        title: 'Overview',
        iconCls: IconCls.getOverview(),
        autoScroll: true,
        bodyPadding: 20,
        tpl: new Ext.XTemplate(
            '<div class="pure-g">',
            '   <div class="detail_wrap_left pure-u-sm-1-1 pure-u-md-1-4 pure-u-lg-1-4 pure-u-xl-1-4">',
            '      <h1>Factsheet</h1>',
            '      <div class="data-header">Original Title</div>',
            '      <div class="data-field">{original_title}</div>',
            '      <div class="data-header">Tagline</div>',
            '      <div class="data-field">{tagline}</div>',
            '      <div class="data-header">Production Companies</div>',
            '      <div>',
            '         <ul class="data-field">',
            '           <tpl for="production_companies">',
            '              <li>{name}</li>',
            '           </tpl>',
            '         </ul>',
            '      </div>',
            '      <div class="data-header">Production Countries</div>',
            '      <div>',
            '         <ul class="data-field">',
            '           <tpl for="production_countries">',
            '              <li>{name}</li>',
            '           </tpl>',
            '         </ul>',
            '      </div>',
            '      <div class="data-header">Spoken Languages</div>',
            '      <div>',
            '         <ul class="data-field">',
            '           <tpl for="spoken_languages">',
            '              <li>{name}</li>',
            '           </tpl>',
            '         </ul>',
            '      </div>',
            '      <tpl if="this.isTrue(adult)">',
            '          <div class="data-header">Adult</div>',
            '          <div class="data-field">{[this.getYN(values.adult)]}</div>',
            '      </tpl>',
            '      <tpl if="this.notZero(budget)">',
            '          <div class="data-header">Budget</div>',
            '          <div class="data-field">{[Toolbox.ConvertNumber(values.budget)]}</div>',
            '      </tpl>',
            '      <tpl if="this.notZero(revenue)">',
            '         <div class="data-header">Revenue</div>',
            '         <div class="data-field">{[Toolbox.ConvertNumber(values.revenue)]}</div>',
            '      </tpl>',
            '      <div class="data-header">Genres</div>',
            '      <ul class="data-field">',
            '        <tpl for="genres">',
            '           <li>{name}</li>',
            '        </tpl>',
            '      </ul>',
            '   </div>',
            '   <div class="detail_wrap_right pure-u-sm-1-1 pure-u-md-3-4 pure-u-lg-3-4 pure-u-xl-3-4">',
            '      <div class="image-wrap">',
            '         <img src="{poster_w185}"></img>',
            '      </div>',
            '      <div class="info-wrap">',
            '         <div class="title">{original_title}</div>',
            '         <div class="data-field">{overview}</div>',
            '      </div>',
            '   </div>',
            '</div>',
            {
                notZero: function (val) {
                    return values > 0;
                },
                isTrue: function (val) {
                    return val;
                },
                getYN: function (item) {
                    return item === true ? 'Yes' : 'No';
                }
            }
        ).compile()
    }, {
        xtype: 'MediaPanel',
        reference: 'MovieDetailTab',
        title: 'Images',
        tabPosition: 'left',
        _store: {
            'backdrop': 'Backdrop',
            'poster': 'Poster'
        },
        listeners: {
            loadtrailers: 'onLoadTrailers'
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: IconCls.getHide_up(),
            tooltip: 'Collapse Info',
            handler: 'onBtnCollapseClicked'
        },{
            xtype: 'button',
            text: 'Release Info',
            iconCls: IconCls.getCalendar(),
            reference: 'btnReleaseInfo',
            handler: 'onBtnReleaseInfoClicked'
        }, {
            xtype: 'button',
            text: 'Trailers',
            iconCls: IconCls.getCamera(),
            reference: 'btnTrailers',
            disabled: true,
            menu: Ext.create('Ext.menu.Menu')
        }, '->', {
            xtype: 'button',
            text: 'See it on TMDB',
            disabled: true,
            iconCls: 'tmdb',
            reference: 'btnTMDB',
            handler: 'onBtnTMDBClicked'
        }, {
            xtype: 'button',
            text: 'See it on IMDB',
            disabled: true,
            iconCls: 'imdb',
            reference: 'btnIMDB',
            handler: 'onBtnIMDBClicked'
        }, {
            xtype: 'button',
            text: 'Website',
            iconCls: IconCls.getWebsite(),
            disabled: true,
            reference: 'btnWebsite',
            handler: 'onBtnWebsiteClicked'
        }]
    }, {
        xtype: 'panel',
        dock: 'top',
        reference: 'MovieInfo',
        height: 100,
        tpl: new Ext.XTemplate(
            '<div class="tv-info wrap">',
            '   <div class="pure-g">',
            '      <div class="thumbnail  pure-u-sm-4-24 pure-u-md-2-24 pure-u-lg-1-24 pure-u-xl-1-24">',
            '         <img class="thumb pure-img" src="{poster_w185}"/>',
            '      </div>',
            '      <div class="info pure-u-sm-7-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24">',
            '         <div class="title">{title}</div>',
            '         <div class="vote"></div>',
            '         <div class="data-field">({vote_count} votes)</div>',
            '      </div>',

            '      <div class="info-2  pure-u-sm-9-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24">',
            '         <div class="data-field"><i class="fa fa-calendar gray width-10"></i>&nbsp;&nbsp;{release_date}</div>',
            '         <tpl if="this.hasBudget(budget)">',
            '            <div class="data-field"><i class="fa fa-usd gray width-10"></i>&nbsp;&nbsp;{[Toolbox.ConvertNumber(values.budget)]}</div>',
            '         </tpl>',
            '         <div class="data-field"><i class="fa fa-hourglass-o gray width-10"></i>&nbsp;&nbsp;{runtime} minutes</div>',
            '         <div class="data-field"><i class="fa fa-dot-circle-o gray width-10"></i>&nbsp;&nbsp;{status}</div>',
            '      </div>',
            '   </div>',
            '</div>',
            {
                hasBudget: function (val) {
                    return Toolbox.ConvertNumber(val) > 0;
                }
            }
        )
    }]
});
