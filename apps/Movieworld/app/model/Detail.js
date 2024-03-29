Ext.define('Movieworld.model.Detail', {
   extend: 'Ext.data.Model',

    requires: [
        'Movieworld.singleton.Toolbox'
    ],

    fields: [
      'score',
      'popularity',
      'known_as', // array(name, name.. name)
      'name',
      'id',
      'id_tmdb',
      'biography',
      'known_movies',
      'birthday',
      'birthplace',
      'url',
      'filmography', // array (name, id, job, department, character, cast_id, url, poster, adult, release)
      'profile',	// array (image(type, size, height, width, url, id) .. image(..))
      'version',
      {
         name: 'thumbnail',
         convert: Toolbox.ConvertImage
      },
      'last_modified_at'
   ],

   associations: [
      {type: 'hasMany', model: 'filmography', name: 'filmography'},
      {type: 'hasMany', model: 'poster', name: 'profile'}
   ]
});


