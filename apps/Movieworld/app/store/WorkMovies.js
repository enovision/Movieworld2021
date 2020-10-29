/**
 * @class Movieworld.store.WorkMovies
 */
Ext.define('Movieworld.store.WorkMovies', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Search'
    ],

    model: 'Movieworld.model.Search', // please notice !!!
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/WorkCompare',
        reader: {
            rootProperty: 'records',
            type: 'json',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    autoLoad: false
});