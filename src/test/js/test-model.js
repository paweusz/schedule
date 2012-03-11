"use strict";

$(document).ready(function(){

  module("Model");

  test("Schedule loading", function() {
    var model = Schedule.Model.create();
    var schedule = model.loadSchedule("test");
    ok(schedule.lessons.length != 0, "Lessons should be loaded");
  });

});

