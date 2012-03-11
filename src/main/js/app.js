"use strict";

var Schedule = Ember.Application.create();
window.Schedule = Schedule;

$(document).ready(function(){
  var model = Schedule.Model.create();
  model.loadSchedule("test");
});
