/**
 * @class Movieworld.store.Movie
 */
Ext.define('Movieworld.store.Movie', {
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Movie',
        'Movieworld.model.Movie',
        'Movieworld.model.Movie'
    ],
    extend: 'Ext.data.Store',
    model: 'Movieworld.model.Movie',
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