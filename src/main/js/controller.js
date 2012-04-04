"use strict";

Schedule.ScheduleController = Ember.Object.extend({
  weekdays: null,
  timeslots: null,
  schedule: null,
  name: null,
  lessonsMatrix: null,
  nextWeekday: null,
  timeslot2idx: null,
  weekday2idx: null,
  
  loadModel: function() {
    var model = Schedule.Model.create();
    this.schedule = model.loadSchedule("test");
    this.weekdays = this.schedule.getWeekdays();
    this.timeslots = this.schedule.getTimeslots();
    this.name = this.schedule.getName();

    this.createLessonsMatrix();
  },
  
  createLessonsMatrix: function() {
    var allTimeslots = this.schedule.getTimeslots();
    var timeslot2idx = {};
    allTimeslots.forEach(function(timeslot, index) {
      timeslot2idx[timeslot.hash()] = index;
    });
    this.timeslot2idx = timeslot2idx;
    
    var allWeekdays = this.schedule.getWeekdays();
    var weekday2idx = {};
    allWeekdays.forEach(function(weekday, index) {
      weekday2idx[weekday.hash()] = index;
    });
    this.weekday2idx = weekday2idx;
    
    var matrix = new Array(allTimeslots.length);
    
    allTimeslots.forEach(function(timeslot, idx) {
      var weekdaysArray = new Array(allWeekdays.length);
      allWeekdays.forEach(function(weekday, idx) {
        weekdaysArray[idx] = null;
      });
      matrix[idx] = weekdaysArray;
    });
    
    var allLessons = this.schedule.getAllLessons();
    allLessons.forEach(function(lesson) {
      var tsIdx = timeslot2idx[lesson.getTimeslot().hash()];
      var wdIdx = weekday2idx[lesson.getWeekday().hash()];
      matrix[tsIdx][wdIdx] = lesson;
    });
    
    this.lessonsMatrix = matrix;

  },
  
  getLesson: function(weekday, timeslot) {
    var tsIdx = this.timeslot2idx[timeslot.hash()];
    var wdIdx = this.weekday2idx[weekday.hash()];
    return this.lessonsMatrix[tsIdx][wdIdx];
  },
  
  isNextWeekday: function(weekday) {
    if (this.nextWeekday == null) {
      this.nextWeekday = this.schedule.getNextWeekday(new Date());
    }
    return this.nextWeekday == weekday;
  }

});


