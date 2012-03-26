"use strict";

Schedule.scheduleController = Ember.Object.create({
  weekdays: null,
  schedule: null,
  name: null,
  timeslots: null,
  
  init: function() {
    var model = Schedule.Model.create();
    this.schedule = model.loadSchedule("test");
    this.weekdays = this.schedule.getWeekdays();
    this.name = this.schedule.getName();
    this.timeslots = this.schedule.getTimeslots();
  },
  
  getLesson: function(weekday, timeslot) {
    return this.schedule.getLesson(weekday, timeslot);
  }

});


