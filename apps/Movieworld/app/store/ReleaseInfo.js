/**
 * @class Movieworld.store.ReleaseInfo
 */
Ext.define('Movieworld.store.ReleaseInfo', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.ReleaseInfo'
    ],
    model: 'Movieworld.model.ReleaseInfo',
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/MovieReleaseInfo',
        reader: {
            rootProperty: 'countries',
            type: 'json',
            idProperty: 'iso_3166_1'
        }
    },
    autoLoad: false
});