$(document).ready(function () {
  $("#main-title").hover(
    function () {
      $(this).css({
        "color": "blue",
        "transform": "scale(1.1)",
        "transition": "transform 0.3s ease"
      });
    },
    function () {
      $(this).css({
        "color": "black",
        "transform": "scale(1)"
      });
    }
  );

  $("#show-alert-btn").click(function () {
    $("<div class='alert alert-info'>You clicked the button!</div>")
      .appendTo("body")
      .fadeIn(500)
      .delay(2000)
      .fadeOut(500, function () {
        $(this).remove();
      });
  });

  $("#main-title").click(function () {
    $(this)
      .animate({ fontSize: "2.5em", opacity: 0.5 }, 500)
      .animate({ fontSize: "2em", opacity: 1 }, 500);
  });
});
