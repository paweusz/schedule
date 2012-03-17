"use strict";

Schedule.WeekdayView = Ember.View.extend({
  templateName: 'weekday',
  weekdayNameBinding: 'this.weekday.name'
});
