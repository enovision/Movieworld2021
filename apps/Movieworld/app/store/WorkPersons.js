/**
 * @class Movieworld.store.WorkPersons
 */
Ext.define('Movieworld.store.WorkPersons', {
    extend: 'Ext.data.Store',

    requires: [
        'Movieworld.model.Person'
    ],

    model: 'Movieworld.model.Person',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'records'
        }
    },
    autoLoad: false
});