source "https://rubygems.org"

# Server requirements
gem "thin"

# Project requirements
gem "foreman"
gem "rake"
gem "sinatra-flash", :require => "sinatra/flash"

# Component requirements
gem "json"
gem "sass"
gem "haml"
gem "redcarpet"
gem "dm-validations"
gem "dm-timestamps"
gem "dm-migrations"
gem "dm-constraints"
gem "dm-aggregates"
gem "dm-core"
gem "dm-noisy-failures"
gem "randy"

# Padrino Stable Gem
gem "padrino", "0.10.7"


group :production do
  gem "pg"
  gem "dm-postgres-adapter"
end

group :development do
  gem "dm-sqlite-adapter"
end
