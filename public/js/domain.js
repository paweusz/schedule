"use strict";

Schedule.Subject = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null
  }
});

Schedule.Lesson = Backbone.Model.extend({
  defaults: {
    timeslot: null,
    subject: null,
    weekday: null
  }
});

Schedule.Weekday = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null
  },
  hash: function() {
    return this.id;
  }
});

Schedule.Timeslot = Backbone.Model.extend({
  defaults: {
    start: null,
    end: null
  },

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

Schedule.Lessons = Backbone.Collection.extend({
  model: Schedule.Lessons
});

Schedule.Weekdays = Backbone.Collection.extend({
  model: Schedule.Weekday,
});

Schedule.Timeslots = Backbone.Collection.extend({
  model: Schedule.Timeslot
});

Schedule.Subjects = Backbone.Collection.extend({
  model: Schedule.Subject
});

Schedule.hmToDate = function(hour, minute) {
  return new Date(0, 0, 1, hour, minute);
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
  return Schedule.compareTimeslots(l0.get('timeslot'), l1.get('timeslot'));
}

Schedule.Schedule = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    lessons: null,
    weekdays: null,
    timeslots: null,
    subjects: null
  },
  
  getLessons: function(weekday) {
    var lessons = this.get('lessons');
    var lessonsInWeekday = this.get('lessons').filter(
      function(lesson) {
        return lesson.get('weekday') == weekday;
      });
    lessonsInWeekday.sort(Schedule.compareLessons);
    return lessonsInWeekday;
  },
  
  getLesson: function(weekday, timeslot) {
    var lessons = this.get('lessons').filter(
      function(lesson) {
        if (lesson.get('weekday') == weekday && lesson.get('timeslot') == timeslot) { return true; }
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
    var weekdays = this.get('weekdays');
    if (dow >= weekdays.length) {
      weekday = weekdays.first();
    } else {
      var lessons = this.getLessons(weekdays.models[dow]);
      var lastLesson = lessons[lessons.length - 1];
      var lastLessonTs = lastLesson.get('timeslot').get('end');
      if (Schedule.hmToDate(currentTs.getHours(), currentTs.getMinutes()) > lastLessonTs) {
        if (dow + 1 >= weekdays.length) {
          weekday = weekdays.first();
        } else {
          weekday = weekdays.models[dow + 1];
        }
      } else {
        weekday = weekdays.models[dow];
      }
    }
    return weekday;
  }
    
});


