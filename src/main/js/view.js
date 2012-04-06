"use strict";

Schedule.ScheduleView = Backbone.View.extend({
  
  timeslotViews: null,
  
  initialize: function() {
    this.timeslotViews = _.map(this.model.get('timeslots'), function(timeslot) {
      return new Schedule.TimeslotView({
        model: timeslot
      });
    });
  },
  
  render: function() {
    var template = _.template( $("#schedule_template").html(), {
      scheduleName: this.model.get('name')
    });
    this.$el.html( template );
    
    _.each(this.timeslotViews, function(tsView) {
      this.$el.find('tbody').append(tsView.render().el);
    }, this);
  }
});

Schedule.TimeslotView = Backbone.View.extend({

  tagName: 'tr',

  formatMinute: function(minute) {
    return $.formatNumber(minute, {format:"00", locale:"us"});
  },
  
  getStart: function() {
    return this.model.getStartHour() + ":" 
      + this.formatMinute(this.model.getStartMinute());
  },
  
  getEnd: function() {
    return this.model.getEndHour() + ":" 
      + this.formatMinute(this.model.getEndMinute());
  },

  render: function() {
    var template = _.template( $("#timeslot_template").html(), {
      start: this.getStart(),
      end: this.getEnd()
    });
    this.$el.html( template );
    return this;
  },

});


