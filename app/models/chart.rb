class Chart
  include DataMapper::Resource

  TYPES = {
    "Line"     => "line",
    "Smoothed" => "spline",
    "Area"     => "area",
    "Stack"    => "stack",
    "Bar"      => "bar",
    "Column"   => "column",
    "Pie"      => "pie"
  }.freeze

  property :id,          Serial
  property :token,       String, :unique_index => true
  property :chart_type,  String
  property :title,       String
  property :description, Text
  property :data,        Text
  property :options,     Text

  validates_presence_of :chart_type
  validates_within      :chart_type, :set => TYPES.values
  validates_presence_of :title
  validates_presence_of :data

  before :create do
    self.token ||= Randy.string(8)
    self.title.try(:strip!)
    self.description.try(:strip!)
    self.data.try(:strip!)
    self.options.try(:strip!)
  end

  def url
    "http://#{PADRINO_HOST}" + self.path
  end

  def embed_url
    "http://#{PADRINO_HOST}/embed/#{self.token}"
  end

  def edit_path
    "/edit/#{self.token}"
  end

  def path
    "/#{self.token}/#{self.title.gsub(/[^ a-z0-9]/i, '').parameterize}"
  end

  def options_path
    "/options/#{self.token}.js"
  end

  def parsed_data
    @parsed_data ||= JSON.parse(self.data)
  end

  def parsed_options
    @parsed_options ||= JSON.parse(self.options)
  end
end
