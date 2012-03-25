"use strict";

$(document).ready(function(){

  module("Domain");

  test("Timeslot times", function() {
    var d0 = new Date(0, 0, 0, 8, 50), d1 = new Date(0, 0, 0, 9, 35);
    var timeslot = Schedule.Timeslot.create({
      start: d0, end: d1
    });
    equal(timeslot.getStartHour(), 8, "Start hour should be 8");
    equal(timeslot.getStartMinute(), 50, "Start minute should be 50");
    equal(timeslot.getEndHour(), 9, "End hour should be 9");
    equal(timeslot.getEndMinute(), 35, "End hour should be 35");
  });

  test("Hour and minute to date conversion", function() {
    equal(Schedule.hmToDate(22, 59).getHours(), 22, "Hour should be 22");
    equal(Schedule.hmToDate(22, 59).getMinutes(), 59, "Minute should be 59");
  });
  
  test("Lessons for weekday", function() {
    var mon = Schedule.Weekday.create({id: "Mon", name: "Monday"});
    var tue = Schedule.Weekday.create({id: "Tue", name: "Tuesday"});
    
    var t0 = Schedule.Timeslot.create({start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)});
    var t1 = Schedule.Timeslot.create({start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)});

    var math = Schedule.Subject.create({id: "math", name: "Math"});
    var it = Schedule.Subject.create({id: "it", name: "Information technology"});

    var schedule = Schedule.Schedule.create();
    schedule.lessons = [
      Schedule.Lesson.create({timeslot: t1, weekday: mon, subject: math}),
      Schedule.Lesson.create({timeslot: t0, weekday: tue, subject: math}),
      Schedule.Lesson.create({timeslot: t1, weekday: mon, subject: it})
    ];
    
    var lMon = schedule.getLessons(mon);
    equal(lMon.length, 2, "There should be 2 lessons on Mon");
    
  });

});

