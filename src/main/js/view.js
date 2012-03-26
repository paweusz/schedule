"use strict";

Schedule.WeekdayView = Ember.View.extend({
  templateName: 'weekday',
  weekday: null,
  lessons: null,
  timeslotsBinding: 'Schedule.scheduleController.timeslots'
});

Schedule.ScheduleView = Ember.View.extend({
  templateName: 'schedule',
  nameBinding: 'Schedule.scheduleController.name',
  weekdaysBinding: 'Schedule.scheduleController.weekdays'
});

Schedule.TimeslotView = Ember.View.extend({
  templateName: 'timeslot',
  timeslot: null,
  lesson: function() {
    var hackyWeekday = this.get("parentView").get("weekday");
    var lesson = Schedule.scheduleController.getLesson(hackyWeekday, this.get('timeslot'));
    return lesson != null ? lesson.subject.name : "-";
  }.property('timeslot'),
  start: function() {
    return this.get('timeslot').getStartHour() + ":" + this.get('timeslot').getStartMinute();
  }.property('timeslot'),
  end: function() {
    return this.get('timeslot').getEndHour() + ":" + this.get('timeslot').getEndMinute();
  }.property('timeslot')
});
