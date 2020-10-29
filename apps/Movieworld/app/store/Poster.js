/**
 * @class Movieworld.store.Poster
 */
Ext.define('Movieworld.store.Poster', {
    extend: 'Ext.data.Store',

    requires: [
        'Movieworld.model.Media'
    ],

    model: 'Movieworld.model.Media',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'records'
        }
    },
    autoLoad: false
});