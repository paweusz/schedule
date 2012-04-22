
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.weekdays = function(req, res) {
  var weekdaysObj = [
    {id: "Mon", name: "Poniedziałek"},
    {id: "Tue", name: "Wtorek"},
    {id: "Wed", name: "Środa"},
    {id: "Thu", name: "Czwartek"},
    {id: "Fri", name: "Piątek"}
  ];
  res.json(weekdaysObj);
};

exports.bootstrap = function(req, res) {
  var weekdays = [
    {id: "Mon", name: "Poniedziałek"},
    {id: "Tue", name: "Wtorek"},
    {id: "Wed", name: "Środa"},
    {id: "Thu", name: "Czwartek"},
    {id: "Fri", name: "Piątek"}
  ];

  var hmToDate = function(hour, minute) {
    return new Date(0, 0, 1, hour, minute);
  };
  var timeslots = [
    {id: 1, start: hmToDate(8, 0), end: hmToDate(8, 45)},
    {id: 2, start: hmToDate(8, 50), end: hmToDate(9, 35)},
    {id: 3, start: hmToDate(9, 45), end: hmToDate(10, 30)},
    {id: 4, start: hmToDate(10, 40), end: hmToDate(11, 25)},
    {id: 5, start: hmToDate(11, 45), end: hmToDate(12, 30)},
    {id: 6, start: hmToDate(12, 45), end: hmToDate(13, 30)},
    {id: 7, start: hmToDate(13, 35), end: hmToDate(14, 20)},
    {id: 8, start: hmToDate(14, 25), end: hmToDate(15, 10)}
  ];

  var subjects = [
    {id: "EW", name: "Edukacja Wczesnoszkolna"},
    {id: "rel", name: "Religia"},
    {id: "inf", name: "Informatyka"},
    {id: "EWsg", name: "Wychowanie fizyczne"},
    {id: "ang", name: "Język angielski"}
  ];

  var lessons = [
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

  res.render('bootstrap.ejs', {
    weekdays: JSON.stringify(weekdays),
    timeslots: JSON.stringify(timeslots),
    subjects: JSON.stringify(subjects),
    lessons: JSON.stringify(lessons)
  });
}

