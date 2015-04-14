require.config({
  baseUrl: '/js',

  deps: ["main"],

  paths: {
    jquery: './vendor/jquery/dist/jquery.min',
    // lodash: '../vendor/lodash/lodash.min',
    underscore: './vendor/lodash/lodash.min', // TODO
    backbone: './vendor/backbone/backbone',

    // jquery plugins
    slick: './vendor/slick.js/slick/slick.min'
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
    }
  }
});
