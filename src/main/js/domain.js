"use strict";

Schedule.Subject = Backbone.Model.extend({
  id: undefined,
  name: undefined
});

Schedule.Lesson = Backbone.Model.extend({
  timeslot: undefined,
  subject: undefined,
  weekday: undefined
});

Schedule.Weekday = Backbone.Model.extend({
  id: undefined,
  name: undefined,
  hash: function() {
    return this.id;
  }
});

Schedule.Timeslot = Backbone.Model.extend({
  start: null,
  end: null,

  getStartHour: function() {
    return this.get('start').getHours();
  },
  
  getStartMinute: function() {
    return this.get('start').getMinutes();
  },
  
  getEndHour: function() {
    return this.get('end').getHours();
  },
  
  getEndMinute: function() {
    return this.get('end').getMinutes();
  },
  
  hash: function() {
    return this.getStartHour() + "_" + this.getStartMinute();
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

Schedule.Schedule = Backbone.Model.extend({
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
  
  getLesson: function(weekday, timeslot) {
    var lessons = this.lessons.filter(function(lesson, index, self) {
      if (lesson.weekday == weekday && lesson.timeslot == timeslot) { return true; }
    });
    return lessons.length > 0 ? lessons[0] : null;
  },
  
  getNextWeekday: function(currentTs) {
    var dow = currentTs.getDay();
    if (dow == 0) {
      dow = 7; //Fix for Sunday being first day in US calendar
    }
    dow--;
    var weekday = null;
    var weekdays = this.getWeekdays();
    if (dow > weekdays.length) {
      weekday = weekdays[0];
    } else {
      var lessons = this.getLessons(weekdays[dow]);
      var lastLesson = lessons[lessons.length - 1];
      var lastLessonTs = lastLesson.getTimeslot().getEnd();
      if (Schedule.hmToDate(currentTs.getHours(), currentTs.getMinutes()) > lastLessonTs) {
        if (dow + 1 >= weekdays.length) {
          weekday = weekdays[0];
        } else {
          weekday = weekdays[dow + 1];
        }
      } else {
        weekday = weekdays[dow];
      }
    }
    return weekday;
  }
    
});


