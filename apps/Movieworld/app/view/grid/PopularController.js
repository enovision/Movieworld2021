/**
 * Created by jvandemerwe on 02.12.16.
 */
Ext.define('Movieworld.view.grid.PopularController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PopularController',

    requires: [
        'Movieworld.singleton.Toolbox'
    ],

    control: {
        '#': {
            resize: 'onResize'
        }
    },

    init: function() {
        this.callParent();
    },

    onResize: function(view) {
        Toolbox.BrowserResize('.results.item');
    }
});