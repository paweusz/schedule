"use strict";

Schedule.WeekdayView = Ember.View.extend({
  templateName: 'weekday',
  weekdayNameBinding: Ember.Binding.oneWay('this.weekday.name')
});
