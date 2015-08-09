require.config({
  baseUrl: '/js',

  deps: ["main"],

  paths: {
    jquery:           './vendor/jquery/dist/jquery.min',
    // lodash:        '../vendor/lodash/lodash.min',
    underscore:       './vendor/lodash/lodash.min', // TODO
    backbone:         './vendor/backbone/backbone',
    pikaday:          './vendor/pikaday/pikaday',
    moment:           './vendor/moment/min/moment.min',
    jade:             './vendor/jade/runtime',
    accounting:       './vendor/accounting/accounting.min',

    // jquery plugins
    slick:              './vendor/slick.js/slick/slick.min',
    serializeJSON:      './vendor/jquery.serializeJSON/jquery.serializejson',
    flip:               './vendor/flip/dist/jquery.flip.min',
    'jquery.ui.widget': './vendor/blueimp-file-upload-node/js/vendor/jquery.ui.widget',
    fileUpload:         './vendor/blueimp-file-upload-node/js/jquery.fileupload',
    iFrameTransport:    './vendor/blueimp-file-upload-node/js/jquery.iframe-transport',
    nouislider:         './vendor/nouislider/distribute/nouislider.min',
    lightslider:        './vendor/lightslider/dist/js/lightslider.min',

    // bootstrap stuff
    modal: './vendor/bootstrap/js/modal',
    tab: './vendor/bootstrap/js/tab'
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
    serializeJSON: ['jquery'],
    flip: ['jquery'],
    iFrameTransport: ['jquery'],
    'jquery.ui.widget': ['jquery'],
    fileUpload: ['jquery', 'iFrameTransport', 'jquery.ui.widget'],
    pikaday: ['moment']
  }
});
