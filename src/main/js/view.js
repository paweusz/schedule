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
  start: function() {
    return this.get('timeslot').getStartHour() + ":" + this.get('timeslot').getStartMinute();
  }.property('timeslot'),
  end: function() {
    return this.get('timeslot').getEndHour() + ":" + this.get('timeslot').getEndMinute();
  }.property('timeslot')
});

Schedule.LessonView = Ember.View.extend({
  templateName: 'lesson',
  weekday: null,
  lesson: function() {
    var timeslot = this.get("parentView").get("timeslot");
    var lesson = Schedule.scheduleController.getLesson(this.get('weekday'), timeslot);
    return lesson != null ? lesson.subject.name : "-";
  }.property()
});
