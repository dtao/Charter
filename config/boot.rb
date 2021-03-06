# Define our constants
PADRINO_ENV  = ENV["PADRINO_ENV"] ||= ENV["RACK_ENV"] ||= "development"  unless defined?(PADRINO_ENV)
PADRINO_ROOT = File.expand_path("../..", __FILE__) unless defined?(PADRINO_ROOT)
PADRINO_HOST = PADRINO_ENV == "production" ? "charter.herokuapp.com" : "localhost:4567"

# Load our dependencies
require "rubygems" unless defined?(Gem)
require "bundler/setup"
Bundler.require(:default, PADRINO_ENV)

##
# Add your before (RE)load hooks here
#
Padrino.before_load do
end

##
# Add your after (RE)load hooks here
#
Padrino.after_load do
  DataMapper.finalize
end

Padrino.load!
