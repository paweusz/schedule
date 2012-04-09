"use strict";

Schedule.ScheduleView = Backbone.View.extend({
  
  timeslotViews: null,
  columnsView: null,
  
  initialize: function() {
    this.timeslotViews = _.map(this.model.get('timeslots'), function(timeslot) {
      return new Schedule.TimeslotView({
        model: timeslot,
        schedule: this.model
      });
    }, this);
    this.columnsView = new Schedule.ColumnsView({
      model: this.model.get('weekdays'),
      schedule: this.model,
      ts: new Date()
    });
  },
  
  render: function() {
    var template = _.template( $("#schedule_template").html(), {
      scheduleName: this.model.get('name'),
      weekdays: this.model.get('weekdays')
    });
    this.$el.html( template );
    
    _.each(this.timeslotViews, function(tsView) {
      this.$el.find('tbody').append(tsView.render().el);
    }, this);
    
    this.$el.find('table').prepend(this.columnsView.render().$el.children());
  }
});

Schedule.ColumnsView = Backbone.View.extend({

  initialize: function() {
    _.bind(this.isNextWeekday, this);
  },

  isNextWeekday: function(weekday) {
    var schedule = this.options.schedule;
    return weekday == schedule.getNextWeekday(this.options.ts);
  },
  
  render: function() {
    var template = _.template( $("#columns_template").html(), {
      weekdays: this.model,
      view: this
    });
    this.$el.html( template );

    return this;
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
    var schedule = this.options.schedule;
    
    var template = _.template( $("#timeslot_template").html(), {
      start: this.getStart(),
      end: this.getEnd()
    });
    this.$el.html( template );

    _(schedule.get('weekdays')).each(function(weekday) {
      var td = document.createElement('td');
      this.$el.append(td);
      var lesson = schedule.getLesson(weekday, this.model);
      if (lesson != null) {
        var subjectName = lesson.get('subject').get('name');
        $(td).text(subjectName);
      }
    }, this);    
    
    return this;
  },

});


