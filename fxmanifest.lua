fx_version 'adamant'
game 'gta5'

dependencies 'vrp'

ui_page 'html/ui.html'
files {
    'html/**/*',
}

client_script {
    "@vrp/lib/utils.lua",
    "nyo_tattoo_cl.lua"
}

server_scripts{
    "@vrp/lib/utils.lua",
    "nyo_tattoo_cfg.lua",
    "nyo_tattoo_sv.lua"
}
