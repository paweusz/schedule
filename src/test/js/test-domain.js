"use strict";

$(document).ready(function(){

  module("Domain");

  var domain = pl.com.paweusz.schedule.domain;
  
  test("Timeslot object", function() {
      var timeslot = new domain.Timeslot(1, 2);
      equal(timeslot.getDuration(), 1, "Duration should be 1");
  });

});

