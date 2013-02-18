$(document).ready(function() {
  var chart  = document.getElementById("rendered-chart");
  var $title = $("input.title");
  var $type  = $("#chart-type");
  var $table = $("#data-table");
  var $save  = $("#save-button");

  function renderChart() {
    HighTables.renderChart(chart);
  }

  function selectNeighborCell(input, rowOffset) {
    var $input = $(input);
    var $cell  = $input.closest("td, th");
    var $row   = $cell.closest("tr");
    var $table = $row.closest("table");

    var adjacentRow  = $("tr", $table)[$row.index() + rowOffset];
    var neighborCell = $("td, th", $(adjacentRow))[$cell.index()];
    $(neighborCell).find("input").select();
  }

  function selectCellAbove(input) {
    selectNeighborCell(input, -1);
  }

  function selectCellBelow(input) {
    selectNeighborCell(input, 1);
  }

  $("input.title").change(function() {
    if ($.trim($title.val()) === "") {
      $title.addClass("empty");
    } else {
      $title.removeClass("empty");
    }

    renderChart();
  });

  $type.change(function() {
    var chartType = $type.val();
    $(chart).attr("class", "").addClass(chartType + "-chart");
    renderChart();
  });

  $table.delegate("input", "change", renderChart);

  $table.delegate("input", "focus", function() {
    $(this).select();
  });

  $table.delegate("input", "keydown", function(e) {
    switch (e.keyCode) {
    case 38:
      selectCellAbove(this);
      break;
    case 40:
      selectCellBelow(this);
      break;
    }
  });

  $save.click(function() {
  });

  window.getChartOptions = function() {
    return {
      title: {
        text: $title.val()
      }
    };
  };
});
