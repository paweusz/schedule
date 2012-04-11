"use strict";

$(document).ready(function(){

  module("Domain factory");

  test("Timeslots factory", function() {
    var timeslots = Schedule.timeslotsFactory.createTimeslots();
    ok(timeslots.length > 0, "Timeslots should be created");
    ok(timeslots.get(1) instanceof Schedule.Timeslot, "Collection should contain timeslots");
  });

  test("Weekdays factory", function() {
    var weekdays = Schedule.weekdaysFactory.createWeekdays();
    ok(weekdays.length > 0, "Weekdays should be created");
    ok(weekdays.get("Mon") instanceof Schedule.Weekday, "Collection should contain weekdays");
  });

  test("Subjects factory", function() {
    var subjects = Schedule.subjectsFactory.createSubjects();
    ok(subjects.length > 0, "Subjects should be created");
    ok(subjects.get("ang") instanceof Schedule.Subject, "Collection should contain subjects");
  });

  test("Lessons factory", function() {
    var weekdays = Schedule.weekdaysFactory.createWeekdays();
    var subjects = Schedule.subjectsFactory.createSubjects();
    var timeslots = Schedule.timeslotsFactory.createTimeslots();
    var lessons = Schedule.lessonsFactory.createLessons(weekdays, subjects, timeslots);
    ok(lessons.length > 0, "Lessons should be created");
    var lesson = lessons.get(1);
    ok(lesson instanceof Schedule.Lesson, "Collection should contain lessons");
    equal(lesson.get('timeslot'), timeslots.get(1), "Lesson should be on first timeslot");
    equal(lesson.get('weekday'), weekdays.get("Mon"), "Lesson should be on Monday");
    equal(lesson.get('subject'), subjects.get("EW"), "Lessons subject should be EW");
  });

  test("Schedule loading", function() {
    var schedule = Schedule.scheduleFactory.createSchedule("test");
    equal(schedule.id, "test", "Schedule id should be 'test'");
    ok(schedule.get('timeslots').length > 0, "Timeslots should be created");
    ok(schedule.get('weekdays').length > 0, "Weekdays should be created");
    ok(schedule.get('subjects').length > 0, "Subjects should be created");
    ok(schedule.get('lessons').length > 0, "Lessons should be created");
  });

});

