/**
 * @class Movieworld.store.Content
 */
Ext.define('Movieworld.store.Content', {
    requires: [
        'Ext.data.proxy.JsonP',
        'Movieworld.singleton.AppSettings',
        'Movieworld.model.Content'
    ],
    extend: 'Ext.data.Store',
    model: 'Movieworld.model.Content',
    proxy: {
        type: 'jsonp',
        callbackKey: 'cbJSON',
        actionMethods: {
            read: 'POST'
        },
        url: AppSettings.getServer() + 'movies/ContentSearch',
        reader: {
            rootProperty: 'records',
            type: 'json',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    autoLoad: false
});