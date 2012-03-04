$(document).ready(function(){

  module("Domain");

  test("Timeslot object", function() {
    var timeslot = new pl.com.paweusz.schedule.domain.Timeslot(1, 2);
    equal(timeslot.getDuration(), 1, "Duration should be 1");
  });

});

