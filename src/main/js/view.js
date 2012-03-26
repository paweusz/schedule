"use strict";

Schedule.WeekdayView = Ember.View.extend({
  templateName: 'weekday',
  weekday: undefined,
  lessons: undefined,
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
  start: function() {
    return this.get('timeslot').getStartHour() + ":" + this.get('timeslot').getStartMinute();
  }.property('timeslot'),
  end: function() {
    return this.get('timeslot').getEndHour() + ":" + this.get('timeslot').getEndMinute();
  }.property('timeslot')
});
