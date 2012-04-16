"use strict";

Schedule.Mock = {

  mon: new Schedule.Weekday({id: "Mon", name: "Monday"}),
  tue: new Schedule.Weekday({id: "Tue", name: "Tuesday"}),
  
  t0: new Schedule.Timeslot({id: 0, start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)}),
  t1: new Schedule.Timeslot({id: 1, start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)}),

  math: new Schedule.Subject({id: "math", name: "Math"}),
  it: new Schedule.Subject({id: "it", name: "Information technology"}),

};

Schedule.Mock.schedule = new Schedule.Schedule({
  lessons: new Schedule.Lessons([
    new Schedule.Lesson(
      {id: 1, timeslot: Schedule.Mock.t1, weekday: Schedule.Mock.mon, subject: Schedule.Mock.math}),
    new Schedule.Lesson(
      {id: 2, timeslot: Schedule.Mock.t0, weekday: Schedule.Mock.tue, subject: Schedule.Mock.math}),
    new Schedule.Lesson(
      {id: 3, timeslot: Schedule.Mock.t0, weekday: Schedule.Mock.mon, subject: Schedule.Mock.it})
  ]),
  weekdays: new Schedule.Weekdays([Schedule.Mock.mon, Schedule.Mock.tue]),
  timeslots: new Schedule.Timeslots([Schedule.Mock.t0, Schedule.Mock.t1]),
});
  

