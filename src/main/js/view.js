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
