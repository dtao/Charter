DataMapper.logger = logger
DataMapper::Property::String.length(255)

case Padrino.env
  when :production  then DataMapper.setup(:default, ENV["DATABASE_URL"])
  when :development then DataMapper.setup(:default, "sqlite3://" + Padrino.root('db', "chart_maker_development.db"))
  when :test        then DataMapper.setup(:default, "sqlite3://" + Padrino.root('db', "chart_maker_test.db"))
end
