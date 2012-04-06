"use strict";

Schedule.timeslotsFactory = {
  createTimeslots: function() {
    return [
      new Schedule.Timeslot({start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(9, 45), end: Schedule.hmToDate(10, 30)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(10, 40), end: Schedule.hmToDate(11, 25)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(11, 45), end: Schedule.hmToDate(12, 30)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(12, 45), end: Schedule.hmToDate(13, 30)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(13, 35), end: Schedule.hmToDate(14, 20)}),
      new Schedule.Timeslot({start: Schedule.hmToDate(14, 25), end: Schedule.hmToDate(15, 10)})
    ];
  }
};

Schedule.weekdaysFactory = {
  createWeekdays: function() {
    return [
      new Schedule.Weekday({id: "Mon", name: "Poniedziałek"}),
      new Schedule.Weekday({id: "Tue", name: "Wtorek"}),
      new Schedule.Weekday({id: "Wed", name: "Środa"}),
      new Schedule.Weekday({id: "Thu", name: "Czwartek"}),
      new Schedule.Weekday({id: "Fri", name: "Piątek"})
    ];
  }
};

Schedule.subjectsFactory = {
  createSubjects: function() {
    return [
      new Schedule.Subject({id: "EW", name: "Edukacja Wczesnoszkolna"}),
      new Schedule.Subject({id: "rel", name: "Religia"}),
      new Schedule.Subject({id: "inf", name: "Informatyka"}),
      new Schedule.Subject({id: "EWsg", name: "Wychowanie fizyczne"}),
      new Schedule.Subject({id: "ang", name: "Język angielski"})
    ];
  }
};

Schedule.lessonsFactory = {

  loadLessonTOs: function() {
    return [
      {timeslot: 1, subjectId: "EW", weekdayId: "Mon"},
      {timeslot: 2, subjectId: "EW", weekdayId: "Mon"},
      {timeslot: 3, subjectId: "EW", weekdayId: "Mon"},
      {timeslot: 4, subjectId: "EW", weekdayId: "Mon"},

      {timeslot: 2, subjectId: "EW", weekdayId: "Tue"},
      {timeslot: 3, subjectId: "EW", weekdayId: "Tue"},
      {timeslot: 4, subjectId: "EW", weekdayId: "Tue"},
      {timeslot: 5, subjectId: "rel", weekdayId: "Tue"},
      {timeslot: 6, subjectId: "inf", weekdayId: "Tue"},

      {timeslot: 1, subjectId: "EWsg", weekdayId: "Wed"},
      {timeslot: 2, subjectId: "EW", weekdayId: "Wed"},
      {timeslot: 3, subjectId: "EW", weekdayId: "Wed"},
      {timeslot: 4, subjectId: "ang", weekdayId: "Wed"},
      {timeslot: 5, subjectId: "EW", weekdayId: "Wed"},

      {timeslot: 2, subjectId: "rel", weekdayId: "Thu"},
      {timeslot: 3, subjectId: "ang", weekdayId: "Thu"},
      {timeslot: 4, subjectId: "EW", weekdayId: "Thu"},
      {timeslot: 5, subjectId: "EW", weekdayId: "Thu"},
      {timeslot: 6, subjectId: "EW", weekdayId: "Thu"},

      {timeslot: 3, subjectId: "EW", weekdayId: "Fri"},
      {timeslot: 4, subjectId: "EW", weekdayId: "Fri"},
      {timeslot: 5, subjectId: "EW", weekdayId: "Fri"},
      {timeslot: 6, subjectId: "EW", weekdayId: "Fri"}
    ];
  },
  
  createLessons: function(weekdays, subjects, timeslots) {
    var lessonTOs = this.loadLessonTOs();
  
    var subjectsHash = {};
    _.each(subjects, function(subject) {
      subjectsHash[subject.id] = subject;
    });
    
    var weekdaysHash = {};
    _.each(weekdays, function(weekday) {
      weekdaysHash[weekday.id] = weekday;
    });
    
    return _.map(lessonTOs, function(lessonTO) {
      return new Schedule.Lesson({
        timeslot: timeslots[lessonTO.timeslot - 1],
        subject: subjectsHash[lessonTO.subjectId],
        weekday: weekdaysHash[lessonTO.weekdayId]
      });
    });
  }
}

Schedule.scheduleFactory = {
  createSchedule: function(id) {
    var weekdays = Schedule.weekdaysFactory.createWeekdays();
    var subjects = Schedule.subjectsFactory.createSubjects();
    var timeslots = Schedule.timeslotsFactory.createTimeslots();
    var lessons = Schedule.lessonsFactory.createLessons(weekdays, subjects, timeslots);
    return new Schedule.Schedule({
      id: id,
      name: "Plan lekcji",
      lessons: lessons,
      weekdays: weekdays,
      timeslots: timeslots,
      subjects: subjects
    });
  }
};


