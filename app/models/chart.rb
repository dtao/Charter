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

  validates_presence_of :chart_type
  validates_within      :chart_type, :set => TYPES.values
  validates_presence_of :title
  validates_presence_of :data

  before :create do
    self.token ||= Randy.string(8)
    self.title.try(:strip!)
    self.description.try(:strip!)
    self.data.try(:strip!)
  end

  def edit_path
    "/edit/#{self.token}"
  end

  def path
    "/#{self.token}/#{self.title.gsub(/[^ a-z0-9]/i, '').parameterize}"
  end

  def parsed_data
    @parsed_data ||= JSON.parse(self.data)
  end
end
