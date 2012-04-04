"use strict";

$(document).ready(function(){

  module("Controller");

  test("Timeslot data preparation", function() {
    var ctrl = Schedule.ScheduleController.create({
      schedule: Schedule.Mock.schedule,
    });
    ctrl.createLessonsMatrix();
    var matrix = ctrl.lessonsMatrix;

    equal(matrix[0][0].subject, Schedule.Mock.it, "In ts0 on Mon there should be IT");
    equal(matrix[0][1].subject, Schedule.Mock.math, "In ts0 on Tue there should be math");

    equal(matrix[1][0].subject, Schedule.Mock.math, "In ts1 on Mon there should be math");
    equal(matrix[1][1], null, "In ts1 on Tue there should be null");
  });

});
