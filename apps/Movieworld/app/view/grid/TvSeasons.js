Ext.define('Movieworld.view.grid.TvSeasons', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.TvSeasonsGrid',

    requires: [
        'Ext.data.Store',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Template',
        'Lightbox.singleton.Lightbox',
        'Movieworld.singleton.Toolbox'
    ],

    title: 'Seasons',
    border: true,
    cls: 'seasons grid',

    emptyText: 'No records found',

    _tvID: false,
    _season: false,
    store: 'TvSeason',

    initComponent: function () {
        var me = this;

        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['air_date', 'season_number', 'poster_w92']
        });

        Ext.apply(me, {
            columns: [{
                text: "#",
                width: 30,
                dataIndex: 'episode_number'
            }, {
                text: "Episode",
                xtype: 'templatecolumn',
                flex: 1,
                tpl: new Ext.XTemplate(
                    '<div class="pure-g">',
                    '<div class="pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-5 pure-u-xl-1-5">',
                    '<tpl if="">',
                    '   {[this.renderThumb(values.still_w185)]}',
                    '</tpl>',
                    '</div>',
                    '<div class="pure-u-sm-1-2 pure-u-md-2-3 pure-u-lg-4-5 pure-u-xl-4-5">',
                    '  <div class="seasons item {[this.getResClass()]}">',
                    '     <div class="seasons wrap {[this.getVisible(values.name, values.overview)]}">',
                    '        <div class="name">{name}</div>',
                    '        <div class="aired strong"><i class="fa fa-tv"></i> {air_date}</div>',
                    '        <div class="overview regular">{overview}</div>',
                    '     </div>',
                    '  </div>',
                    '</div>',
                    '</div>',
                    {
                        getResClass: function () {
                            return Toolbox.getResolutionClass();
                        },
                        getVisible: function (name, overview) {
                            return name === '' && overview === '' ? 'hidden' : '';
                        },
                        renderThumb: function (val) {
                            if (val.length > 0) {
                                return '<img style="max-width:100%;" src="' + val + '"</img>';
                            } else {
                                return '&nbsp';
                            }
                        }
                    }
                )
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'SeasonsToolbar',
                items: [{
                    xtype: 'combo',
                    fieldLabel: 'Season',
                    store: comboStore,
                    queryMode: 'local',
                    displayField: 'season_number',
                    valueField: 'season_number',
                    listeners: {
                        scope: me,
                        change: me.onSeasonChange
                    }
                }]
            }],
            viewConfig: {
                style: {
                    overflow: 'auto',
                    overflowX: 'hidden'
                }
            },
            listeners: {
                scope: me,
                beforecellclick: function (grid, td, cellIndex, record) {

                    // below works, but there is no content, so it is put it off for now
                    // --> this.fireEvent('griditemselected', grid, record);

                    if (cellIndex !== 1)
                        return false;
                },
                cellclick: me.onCellSelected
            }
        });

        me.callParent(arguments);

        me.on('resize', function () {
            Toolbox.BrowserResize('.seasons.item');
        }, me);
    },

    LoadSeasons: function (seasons) {
        var combo = this.down('combo');
        var store = combo.store;

        store.removeAll();

        Ext.each(seasons, function (season) {
            store.add(season);
        }, this);

        combo.suspendEvents();
        combo.setValue(seasons[0].season_number);
        combo.resumeEvents();

    },

    LoadEpisodes: function (tvId, Season, allSeasons) {
        var me = this;
        me._tvId = tvId;

        if (me._season === false) {
            me.LoadSeasons(allSeasons);
        }

        me._season = Season;

        var store = this.getStore();

        store.getProxy().setExtraParams({
            id_tmdb: tvId,
            season: Season
        });

        store.loadPage(1, {
            scope: me,
            callback: function (records, operation, success) {
                if (records.length === 0) {
                    me.setDisabled(true);
                } else {
                    me.setDisabled(false);
                }
            }
        });
    },

    onSeasonChange: function (combo, newValue) {
        this.LoadEpisodes(this._tvId, newValue);
    },

    onCellSelected: function (grid, td, column, record) {
        // if thumbnail clicked then show lightbox
        if (column === 1 && record.get('still_original')) {
            ExtLightBox.lightbox(record.get('still_original'), {});
        }
    }
});
