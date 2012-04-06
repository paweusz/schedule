"use strict";

var Schedule = {};

$(document).ready(function(){

  Schedule.app = {
    initialize: function() {
      this.schedule = Schedule.scheduleFactory.createSchedule('ppelczar');
      this.scheduleView = new Schedule.ScheduleView({
        el: $("#container"),
        model: this.schedule
      });
      this.scheduleView.render();
    }
  };

  Schedule.app.initialize();
});
