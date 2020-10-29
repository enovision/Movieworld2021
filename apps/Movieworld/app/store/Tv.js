/**
 * @class Movieworld.store.Tv
 */
Ext.define('Movieworld.store.Tv', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Tv'
    ],

    model: 'Movieworld.model.Tv',
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/MovieInfo',
        reader: {
            rootProperty: 'records',
            type: 'json',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    autoLoad: false
});