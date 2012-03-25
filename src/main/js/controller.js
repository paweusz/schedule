"use strict";

Schedule.ScheduleController = Ember.Object.extend({
  weekdays: undefined,
  schedule: undefined,
  name: undefined,
  
  init: function() {
    var model = Schedule.Model.create();
    this.schedule = model.loadSchedule("test");
    this.weekdays = this.schedule.getWeekdays();
    this.name = this.schedule.getName();
  }
});

Schedule.WeekdaysController = Ember.ArrayController.extend({

  content: [],
  
  model: undefined,

});

Schedule.WeekdayControler = Ember.Object.create({
  weekday: undefined,
  lessons: undefined
});

