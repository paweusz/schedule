var pl = pl || {};
pl.com = pl.com || {};
pl.com.paweusz = pl.com.paweusz || {};
pl.com.paweusz.schedule = pl.com.paweusz.schedule || {};
pl.com.paweusz.schedule.domain = pl.com.paweusz.schedule.domain || {};

(function () {

  this.Subject = function(name) {
    this.name = name;
  };

  this.Lesson = function(timeslot, subject, weekday) {
    this.timeslot = timeslot;
    this.subject = subject;
    this.weekday = weekday;
  }

  this.Weekday = function(name) {
    this.name = name;
  }

  this.Timeslot = function(start, end) {
    this.start = start;
    this.end = end;
  }
  
  this.Timeslot.prototype.getDuration = function() {
    return this.end - this.start;
  }

  this.Schedule = function(name) {
    this.name = name;
    this.lessons = [];
  }

}).apply(pl.com.paweusz.schedule.domain);

