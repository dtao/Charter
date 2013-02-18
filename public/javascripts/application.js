$(document).ready(function() {
  $("a.dismiss").on("click", function() {
    var $container = $(this).parent();
    $container.fadeOut(function() {
      $container.remove();
    });
  });
});
