"use strict";

$(document).ready(function(){

  module("Domain");

  test("Timeslot times", function() {
    var d0 = new Date(0, 0, 0, 8, 50), d1 = new Date(0, 0, 0, 9, 35);
    var timeslot = new Schedule.Timeslot({
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
    var schedule = Schedule.Mock.schedule;
    
    var lMon = schedule.getLessons(Schedule.Mock.mon);
    equal(lMon.length, 2, "There should be 2 lessons on Mon");
    equal(lMon[0].get('subject'), Schedule.Mock.it, "First lesson should be IT");
    equal(lMon[1].get('subject'), Schedule.Mock.math, "Second lesson should be Math");

    var lTue = schedule.getLessons(Schedule.Mock.tue);
    equal(lTue.length, 1, "There should be 1 lesson on Tue");
    equal(lTue[0].get('subject'), Schedule.Mock.math, "First lesson should be Math");
  });
  
  test("Lesson for timeslot", function() {
    var schedule = Schedule.Mock.schedule;
    
    equal(schedule.getLesson(Schedule.Mock.mon, Schedule.Mock.t0), schedule.get('lessons')[2], "First lesson on Mon should be IT");
    equal(schedule.getLesson(Schedule.Mock.mon, Schedule.Mock.t1), schedule.get('lessons')[0], "Second lesson on Mon should be Math");
    equal(schedule.getLesson(Schedule.Mock.tue, Schedule.Mock.t0), schedule.get('lessons')[1], "First lesson on Tue should be Math");
    equal(schedule.getLesson(Schedule.Mock.tue, Schedule.Mock.t1), null, "There is no second lesson on Tue");
  });
  
  test("Signum function", function() {
    equal(Schedule.sgn(-3), -1, "Signum should be negative"); 
    equal(Schedule.sgn(-1), -1, "Signum should be negative"); 
    equal(Schedule.sgn(0), 0, "Signum should be zero"); 
    equal(Schedule.sgn(3), 1, "Signum should be positive"); 
    equal(Schedule.sgn(1), 1, "Signum should be positive"); 
  });
  
  test("Timeslot comparison", function() {
    var t0 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 12, 10),
      end:   new Date(0, 0, 0, 12, 20)
    });
    var t1 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 12, 20),
      end:   new Date(0, 0, 0, 13, 10)
    });
    var t2 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 13, 10),
      end:   new Date(0, 0, 0, 14, 0)
    });
    var t3 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 13, 10),
      end:   new Date(0, 0, 0, 14, 0)
    });
    equal(Schedule.compareTimeslots(t0, t0), 0, "Timeslots should be eqal");
    equal(Schedule.compareTimeslots(t3, t2), 0, "Timeslots should be eqal");
    equal(Schedule.compareTimeslots(t0, t1), -1, "First timeslot should be lesser than second");
    equal(Schedule.compareTimeslots(t1, t0), 1, "First timeslot should be greater than second");
    equal(Schedule.compareTimeslots(t1, t2), -1, "First timeslot should be lesser than second");
    equal(Schedule.compareTimeslots(t2, t1), 1, "First timeslot should be greater than second");
  });

  test("Lesson comparison", function() {
    var t0 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 12, 10),
      end:   new Date(0, 0, 0, 12, 20)
    });
    var t1 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 13, 10),
      end:   new Date(0, 0, 0, 14, 0)
    });
    var day = new Schedule.Weekday({id: "day", name: "Day"});
    var subject = new Schedule.Subject({id: "subject", name: "Subject"});

    var l0 = new Schedule.Lesson({timeslot: t0, weekday: day, subject: subject});
    var l1 = new Schedule.Lesson({timeslot: t1, weekday: day, subject: subject});

    equal(Schedule.compareLessons(l0, l0), 0, "Lessons should be eqal");
    equal(Schedule.compareLessons(l0, l1), -1, "First lesson should be lesser than second");
    equal(Schedule.compareLessons(l1, l0), 1, "First lessons should be greater than second");
  });

  test("Next weekday calculation", function() {
    var mon = new Schedule.Weekday({id: "Mon", name: "Monday"});
    var tue = new Schedule.Weekday({id: "Tue", name: "Tuesday"});
    var weekdays = [mon, tue];

    var t0 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 12, 10),
      end:   new Date(0, 0, 0, 12, 20)
    });
    var t1 = new Schedule.Timeslot({
      start: new Date(0, 0, 0, 12, 20),
      end:   new Date(0, 0, 0, 13, 10)
    });

    var math = new Schedule.Subject({id: "math", name: "Math"});
    var it = new Schedule.Subject({id: "it", name: "Information technology"});

    var lessons = [
      new Schedule.Lesson({timeslot: t1, weekday: mon, subject: math}),
      new Schedule.Lesson({timeslot: t0, weekday: tue, subject: math}),
      new Schedule.Lesson({timeslot: t0, weekday: mon, subject: it})
    ];
    var schedule = new Schedule.Schedule({
      weekdays: weekdays,
      lessons: lessons
    });
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 1, 15, 12)), mon, "Next weekday should be Mon");
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 2, 21, 12)), tue, "Next weekday should be Tue");
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 2, 10, 12)), mon, "Next weekday should be Mon");
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 2, 5, 10)), mon, "Next weekday should be Mon");
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 3, 10, 12)), tue, "Next weekday should be Tue");
    equal(schedule.getNextWeekday(
      new Date(2012, 3, 3, 21, 12)), mon, "Next weekday should be Mon");
  });

});

