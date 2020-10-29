/**
 * @class Movieworld.store.Translations
 */
Ext.define('Movieworld.store.Translations', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Translations'
    ],
    model: 'Movieworld.model.Translations',
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/TvTranslations',
        reader: {
            rootProperty: 'records.translations',
            type: 'json',
            idProperty: 'iso_639_1'
        }
    },
    autoLoad: false
});