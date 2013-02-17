$(document).ready(function() {
  var chart = document.getElementById("rendered-chart");

  $("input", "#data-table").change(function() {
    HighTables.LineChart.renderTo(chart);
  });
});
