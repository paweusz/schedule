"use strict";

var Schedule = Ember.Application.create();
window.Schedule = Schedule;

$(document).ready(function(){
  var model = Schedule.Model.create();
  Schedule.mainModel = model;
  
  var schedule = model.loadSchedule("test");
  
  var weekday = model.getWeekdays().Mon;
//  var view = Schedule.WeekdayView.create({
//    weekday: weekday,
//    lessons: schedule.getLessons(weekday)
//  });
  
  var view = Schedule.ScheduleView.create({
    weekdays: schedule.weekdays
  });

  view.appendTo('#container');
  
});
