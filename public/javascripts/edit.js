$(document).ready(function() {
  var chart    = document.getElementById("rendered-chart");
  var $title   = $("input.title");
  var $data    = $("#table-data");
  var $add     = $("a.add-description");
  var $desc    = $("#description");
  var $type    = $("#chart-type");
  var $table   = $("#data-table");
  var $actions = $(".table-actions");
  var $plus    = $("a.add-column");
  var $minus   = $("a.delete-column");
  var $save    = $("#save-button");
  var $help    = $(".instructions");

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
    var $newRow = $table.find("tr:last").clone();
    $newRow.find("input").val("");
    $newRow.appendTo($table);
    $newRow.find("input:first").focus();
  }

  function deleteLastRow() {
    if ($("tr", $table).length > 2) {
      $table.find("tr:last").remove();
    }
  }

  function lastRowIsEmpty() {
    if ($("tr", $table).length < 4) {
      return false;
    }

    var $inputs = $table.find("tr:last").find("input");
    for (var i = 0; i < $inputs.length; ++i) {
      if ($.trim($inputs[i].value).length > 0) {
        return false;
      }
    }
    return true;
  }

  function isRightmostCell(input) {
    return input === $(input).closest("tr").find("input:last")[0];
  }

  function addTableColumn() {
    var $firstRow   = $table.find("tr:first");
    var $newCell    = $firstRow.find("th:last").clone().appendTo($firstRow);
    var placeholder = "Column " + $("th", $firstRow).length;
    $newCell.find("input").val("").attr("placeholder", placeholder);

    $table.find("tr:gt(0)").each(function() {
      var $row  = $(this);
      var $cell = $row.find("td:last").clone();
      $("input", $cell).val("");
      $cell.appendTo($row);
    });
  }

  function deleteLastColumn() {
    $("tr", $table).each(function() {
      $(this).find("td:last,th:last").remove();
    });
  }

  function lastColumnIsEmpty() {
    var $firstRow = $table.find("tr:first");
    if ($("th", $firstRow).length < 3) {
      return false;
    }

    var $rows = $table.find("tr");
    for (var i = 0; i < $rows.length; ++i) {
      if (!lastCellIsEmpty($rows[i])) {
        return false;
      }
    }
    return true;
  }

  function lastCellIsEmpty(row) {
    var $input = $(row).find("td:last,th:last").find("input");
    return $.trim($input.val()).length === 0;
  }

  function lastCellHasFocus() {
    return $table.find("tr:last").find("input:last").is(":focus");
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

  function showInstructions(section) {
    hideInstructions();
    $(".instructions." + section).addClass("visible");
  }

  function hideInstructions() {
    $help.removeClass("visible");
  }

  function afterEventLoop(callback) {
    setTimeout(callback, 0);
  }

  $title.change(function() {
    if ($.trim($title.val()) === "") {
      $title.addClass("empty");
    } else {
      $title.removeClass("empty");
    }
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
    tableHasFocus = true;
    var $input = $(this);
    afterEventLoop(function() {
      $input.select();
    });
    if (isLastTableRow(this) && isRightmostCell(this)) {
      showInstructions("last-cell");
    } else {
      showInstructions("table");
    }
  });

  $table.delegate("input", "keydown", function(e) {
    switch (e.keyCode) {
    case 9:
      if (isLastTableRow(this) && !e.shiftKey) {
        addTableRow();
        e.preventDefault();
      }
      break;

    case 27:
      $(this).blur();
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

  var tableHasFocus = false;
  $table.delegate("input", "blur", function() {
    tableHasFocus = false;
    afterEventLoop(function() {
      if (!tableHasFocus) {
        while (lastRowIsEmpty()) {
          deleteLastRow();
        }
        renderChart();
        hideInstructions();
      }
    });
  });

  $actions.mouseover(function() {
    showInstructions("columns");
  });

  $actions.mouseout(function() {
    if (tableHasFocus) {
      if (lastCellHasFocus()) {
        showInstructions("last-cell");
      } else {
        showInstructions("table");
      }
    } else {
      hideInstructions();
    }
  });

  $plus.click(addTableColumn);

  $minus.click(function() {
    if (lastColumnIsEmpty()) {
      deleteLastColumn();
    }
  });

  $save.click(function() {
    // Yes, I realize this is a bit ridiculous (HTML -> JSON -> HTML); I will probably change this
    // to something less insane before long.
    $data.val(JSON.stringify(getTableData()));
  });

  window.getChartOptions = function() {
    return {
      plotOptions: {
        series: {
          animation: false
        }
      }
    };
  };
});
