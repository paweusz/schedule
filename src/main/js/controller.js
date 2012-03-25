"use strict";

Schedule.WeekdaysController = Ember.ArrayController.extend({

  content: [],
  
  model: undefined,

});

Schedule.WeekdayControler = Ember.Object.create({
  weekday: undefined,
  lessons: undefined
});

