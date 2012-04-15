package controllers

import play.api.libs.json.Json.toJson
import play.api.mvc.Action
import play.api.mvc.Controller
import java.util.Date
import java.util.Calendar
import java.util.GregorianCalendar
import java.lang.Long

object Application extends Controller {
  
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def weekdays = Action {
    val weekdaysJson = toJson(
      Seq(
        Map("id" -> toJson("Mon"), "name" -> toJson("Poniedziałek")),
        Map("id" -> toJson("Tue"), "name" -> toJson("Wtorek")),
        Map("id" -> toJson("Wed"), "name" -> toJson("Środa")),
        Map("id" -> toJson("Thu"), "name" -> toJson("Czwartek")),
        Map("id" -> toJson("Fri"), "name" -> toJson("Piątek"))
      )
    )

    Ok(weekdaysJson).as("application/json")
  }
  
  def subjects = Action {
    val subjectsJson = toJson{
      Seq(
		  Map("id" -> toJson("EW"), "name" -> toJson("Edukacja Wczesnoszkolna")),
		  Map("id" -> toJson("rel"), "name" -> toJson("Religia")),
		  Map("id" -> toJson("inf"), "name" -> toJson("Informatyka")),
		  Map("id" -> toJson("EWsg"), "name" -> toJson("Wychowanie fizyczne")),
		  Map("id" -> toJson("ang"), "name" -> toJson("Język angielski"))
      )
    }
    
    Ok(subjectsJson).as("application/json")
  }

  def timeslots = Action {
    def toDate(hour: Int, minute: Int): Date = new GregorianCalendar(0, 0, 0, hour, minute).getTime()
    def toString(d: Date): String = String.format("\\/Date(%d)\\/", new Long(d.getTime()))
    def toDateString(hour: Int, minute: Int): String = toString(toDate(hour, minute))
    val timeslotsJson = toJson {
      Seq(
		  Map("id" -> toJson(1), "start" -> new JsObject(toDateString(8, 0)), "end" -> toJson(toDateString(8, 45))),
		  Map("id" -> toJson(2), "start" -> toJson(toDateString(8, 50)), "end" -> toJson(toDateString(9, 35))),
		  Map("id" -> toJson(3), "start" -> toJson(toDateString(9, 45)), "end" -> toJson(toDateString(10, 30))),
		  Map("id" -> toJson(4), "start" -> toJson(toDateString(10, 40)), "end" -> toJson(toDateString(11, 25))),
		  Map("id" -> toJson(5), "start" -> toJson(toDateString(11, 45)), "end" -> toJson(toDateString(12, 30))),
		  Map("id" -> toJson(6), "start" -> toJson(toDateString(12, 45)), "end" -> toJson(toDateString(13, 30))),
		  Map("id" -> toJson(7), "start" -> toJson(toDateString(13, 35)), "end" -> toJson(toDateString(14, 20))),
		  Map("id" -> toJson(8), "start" -> toJson(toDateString(14, 25)), "end" -> toJson(toDateString(15, 10)))
      )
    }
    
    Ok(timeslotsJson).as("application/json")
  }
  
}
