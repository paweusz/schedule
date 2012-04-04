"use strict";

Schedule.Mock = {

  mon: Schedule.Weekday.create({id: "Mon", name: "Monday"}),
  tue: Schedule.Weekday.create({id: "Tue", name: "Tuesday"}),
  
  t0: Schedule.Timeslot.create({start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)}),
  t1: Schedule.Timeslot.create({start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)}),

  math: Schedule.Subject.create({id: "math", name: "Math"}),
  it: Schedule.Subject.create({id: "it", name: "Information technology"}),

};

Schedule.Mock.schedule = Schedule.Schedule.create({
  lessons: [
    Schedule.Lesson.create(
      {timeslot: Schedule.Mock.t1, weekday: Schedule.Mock.mon, subject: Schedule.Mock.math}),
    Schedule.Lesson.create(
      {timeslot: Schedule.Mock.t0, weekday: Schedule.Mock.tue, subject: Schedule.Mock.math}),
    Schedule.Lesson.create(
      {timeslot: Schedule.Mock.t0, weekday: Schedule.Mock.mon, subject: Schedule.Mock.it})
  ],
  weekdays: [Schedule.Mock.mon, Schedule.Mock.tue],
  timeslots: [Schedule.Mock.t0, Schedule.Mock.t1],
});
  

