class Chart
  include DataMapper::Resource

  property :id,          Serial
  property :token,       String
  property :chart_type,  String
  property :label,       String
  property :description, Text
  property :data,        Text
end
