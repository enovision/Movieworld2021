Ext.define('Movieworld.store.Backdrop', {
    extend: 'Ext.data.Store',

    requires: [
        'Movieworld.model.Media'
    ],

    model: 'Movieworld.model.Media',
    autoLoad: false
});