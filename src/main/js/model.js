"use strict";

Schedule.Model = Ember.Object.extend({

  loadWeekdays: function() {
    return {
      Mon: Schedule.Weekday.create({id: "Mon", name: "Poniedziałek"}),
      Tue: Schedule.Weekday.create({id: "Tue", name: "Wtorek"}),
      Wed: Schedule.Weekday.create({id: "Wed", name: "Środa"}),
      Thu: Schedule.Weekday.create({id: "Thu", name: "Czwartek"}),
      Fri: Schedule.Weekday.create({id: "Fri", name: "Piątek"})
    };
  },
  
  loadTimeslots: function() {
    return [
      Schedule.Timeslot.create({start: Schedule.hmToDate(8, 0), end: Schedule.hmToDate(8, 45)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(8, 50), end: Schedule.hmToDate(9, 35)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(9, 45), end: Schedule.hmToDate(10, 30)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(10, 40), end: Schedule.hmToDate(11, 25)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(11, 45), end: Schedule.hmToDate(12, 30)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(12, 45), end: Schedule.hmToDate(13, 30)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(13, 35), end: Schedule.hmToDate(14, 20)}),
      Schedule.Timeslot.create({start: Schedule.hmToDate(14, 25), end: Schedule.hmToDate(15, 10)})
    ];
  },
  
  loadSubjects: function() {
    return {
      EW: Schedule.Subject.create({id: "EW", name: "Edukacja Wczesnoszkolna"}),
      rel: Schedule.Subject.create({id: "rel", name: "Religia"}),
      inf: Schedule.Subject.create({id: "inf", name: "Informatyka"}),
      EWsg: Schedule.Subject.create({id: "EWsg", name: "Wychowanie fizyczne"}),
      ang: Schedule.Subject.create({id: "ang", name: "Język angielski"})
    };
  },
  
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
  
  toLessons: function(timeslots, subjects, weekdays, lessonTOs) {
    var lessons = [];
    for (var i = 0; i < lessonTOs.length; i++) {
      var lessonTO = lessonTOs[i];
      lessons.push(this.toLesson(timeslots, subjects, weekdays, lessonTO));
    }
    return lessons;
  },
  
  toLesson: function(timeslots, subjects, weekdays, lessonTO) {
    return Schedule.Lesson.create({
      timeslot: timeslots[lessonTO.timeslot - 1],
      subject: subjects[lessonTO.subjectId],
      weekday: weekdays[lessonTO.weekdayId]
    });
  },
  
  loadLessons: function() {
    var weekdays = this.loadWeekdays();
    var timeslots = this.loadTimeslots();
    var subjects = this.loadSubjects();
    return this.toLessons(timeslots, subjects, weekdays, this.loadLessonTOs());
  },
   
  loadSchedule: function(id) {
    return Schedule.Schedule.create({
      name: id,
      lessons: this.loadLessons()
    });
  },
  
});
