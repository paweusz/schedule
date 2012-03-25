"use strict";

Schedule.WeekdayView = Ember.View.extend({
  templateName: 'weekday',
  weekday: undefined,
  lessons: undefined
});

Schedule.ScheduleView = Ember.View.extend({
  templateName: 'schedule',
  name: "Pimpa",
  weekdays: undefined
});
