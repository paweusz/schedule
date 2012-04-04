"use strict";

Schedule.TimeslotWithLessons = Ember.Object.extend({
  timeslot: null,
  lessons: null
});

Schedule.ScheduleController = Ember.Object.extend({
  weekdays: null,
  schedule: null,
  name: null,
  timeslotsWithLessons: null,
  nextWeekday: null,
  
  loadModel: function() {
    var model = Schedule.Model.create();
    this.schedule = model.loadSchedule("test");
    this.weekdays = this.schedule.getWeekdays();
    this.name = this.schedule.getName();

    this.timeslotsWithLessons = this.createTimeslotsWithLessons();
  },
  
  createTimeslotsWithLessons: function() {
    var allTimeslots = this.schedule.getTimeslots();
    var timeslot2idx = {};
    allTimeslots.forEach(function(timeslot, index) {
      timeslot2idx[timeslot.hash()] = index;
    });
    
    var allWeekdays = this.schedule.getWeekdays();
    var weekday2idx = {};
    allWeekdays.forEach(function(weekday, index) {
      weekday2idx[weekday.hash()] = index;
    });
    
    var tswls = allTimeslots.map(function(timeslot) {
      var lessons = new Array(allWeekdays.length);
      for (var i = 0; i < allWeekdays.length; i++) {
        lessons[i] = null;
      }
      var tswl = Schedule.TimeslotWithLessons.create({
        timeslot: timeslot,
        lessons: lessons
      });
      return tswl;
    });  
    
    var allLessons = this.schedule.getAllLessons();
    allLessons.forEach(function(lesson) {
      var tsIdx = timeslot2idx[lesson.getTimeslot().hash()];
      var wdIdx = weekday2idx[lesson.getWeekday().hash()];
      tswls[tsIdx].lessons[wdIdx] = lesson;
    });

    return tswls;
  },
  
  getLesson: function(weekday, timeslot) {
    return this.schedule.getLesson(weekday, timeslot);
  },
  
  isNextWeekday: function(weekday) {
    if (this.nextWeekday == null) {
      this.nextWeekday = this.schedule.getNextWeekday(new Date());
    }
    return this.nextWeekday == weekday;
  }

});

Schedule.scheduleController = Schedule.ScheduleController.create();
Schedule.scheduleController.loadModel();

