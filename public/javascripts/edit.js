$(document).ready(function() {
  var chart  = document.getElementById("rendered-chart");
  var $title = $("input.title");
  var $data  = $("#table-data");
  var $add   = $("a.add-description");
  var $desc  = $("#description");
  var $type  = $("#chart-type");
  var $table = $("#data-table");
  var $clip  = $("a.delete-last-row");
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

  function isLastTableRow(input) {
    return input === $table.find("input:last")[0];
  }

  function addTableRow() {
    var $lastRow = $table.find("tr:last").clone();
    $lastRow.find("input").val("");
    $lastRow.appendTo($table);
    $lastRow.find("input:first").focus();
    showOrHideDeleteRowLink();
  }

  function deleteLastRow() {
    if ($("tr", $table).length > 2) {
      $table.find("tr:last").remove();
      showOrHideDeleteRowLink();
    }
  }

  function showOrHideDeleteRowLink() {
    if ($("tr", $table).length > 2) {
      $clip.show();
    } else {
      $clip.hide();
    }
  }

  function getTableData() {
    var data = [];
    $("tr", $table).each(function() {
      var rowData = [];
      $(this).find("td, th").each(function() {
        rowData.push($(this).find("input").val());
      });
      data.push(rowData);
    });
    return data;
  }

  $("input.title").change(function() {
    if ($.trim($title.val()) === "") {
      $title.addClass("empty");
    } else {
      $title.removeClass("empty");
    }

    renderChart();
  });

  $add.click(function() {
    // How fancy can we get here?
    $add.fadeOut(function() {
      var $label = $add.closest("label");
      $label.slideUp(function() {
        $label.text("Description");
        $label.slideDown();
      });
    });

    $desc.slideDown();
  });

  $type.change(function() {
    var chartType = $type.val();
    $(chart).attr("class", "").addClass(chartType + "-chart");
    renderChart();
  });

  $table.delegate("input", "change", renderChart);

  $table.delegate("input", "focus", function() {
    var $input = $(this);
    setTimeout(function() {
      $input.select();
    }, 0);
  });

  $table.delegate("input", "keydown", function(e) {
    switch (e.keyCode) {
    case 9:
      if (isLastTableRow(this)) {
        addTableRow();
        e.preventDefault();
      }
      break;

    case 38:
      selectCellAbove(this);
      e.preventDefault();
      break;

    case 40:
      selectCellBelow(this);
      e.preventDefault();
      break;
    }
  });

  $clip.click(deleteLastRow);

  $save.click(function() {
    // Yes, I realize this is a bit ridiculous (HTML -> JSON -> HTML); I will probably change this
    // to something less insane before long.
    $data.val(JSON.stringify(getTableData()));
  });

  window.getChartOptions = function() {
    return {
      title: {
        text: $title.val()
      }
    };
  };
});
