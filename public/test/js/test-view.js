"use strict";

$(document).ready(function(){

  module("View");

  test("Number formatting", function() {
    equal($.formatNumber(0, {format:"00", locale:"us"}), "00", "Number should be formatted");
    equal($.formatNumber(5, {format:"00", locale:"us"}), "05", "Number should be formatted");
    equal($.formatNumber(25, {format:"00", locale:"us"}), "25", "Number should be formatted");
  });

});

