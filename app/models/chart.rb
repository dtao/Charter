class Chart
  include DataMapper::Resource

  property :id,          Serial
  property :token,       String, :unique_index => true
  property :chart_type,  String
  property :title,       String
  property :description, Text
  property :data,        Text
end
