"use strict";

define(["domain"], function(domain) {

  var createTimeslots = function() {
    return new domain.Timeslots([
      {id: 1, start: domain.hmToDate(8, 0), end: domain.hmToDate(8, 45)},
      {id: 2, start: domain.hmToDate(8, 50), end: domain.hmToDate(9, 35)},
      {id: 3, start: domain.hmToDate(9, 45), end: domain.hmToDate(10, 30)},
      {id: 4, start: domain.hmToDate(10, 40), end: domain.hmToDate(11, 25)},
      {id: 5, start: domain.hmToDate(11, 45), end: domain.hmToDate(12, 30)},
      {id: 6, start: domain.hmToDate(12, 45), end: domain.hmToDate(13, 30)},
      {id: 7, start: domain.hmToDate(13, 35), end: domain.hmToDate(14, 20)},
      {id: 8, start: domain.hmToDate(14, 25), end: domain.hmToDate(15, 10)}
    ]);
  };

  var createWeekdays = function() {
    return new domain.Weekdays([
      {id: "Mon", name: "Poniedziałek"},
      {id: "Tue", name: "Wtorek"},
      {id: "Wed", name: "Środa"},
      {id: "Thu", name: "Czwartek"},
      {id: "Fri", name: "Piątek"}
    ]);
  };

  var createSubjects = function() {
    return new domain.Subjects([
      {id: "EW", name: "Edukacja Wczesnoszkolna"},
      {id: "rel", name: "Religia"},
      {id: "inf", name: "Informatyka"},
      {id: "EWsg", name: "Wychowanie fizyczne"},
      {id: "ang", name: "Język angielski"}
    ]);
  };

  var lessonsFactory = (function() {

    function loadLessonTOs() {
      return [
        {id: 1, timeslotId: 1, subjectId: "EW", weekdayId: "Mon"},
        {id: 2, timeslotId: 2, subjectId: "EW", weekdayId: "Mon"},
        {id: 3, timeslotId: 3, subjectId: "EW", weekdayId: "Mon"},
        {id: 4, timeslotId: 4, subjectId: "EW", weekdayId: "Mon"},

        {id: 5, timeslotId: 2, subjectId: "EW", weekdayId: "Tue"},
        {id: 6, timeslotId: 3, subjectId: "EW", weekdayId: "Tue"},
        {id: 7, timeslotId: 4, subjectId: "EW", weekdayId: "Tue"},
        {id: 8, timeslotId: 5, subjectId: "rel", weekdayId: "Tue"},
        {id: 9, timeslotId: 6, subjectId: "inf", weekdayId: "Tue"},

        {id: 10, timeslotId: 1, subjectId: "EWsg", weekdayId: "Wed"},
        {id: 11, timeslotId: 2, subjectId: "EW", weekdayId: "Wed"},
        {id: 12, timeslotId: 3, subjectId: "EW", weekdayId: "Wed"},
        {id: 13, timeslotId: 4, subjectId: "ang", weekdayId: "Wed"},
        {id: 14, timeslotId: 5, subjectId: "EW", weekdayId: "Wed"},

        {id: 15, timeslotId: 2, subjectId: "rel", weekdayId: "Thu"},
        {id: 16, timeslotId: 3, subjectId: "ang", weekdayId: "Thu"},
        {id: 17, timeslotId: 4, subjectId: "EW", weekdayId: "Thu"},
        {id: 18, timeslotId: 5, subjectId: "EW", weekdayId: "Thu"},
        {id: 19, timeslotId: 6, subjectId: "EW", weekdayId: "Thu"},

        {id: 21, timeslotId: 3, subjectId: "EW", weekdayId: "Fri"},
        {id: 22, timeslotId: 4, subjectId: "EW", weekdayId: "Fri"},
        {id: 23, timeslotId: 5, subjectId: "EW", weekdayId: "Fri"},
        {id: 24, timeslotId: 6, subjectId: "EW", weekdayId: "Fri"}
      ];
    };
    
    function createLessons(weekdays, subjects, timeslots) {
      return new domain.Lessons(_.map(loadLessonTOs(), function(lessonTO) {
        return new domain.Lesson({
          id: lessonTO.id,
          timeslot: timeslots.get(lessonTO.timeslotId),
          subject: subjects.get(lessonTO.subjectId),
          weekday: weekdays.get(lessonTO.weekdayId)
        });
      }));
    }

    return {
      createLessons: createLessons
    };
  })();

  var createSchedule = function(id) {
    var weekdays = createWeekdays();
    var subjects = createSubjects();
    var timeslots = createTimeslots();
    var lessons = lessonsFactory.createLessons(weekdays, subjects, timeslots);
    return new domain.Schedule({
      id: id,
      name: "Patryk",
      lessons: lessons,
      weekdays: weekdays,
      timeslots: timeslots,
      subjects: subjects
    });
  };

  return {
    createSchedule: createSchedule
  }

});


