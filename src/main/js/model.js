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
  
  weekdays: undefined,
  
  getWeekdays: function() {
    if (typeof this.weekdays === "undefined") {
      this.weekdays = this.loadWeekdays();
    }
    return this.weekdays;
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
  
  timeslots: undefined,
  
  getTimeslots: function() {
    if (typeof this.timeslots === "undefined") {
      this.timeslots = this.loadTimeslots();
    }
    return this.timeslots;
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
  
  subjects: undefined,
  
  getSubjects: function() {
    if (typeof this.subjects === "undefined") {
      this.subjects = this.loadSubjects();
    }
    return this.subjects;
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
  
  toLessons: function(lessonTOs) {
    var lessons = [];
    for (var i = 0; i < lessonTOs.length; i++) {
      var lessonTO = lessonTOs[i];
      lessons.push(this.toLesson(lessonTO));
    }
    return lessons;
  },
  
  toLesson: function(lessonTO) {
    return Schedule.Lesson.create({
      timeslot: this.getTimeslots()[lessonTO.timeslot - 1],
      subject: this.getSubjects()[lessonTO.subjectId],
      weekday: this.getWeekdays()[lessonTO.weekdayId]
    });
  },
  
  loadLessons: function() {
    return this.toLessons(this.loadLessonTOs());
  },
  
  lessons: undefined,
  
  getLessons: function() {
    if (typeof this.lessons === "undefined") {
      this.lessons = this.loadLessons();
    }
    return this.lessons;
  },
   
  loadSchedule: function(id) {
    return Schedule.Schedule.create({
      name: id,
      lessons: this.getLessons()
    });
  },
  
});
