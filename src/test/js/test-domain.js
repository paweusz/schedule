"use strict";

$(document).ready(function(){

  module("Domain");

  var domain = pl.com.paweusz.schedule.domain;
  
  test("Timeslot times", function() {
    var d0 = new Date(0, 0, 0, 8, 50), d1 = new Date(0, 0, 0, 9, 35);
    var timeslot = new domain.Timeslot(d0, d1);
    equal(timeslot.getStartHour(), 8, "Start hour should be 8");
    equal(timeslot.getStartMinute(), 50, "Start minute should be 50");
    equal(timeslot.getEndHour(), 9, "End hour should be 9");
    equal(timeslot.getEndMinute(), 35, "End hour should be 35");
  });

  test("Hour and minute to date conversion", function() {
    equal(domain.hmToDate(22, 59).getHours(), 22, "Hour should be 22");
    equal(domain.hmToDate(22, 59).getMinutes(), 59, "Minute should be 59");
  });

});

