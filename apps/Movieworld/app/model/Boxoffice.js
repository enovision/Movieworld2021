Ext.define('Movieworld.model.Boxoffice', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'id_tmdb',
        'name',
        'thumb',
        'type',
        'vote_average',
        'release_date'
    ]
});