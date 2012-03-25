"use strict";

Schedule.Subject = Ember.Object.extend({
  id: undefined,
  name: undefined
});

Schedule.Lesson = Ember.Object.extend({
  timeslot: undefined,
  subject: undefined,
  weekday: undefined,
  getTimeslot: function() {
    return this.timeslot;
  }
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

Schedule.sgn = function(value) {
  return value > 0 ? 1 : value < 0 ? -1 : 0;
}

Schedule.compareTimeslots = function(t0, t1) {
  var result = Schedule.sgn(t0.getStartHour() - t1.getStartHour());
  if (result == 0) {
    result = Schedule.sgn(t0.getStartMinute() - t1.getStartMinute());
  }
  return result;
}

Schedule.compareLessons = function(l0, l1) {
  return Schedule.compareTimeslots(l0.getTimeslot(), l1.getTimeslot());
}

Schedule.Schedule = Ember.Object.extend({
  id: undefined,
  name: undefined,
  lessons: [],
  weekdays: [],
  timeslots: [],
  getLessons: function(weekday) {
    var lessonsInWeekday = this.lessons.filterProperty('weekday', weekday);
    lessonsInWeekday.sort(Schedule.compareLessons);
    return lessonsInWeekday;
  },
  getWeekdays: function() {
    return this.weekdays;
  },
  getTimeslots: function() {
    return this.timeslots;
  },
  getName: function() {
    return this.name;
  }
});


