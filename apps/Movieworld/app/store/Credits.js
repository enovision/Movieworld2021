Ext.define('Movieworld.store.Credits', {
    extend: 'Ext.data.Store',
    model: 'Movieworld.model.Credits',
    requires: [
        'Ext.data.reader.Xml',
        'Movieworld.model.Credits'
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/Credits.xml',
        reader: {
            type: 'xml',
            rootPropertyProperty: 'credits',
            record: 'credit'
        }
    },
    autoLoad: true
});