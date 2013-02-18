class ChartMaker < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  get "/" do
    @chart_types = {
      "Line"     => "line",
      "Smoothed" => "spline",
      "Area"     => "area",
      "Stack"    => "stack",
      "Bar"      => "bar",
      "Column"   => "column",
      "Pie"      => "pie"
    }
    render(:index)
  end

  get "/:token/:title" do |token, title|
    @chart = Chart.first(:token => token)
    render(:chart)
  end

  post "/" do
    chart = Chart.create({
      :chart_type  => params["chart-type"],
      :title       => params["title"],
      :description => params["description"],
      :data        => params["table-data"]
    })

    flash[:notice] = "Created chart '#{chart.title}'"

    redirect(chart.path)
  end
end
