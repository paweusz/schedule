"use strict";

var Schedule = Ember.Application.create();
window.Schedule = Schedule;


$(document).ready(function(){
  
  Schedule.scheduleView = Schedule.ScheduleView.create();
  Schedule.scheduleView.appendTo('#container');
  
});
