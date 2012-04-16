
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

