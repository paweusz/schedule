function Subject(name) {
  this.name = name;
}

function Lesson(timeslot, subject, weekday) {
  this.timeslot = timeslot;
  this.subject = subject;
  this.weekday = weekday;
}

function Weekday(name) {
  this.name = name;
}

function Timeslot(start, end) {
  this.start = start;
  this.end = end;
}

function Schedule() {
  lessons = [];
}


