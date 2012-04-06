"use strict";

Schedule.ScheduleView = Backbone.View.extend({
  
  schedule: null,
  
  render: function() {
    var template = _.template( $("#schedule_template").html(), {
      scheduleName: this.model.get('name')
    });
    this.$el.html( template );  
  }
});

Schedule.TimeslotView = Backbone.View.extend((function(){

  function formatMinute(minute) {
    return $.formatNumber(minute, {format:"00", locale:"us"});
  };
  
  function getStart() {
    return this.get('timeslot').getStartHour() + ":" 
      + this.formatMinute(this.get('timeslot').getStartMinute());
  };
  
  function getEnd() {
    return this.get('timeslot').getEndHour() + ":" 
      + this.formatMinute(this.get('timeslot').getEndMinute());
  };

  function render() {
  };

  return {
    render: render
  }
})());


