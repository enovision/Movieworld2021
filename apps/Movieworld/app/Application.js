Ext.define('Movieworld.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Movieworld.view.Viewport'
    ],
    
    name: 'Movieworld',

    controllers: [
        'movieworld'
    ],

    stores: [
        'Backdrop',
        'BackdropTV',
        'Boxoffice',
        'BoxofficeTV',
        'ChangeLog',
        'Content',
        'Credits',
        'Detail',
        'Movie',
        'MoviesPopular',
        'Person',
        'PersonsPopular',
        'Popular',
        'PopularTV',
        'Poster',
        'PosterTV',
        'Profile',
        'ReleaseInfo',
        'Search',
        'Trailer',
        'Translations',
        'Tv',
        'TvSeason',
        'WorkMovies',
        'WorkPersons'
    ],

    launch: function () {
        setTimeout(function () {
          Ext.get('loading').fadeOut({
             remove: true
          });
       }, 250);

       Ext.create('Movieworld.view.Viewport');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
