$(document).ready(function() {
  var chart = document.getElementById("rendered-chart");
  var $title = $("input.title");

  function renderChart() {
    HighTables.LineChart.renderTo(chart);
  }

  $("input", "#data-table").change(renderChart);

  $("input.title").change(function() {
    if ($.trim($title.val()) === "") {
      $title.addClass("empty");
    } else {
      $title.removeClass("empty");
    }

    renderChart();
  });

  window.getChartOptions = function() {
    return {
      title: {
        text: $title.val()
      }
    };
  };
});
