require.config({

  deps: ["main"],

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery.min',
    // lodash: '../../bower_components/lodash/lodash.min',
    underscore: '../../bower_components/lodash/lodash.min', // TODO
    backbone: '../../bower_components/backbone/backbone',

    // jquery plugins
    slick: '../../bower_components/slick.js/slick/slick.min'
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
