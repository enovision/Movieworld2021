/**
 * @class Movieworld.store.Boxoffice
 */
Ext.define('Movieworld.store.Boxoffice', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Boxoffice'
    ],
    model: 'Movieworld.model.Boxoffice',
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/BoxOffice',
        reader: {
            rootProperty: 'records',
            type: 'json',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    autoLoad: true
});