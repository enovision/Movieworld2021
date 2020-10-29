Ext.define('Movieworld.store.PosterTV', {
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