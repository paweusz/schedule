"use strict";

Schedule.Router = Backbone.Router.extend({

  routes: {
    "*action": "displaySchedule"
  },
  
  displaySchedule: function(action) {
    var schedule = Schedule.scheduleFactory.createSchedule('ppelczar');
    var scheduleView = new Schedule.ScheduleView({
      el: $("#container"),
      model: schedule
    });
    scheduleView.render();
  }

});

