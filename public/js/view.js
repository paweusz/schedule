"use strict";

define(function() {

  var ScheduleView = Backbone.View.extend({
    
    timeslotViews: null,
    columnsView: null,
    
    initialize: function() {
      var ts = new Date();
      
      this.timeslotViews = this.model.get('timeslots').map(function(timeslot) {
        return new TimeslotView({
          model: timeslot,
          schedule: this.model,
          ts: ts
        });
      }, this);
      this.columnsView = new ColumnsView({
        model: this.model.get('weekdays'),
        schedule: this.model,
        ts: ts
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

  var NextWeekdaySupport = Backbone.View.extend({

    initialize: function() {
      _.bind(this.isNextWeekday, this);
    },

    isNextWeekday: function(weekday) {
      var schedule = this.options.schedule;
      return weekday == schedule.getNextWeekday(this.options.ts);
    }
    
  });

  var ColumnsView = NextWeekdaySupport.extend({

    render: function() {
      var template = _.template( $("#columns_template").html(), {
        weekdays: this.model,
        view: this
      });
      this.$el.html( template );

      return this;
    }
    
  });

  var TimeslotView = NextWeekdaySupport.extend({

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

    getLessonName: function(weekday) {
      var schedule = this.options.schedule;
      var lessonName = "";
      var lesson = schedule.getLesson(weekday, this.model);
      if (lesson != null) {
        lessonName = lesson.get('subject').get('name');
      }
      return lessonName;
    },

    render: function() {
      var schedule = this.options.schedule;
      var template = _.template( $("#timeslot_template").html(), {
        start: this.getStart(),
        end: this.getEnd(),
        weekdays: schedule.get('weekdays'),
        view: this
      });
      this.$el.html( template );
      
      return this;
    },

  });

  return {
    ScheduleView: ScheduleView
  }

});



