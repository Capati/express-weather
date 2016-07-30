(function () {
  "use strict";
  $(window).ready(function () {

    var $titulo = $("#titulo");
    var $cidade = $("#cidade");
    var $icone = $("#icone");

    $("form").on("submit", function (e) {

      e.preventDefault();

      var cidade = $.trim($cidade.val());
      console.log(cidade);
      $titulo.text("Carregando...");

      var request = $.ajax({
        url: "/" + cidade,
        dataType: "json",
      });

      request.done(function (data) {
        var temperatura = data.tempo.main.temp;
        var clima = data.tempo.weather[0].description;
        var icone = data.tempo.weather[0].icon;
        var $fundo = new Image();
        $fundo.src = "/img/tempo/" + icone + ".jpg";
        $($fundo).one("load", function () {
          $titulo.hide().fadeIn(500).html(temperatura + "&#176; - " + clima);
          $icone.hide().prop("src", "http://openweathermap.org/img/w/" + icone + ".png");
          $icone.fadeIn(500);
          $("#bg").fadeOut(500).empty().append(this).fadeIn(500);
        });
      });

      request.fail(function (data) {
        $titulo.text(data.responseText);
        $icone.html("");
      });

    });

  });
}());
