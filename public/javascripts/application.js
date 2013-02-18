$(document).ready(function() {
  var chart = document.getElementById("rendered-chart");
  var $title = $("input.title");

  function renderChart() {
    HighTables.LineChart.renderTo(chart);
  }

  function selectCellAdjacent(input, rowOffset) {
    var $input = $(input);
    var $cell  = $input.closest("td, th");
    var $row   = $cell.closest("tr");
    var $table = $row.closest("table");

    var lowerRow  = $("tr", $table)[$row.index() + rowOffset];
    var lowerCell = $("td, th", $(lowerRow))[$cell.index()];
    $(lowerCell).find("input").select();
  }

  function selectCellAbove(input) {
    selectCellAdjacent(input, -1);
  }

  function selectCellBelow(input) {
    selectCellAdjacent(input, 1);
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

  $("input").focus(function() {
    $(this).select();
  });

  $("input").keydown(function(e) {
    switch (e.keyCode) {
    case 38:
      selectCellAbove(this);
      break;
    case 40:
      selectCellBelow(this);
      break;
    }
  });

  window.getChartOptions = function() {
    return {
      title: {
        text: $title.val()
      }
    };
  };
});
