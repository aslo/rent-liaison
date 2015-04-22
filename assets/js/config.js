require.config({
  baseUrl: '/js',

  deps: ["main"],

  paths: {
    jquery: './vendor/jquery/dist/jquery.min',
    // lodash: '../vendor/lodash/lodash.min',
    underscore: './vendor/lodash/lodash.min', // TODO
    backbone: './vendor/backbone/backbone',
    pikaday: './vendor/pikaday/pikaday',

    // jquery plugins
    slick: './vendor/slick.js/slick/slick.min',
    serializeJSON: './vendor/jquery.serializeJSON/jquery.serializejson'
  },

  // map: {
  //   'backbone': {
  //     underscore: 'lodash'
  //   }
  // },

  shim: {
    lodash: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    serializeJSON: ['jquery']
  }
});
