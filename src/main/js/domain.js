"use strict";

Schedule.Subject = Ember.Object.extend({
  id: undefined,
  name: undefined
});

Schedule.Lesson = Ember.Object.extend({
  timeslot: undefined,
  subject: undefined,
  weekday: undefined
});

Schedule.Weekday = Ember.Object.extend({
  id: undefined,
  name: undefined
});

Schedule.Timeslot = Ember.Object.extend({
  start: undefined,
  end: undefined,

  getStartHour: function() {
    return this.start.getHours();
  },
  
  getStartMinute: function() {
    return this.start.getMinutes();
  },
  
  getEndHour: function() {
    return this.end.getHours();
  },
  
  getEndMinute: function() {
    return this.end.getMinutes();
  }
  
});

Schedule.hmToDate = function(hour, minute) {
  return new Date(0, 0, 0, hour, minute);
}

Schedule.Schedule = Ember.Object.extend({
  name: undefined,
  lessons: []
});


