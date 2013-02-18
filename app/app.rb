class ChartMaker < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  get :index do
    @chart_types = {
      "Line"     => "line",
      "Smoothed" => "spline",
      "Area"     => "area",
      "Stack"    => "stack",
      "Bar"      => "bar",
      "Column"   => "column",
      "Pie"      => "pie"
    }
    render :index
  end
end
