"use strict";

require.config({
  paths: {
    jQuery: 'http://code.jquery.com/jquery-latest',
    Underscore: 'http://documentcloud.github.com/underscore/underscore',
    Backbone: 'http://documentcloud.github.com/backbone/backbone',
  }
});


$(document).ready(function(){

  require(["router"], function(router) {
    new router.Router();
    Backbone.history.start();
  });
  
});

