"use strict";

define(["bootstrap", "view"], function(domainFactory, view) {

  var Router = Backbone.Router.extend({

    routes: {
      "*action": "displaySchedule"
    },
    
    displaySchedule: function(action) {
      var schedule = domainFactory.createSchedule('ppelczar');
      var scheduleView = new view.ScheduleView({
        el: $("#container"),
        model: schedule
      });
      scheduleView.render();
    }

  });

  return {
    Router: Router
  }
});


