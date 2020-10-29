Ext.define('Movieworld.model.Content', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'id_tmdb',
        'type',
        'name',
        'title',
        'release',
        'job',
        'character',
        'department',
        'released',
        'thumbnail' /*,
         {
         name: 'role_icon',
         convert: Toolbox.ConvertIcon
         } */
    ]
});
