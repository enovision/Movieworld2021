/**
 * @class Movieworld.store.Trailer
 */
Ext.define('Movieworld.store.Trailer', {
    extend: 'Ext.data.Store',

    requires: [
        'Movieworld.model.Media'
    ],

    model: 'Movieworld.model.Media',
    autoLoad: false
});