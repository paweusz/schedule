"use strict";

var Schedule = Ember.Application.create();
window.Schedule = Schedule;

$(document).ready(function(){
  var model = Schedule.Model.create();
  Schedule.mainModel = model;
  
  model.loadSchedule("test");
  
  var weekday = model.getWeekdays().Thu;
  var view = Schedule.WeekdayView.create({
    weekday: weekday
  });
  view.appendTo('#container');
  
});
