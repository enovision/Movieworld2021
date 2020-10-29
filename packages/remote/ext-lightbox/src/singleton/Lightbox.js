/**
 * Created by j.vd.merwe on 10/24/17.
 */
Ext.define('Lightbox.singleton.Lightbox', {
    singleton: true,
    alternateClassName: ['ExtLightBox'],

    config: {},

    constructor: function (config) {
        this.initConfig(config);
    },

    /**
     * Shows the lightbox
     * @param {array} thumbnails
     * @param {object} options
     */
    lightbox: function (thumbnail, options) {
        basicLightbox.create('<img src="' + thumbnail + '" />', {
            closable: true
        }).show();
    }
});