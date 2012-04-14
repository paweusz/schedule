package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {
  
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def weekdays = Action {
    val weekdaysJson = Json.toJson(
      Seq(
        Map("id" -> Json.toJson("Mon"), "name" -> Json.toJson("Poniedziałek")),
        Map("id" -> Json.toJson("Tue"), "name" -> Json.toJson("Wtorek")),
        Map("id" -> Json.toJson("Wed"), "name" -> Json.toJson("Środa")),
        Map("id" -> Json.toJson("Thu"), "name" -> Json.toJson("Czwartek")),
        Map("id" -> Json.toJson("Fri"), "name" -> Json.toJson("Piątek"))
      )
    )

    Ok(weekdaysJson).as("application/json")
  }
  
}
