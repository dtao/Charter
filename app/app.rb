class ChartMaker < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  configure :development do
    set :show_exceptions, false
  end

  get "/" do
    @chart = Chart.new
    render(:index)
  end

  get "/edit/:token" do |token|
    @chart = Chart.first(:token => token)
    render(:index)
  end

  get "/:token/:title" do |token, title|
    @chart = Chart.first(:token => token)
    @title = @chart.title
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

  error do
    flash[:notice] = "#{env['sinatra.error'].try(:message)}"
    redirect("/")
  end
end
