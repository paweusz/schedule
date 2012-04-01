"use strict";

Schedule.ScheduleView = Ember.View.extend({
  templateName: 'schedule',
  nameBinding: 'Schedule.scheduleController.name',
  weekdaysBinding: 'Schedule.scheduleController.weekdays',
  timeslotsBinding: 'Schedule.scheduleController.timeslots'
});

Schedule.TimeslotView = Ember.View.extend({
  templateName: 'timeslot',
  weekdaysBinding: 'Schedule.scheduleController.weekdays',
  timeslot: null,
  formatMinute: function(minute) {
    return $.formatNumber(minute, {format:"00", locale:"us"});
  },
  start: function() {
    return this.get('timeslot').getStartHour() + ":" 
      + this.formatMinute(this.get('timeslot').getStartMinute());
  }.property(),
  end: function() {
    return this.get('timeslot').getEndHour() + ":" 
      + this.formatMinute(this.get('timeslot').getEndMinute());
  }.property()
});

Schedule.LessonView = Ember.View.extend({
  templateName: 'lesson',
  weekday: null,
  lesson: undefined,
  
  getLesson: function() {
    if (this.lesson == undefined) {
      var timeslot = this.get("parentView").get("timeslot");
      this.lesson = Schedule.scheduleController.getLesson(this.get('weekday'), timeslot);
    }
    return this.lesson;
  },
  
  lessonName: function() {
    var lesson = this.getLesson();
    return lesson != null ? lesson.subject.name : "";
  }.property(),
  
  nextWeekdayCell: function() {
    return Schedule.scheduleController.isNextWeekday(this.get('weekday'));
  }.property()
  
});

Schedule.WeekdayView = Ember.View.extend({
  weekday: null,

  nextWeekday: function() {
    return Schedule.scheduleController.isNextWeekday(this.get('weekday'));
  }.property()
  
});
