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

domain.Timeslot.prototype.getDuration = function() {
  return this.end - this.start;
}

domain.Schedule = function(name) {
  this.name = name;
  this.lessons = [];
}


