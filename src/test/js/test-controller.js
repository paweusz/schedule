"use strict";

$(document).ready(function(){

  module("Controller");

  test("Timeslot data preparation", function() {
    var ctrl = Schedule.ScheduleController.create({
      schedule: Schedule.Mock.schedule,
    });
    var tswl = ctrl.createTimeslotsWithLessons();
    equal(tswl.length, 2, "There should be 2 timeslots with lessons");

    equal(tswl[0].timeslot, Schedule.Mock.t0, "First timeslot should be t0");
    equal(tswl[1].timeslot, Schedule.Mock.t1, "Second timeslot should be t1");

    equal(tswl[0].lessons[0].subject, Schedule.Mock.it, "In ts0 on Mon there should be IT");
    equal(tswl[0].lessons[1].subject, Schedule.Mock.math, "In ts0 on Tue there should be math");

    equal(tswl[1].lessons[0].subject, Schedule.Mock.math, "In ts1 on Mon there should be math");
    equal(tswl[1].lessons[1], null, "In ts1 on Tue there should be null");
  });

});
