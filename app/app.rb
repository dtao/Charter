class Charter < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  configure :development do
    set :show_exceptions, false
  end

  get "/" do
    @chart = Chart.new
    render(:edit)
  end

  get "/edit/:token" do |token|
    @chart = Chart.first(:token => token)
    render(:edit)
  end

  get "/embed/:token" do |token|
    @chart = Chart.first(:token => token)
    render(:embed, :layout => false)
  end

  get "/options/*.js" do |params|
    chart = Chart.first(:token => params.first.chomp(".js"))

    content_type "text/javascript"
    <<-EOJS
      function getChartOptions() {
        return #{chart.options};
      }
    EOJS
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
      :data        => params["table-data"],
      :options     => params["chart-options"]
    })

    redirect(chart.path)
  end

  error do
    flash[:notice] = env["sinatra.error"].try(:message) || "An unexpected error occurred."
    redirect("/")
  end
end
