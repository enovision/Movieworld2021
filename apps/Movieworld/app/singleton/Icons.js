Ext.define('Movieworld.singleton.Icons', {
    singleton: true,
    alternateClassName: ['IconCls'],

    constructor: function (config) {
        this.initConfig(config);
    },

    config: {
        // Icons that have been addressed directly
        search: 'fa fa-search',
        calendar: 'fa fa-calendar',
        camera: 'fa fa-video-camera',
        overview: 'icon-id-card',
        cinema: 'mw-projector',
        seasons: 'fa fa-leaf',
        bio: 'icon-id-card',
        id_card: 'fa fa-vcard-o',
        translation: 'fa fa-language',
        vimeo: 'mw-vimeo',
        youtube: 'mw-youtube',
        quicktime: 'fa fa-quicktime',
        apple: 'icon-apple',
        tv: 'mw-tv',
        movie: 'fa fa-film',
        film: 'fa fa-film',
        asterix: 'fa fa-asterisk',
        born: 'mw-born',
        died: 'mw-died',
        work_in_progress: 'mw-men-at-work',
        men_at_work: 'mw-men-at-work',
        star: 'fa fa-star',
        star_o: 'fa fa-star-o',
        link: 'fa fa-link',
        unlink: 'fa fa-unlink',
        leaf: 'fa fa-leaf',
        software: 'fa fa-cubes',
        website: 'mw-web',
        legal: 'fa fa-legal',
        download: 'fa fa-download',
        hide_up: 'fa fa-chevron-up',
        hide_down: 'fa fa-chevron-down',
        log: 'fa fa-bars',
        dashboard: 'fa fa-dashboard',
        cc: 'fa fa-cc', // Closed Captions (subtitles)
        history: 'fa fa-history',
        eye: 'fa fa-eye',
        feedback: 'icon-quote',
        credits: 'icon-trophy',
        close: 'fa fa-close',
        undo: 'fa fa-undo', // reset search
        sort_asc: 'fa fa-sort-alpha-asc',
        sort_desc: 'fa fa-sort-alpha-desc',
        money: 'fa fa-money',
        couch: 'fa fa-weekend',
        user: 'mw-user',
        users: 'mw-users',
        thumbsUp: 'icon-thumbs-up',
        binoculars: 'fa fa-binoculars',
        save: 'fa fa-save', // 'xf00c',
        frontrow: 'mw-sofa',
        ticket: 'fa fa-ticket',
        home: 'fa fa-home',
        media: 'fa fa-picture-o',
        image: 'fa fa-picture-o',
        gallery: 'fa fa-picture-o',
        width: 'fa fa-arrows-h',  // horizontal
        height: 'fa fa-arrows-v', // vertical
        login: 'fa fa-login',
        logout: 'fa fa-logout',
        'delete': 'fa fa-delete'
    }
});
