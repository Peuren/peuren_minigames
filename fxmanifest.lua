fx_version 'cerulean'
game 'gta5'

author 'PEUREN DEVELOPMENT - peuren.tebex.io'
version '0.0.0'
lua54 'yes'

shared_scripts { 'config.lua' }
client_scripts { "client/*" }

files { 'locales/*.json', "web/build/**/*" }

dependency 'peuren_lib'

ui_page "http://localhost:5173/"
--ui_page "web/build/index.html"
