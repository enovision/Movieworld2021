Ext.require([
   'Ext.data.reader.Xml',
   'Ext.data.proxy.JsonP'
]);

Ext.ariaWarn = Ext.emptyFn;

Ext.application({
    name: 'Movieworld',
    extend: 'Movieworld.Application',
    autoCreateViewport: false
});
