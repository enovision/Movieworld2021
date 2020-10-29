/**
 * Created by J.vd.Merwe on 03-Jan-17.
 */
Ext.define('Movieworld.view.panel.DetailPersonCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailPersonCardController',

    requires: [
        'Movieworld.singleton.AppSettings',
        'Movieworld.singleton.Icons'
    ],

    init: function () {

    },

    control: {
        '#': {
            onUpdatePersonContent: 'onUpdatePersonContent'
        }
    },

    onBtnCompareClicked: function (btn) {
       var view = this.getView();
       this.getView().fireEvent('btnCompareClicked', view, view._record);
    },

    onBtnTmdbClicked: function (btn) {
        this.getView().fireEvent('TmdbClicked', btn);
    },

    onBtnWebsiteClicked: function (btn) {
         this.getView().fireEvent('btnWebsiteClicked', btn);
    },

    onBtnCollapseClicked: function (btn) {
        var view = this.getView();
        var panel = this.lookupReference('PersonInfo');
        if (panel.isHidden() === true) {
            btn.setTooltip('Collapse Info');
            btn.setIconCls(IconCls.getHide_up());
            panel.show();
        } else {
            btn.setTooltip('Expand Info');
            btn.setIconCls(IconCls.getHide_down());
            panel.hide();
        }
    },

    onMediaItemClicked: function (type, dataview, record, item) {
        var me = this;
        var view = this.getView();
        var tbar = view.down('DownloadToolbar');
        tbar.resetDownload();

        var image = tbar.down('image');
        tbar.updateImage(record.get('file_w185'), 68, 45);
        tbar.storeRecord(record, item);
        tbar.show();
    },
    onUpdatePersonContent: function (records) {
        var me = this;
        var view = this.getView();

        view.down('DownloadToolbar').hide();

        var panel = view.query('MediaDataview');
        Ext.each(panel, function (item, idx) {
            item.update('');
        });

        var tabpanel = view.down('tabpanel');

        tabpanel.setActiveTab(0);

        view._record = records[0];
        // first record of only 1 record !!!
        var data = view._record.data;
        me.loadMediaDataViews(view._record.get('id_tmdb'));

        tabpanel.setActiveTab(1);

        var PersonInfo = me.lookupReference('PersonInfo');
        PersonInfo.tpl.overwrite(PersonInfo.body, data);

        var Bio = view.lookupReference('Biography');
        Bio.tpl.overwrite(Bio.body, data);

        tabpanel.setActiveTab(0);

        var btn = me.lookupReference('btnHomepage');
        var name = view._record.get('name');
        btn.setText('Website ' + name);

        btn['_Website'] = view._record.get('homepage');
        // abuse the button

        if (btn._Website != '') {
            btn.enable();
        } else {
            btn.disable();
        }

        // TMDB ---- //
        btn = me.lookupReference('btnTMDB');
        var id = view._record.get('id_tmdb');
        btn['_tmdb_id'] = id;
        // abuse the button
        btn['_type'] = 'P';
        // abuse the button

        if (btn.id != '') {
            btn.enable();
            btn.setTooltip('Tmdb Id: ' + id);
        } else {
            btn.disable();
        }
    },
    loadMediaDataViews: function (id_tmdb) {
        var me = this;
        var view = me.getView();

        Ext.Ajax.request({
            url: AppSettings.getServer() + 'movies/media',
            method: 'GET',
            cors: true,
            useDefaultXhrHeader: false,
            params: {
                id_tmdb: id_tmdb,
                type: 'personimages'
            },
            success: function (json) {
                var response = Ext.decode(json.responseText);
                view.down('MediaDataview').LoadMedia(id_tmdb, response.records['profiles']);
            }
        });
    }
});