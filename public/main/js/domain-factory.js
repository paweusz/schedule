"use strict";

Schedule.timeslotsFactory = {
  createTimeslots: function() {
    return new Schedule.Timeslots([
      new Schedule.Timeslot({id: 1, start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)}),
      new Schedule.Timeslot({id: 2, start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)}),
      new Schedule.Timeslot({id: 3, start: Schedule.hmToDate(9, 45), end: Schedule.hmToDate(10, 30)}),
      new Schedule.Timeslot({id: 4, start: Schedule.hmToDate(10, 40), end: Schedule.hmToDate(11, 25)}),
      new Schedule.Timeslot({id: 5, start: Schedule.hmToDate(11, 45), end: Schedule.hmToDate(12, 30)}),
      new Schedule.Timeslot({id: 6, start: Schedule.hmToDate(12, 45), end: Schedule.hmToDate(13, 30)}),
      new Schedule.Timeslot({id: 7, start: Schedule.hmToDate(13, 35), end: Schedule.hmToDate(14, 20)}),
      new Schedule.Timeslot({id: 8, start: Schedule.hmToDate(14, 25), end: Schedule.hmToDate(15, 10)})
    ]);
  }
};

Schedule.weekdaysFactory = {
  createWeekdays: function() {
    return new Schedule.Weekdays([
      new Schedule.Weekday({id: "Mon", name: "Poniedziałek"}),
      new Schedule.Weekday({id: "Tue", name: "Wtorek"}),
      new Schedule.Weekday({id: "Wed", name: "Środa"}),
      new Schedule.Weekday({id: "Thu", name: "Czwartek"}),
      new Schedule.Weekday({id: "Fri", name: "Piątek"})
    ]);
  }
};

Schedule.subjectsFactory = {
  createSubjects: function() {
    return new Schedule.Subjects([
      new Schedule.Subject({id: "EW", name: "Edukacja Wczesnoszkolna"}),
      new Schedule.Subject({id: "rel", name: "Religia"}),
      new Schedule.Subject({id: "inf", name: "Informatyka"}),
      new Schedule.Subject({id: "EWsg", name: "Wychowanie fizyczne"}),
      new Schedule.Subject({id: "ang", name: "Język angielski"})
    ]);
  }
};

Schedule.lessonsFactory = (function() {

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
    return new Schedule.Lessons(_.map(loadLessonTOs(), function(lessonTO) {
      return new Schedule.Lesson({
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

Schedule.scheduleFactory = {
  createSchedule: function(id) {
//    var weekdays = Schedule.weekdaysFactory.createWeekdays();
    var weekdays = new Schedule.Weekdays;
    weekdays.fetch({
      success: function(collection, response) {
        console.log(response);
      }
    });
    var subjects = Schedule.subjectsFactory.createSubjects();
    var timeslots = Schedule.timeslotsFactory.createTimeslots();
    var lessons = Schedule.lessonsFactory.createLessons(weekdays, subjects, timeslots);
    return new Schedule.Schedule({
      id: id,
      name: "Patryk",
      lessons: lessons,
      weekdays: weekdays,
      timeslots: timeslots,
      subjects: subjects
    });
  }
};


