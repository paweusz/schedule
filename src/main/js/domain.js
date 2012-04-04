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
  },
  getWeekday: function() {
    return this.weekday;
  }
});

Schedule.Weekday = Ember.Object.extend({
  id: undefined,
  name: undefined,
  hash: function() {
    return this.id;
  }
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
  },
  
  getEnd: function() {
    return this.end;
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

Schedule.Schedule = Ember.Object.extend({
  id: undefined,
  name: undefined,
  lessons: [],
  weekdays: [],
  timeslots: [],
  
  getAllLessons: function() {
    return this.lessons;
  },
  
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
  
  getWeekdays: function() {
    return this.weekdays;
  },
  
  getTimeslots: function() {
    return this.timeslots;
  },
  
  getName: function() {
    return this.name;
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


