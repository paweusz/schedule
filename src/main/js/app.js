"use strict";

var Schedule = Ember.Application.create();
window.Schedule = Schedule;

$(document).ready(function(){
  
//  var weekday = model.getWeekdays().Mon;
//  var view = Schedule.WeekdayView.create({
//    weekday: weekday,
//    lessons: schedule.getLessons(weekday)
//  });
  
  Schedule.scheduleController = Schedule.ScheduleController.create();
  Schedule.scheduleController.init();
  
  var view = Schedule.ScheduleView.create();

  view.appendTo('#container');
  
});
