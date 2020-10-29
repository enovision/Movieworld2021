/**
 * @class Movieworld.store.ChangeLog
 */
Ext.define('Movieworld.store.ChangeLog', {
    extend: 'Ext.data.Store',
    model: 'Movieworld.model.ChangeLog',
    requires: [
        'Ext.data.reader.Xml',
        'Movieworld.model.ChangeLog'
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/ChangeLog.xml',
        reader: {
            type: 'xml',
            rootProperty: 'log',
            record: 'update'
        }
    },
    autoLoad: true
});