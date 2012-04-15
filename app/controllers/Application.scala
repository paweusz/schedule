package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.Json._

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
  
}
