$(document).ready(function(){

  module("Domain");

  test("Timeslot object", function() {
    with (pl.com.paweusz.schedule.domain) {
      var timeslot = new Timeslot(1, 2);
      equal(timeslot.getDuration(), 1, "Duration should be 1");
    }
  });

});

