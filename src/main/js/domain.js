"use strict";

var pl = pl || {};
pl.com = pl.com || {};
pl.com.paweusz = pl.com.paweusz || {};
pl.com.paweusz.schedule = pl.com.paweusz.schedule || {};
pl.com.paweusz.schedule.domain = pl.com.paweusz.schedule.domain || {};
var domain = pl.com.paweusz.schedule.domain;

domain.Subject = function(name) {
  this.name = name;
};

domain.Lesson = function(timeslot, subject, weekday) {
  this.timeslot = timeslot;
  this.subject = subject;
  this.weekday = weekday;
}

domain.Weekday = function(name) {
  this.name = name;
}

domain.Timeslot = function(start, end) {
  this.start = start;
  this.end = end;
}

domain.Timeslot.prototype = {
  
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
  
}

domain.hmToDate = function(hour, minute) {
  return new Date(0, 0, 0, hour, minute);
}

domain.Schedule = function(name) {
  this.name = name;
  this.lessons = [];
}


