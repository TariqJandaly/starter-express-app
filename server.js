#! /usr/bin/env node
console.clear()
const express = require("express")
const fs = require("fs")

const app = express()
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"))

const { Gfiles, Pfiles, APfiles } = {
    Gfiles: fs.readdirSync("./src/routers/GET", () => {}),
    Pfiles: fs.readdirSync("./src/routers/POST", () => {}),
    APfiles: fs.readdirSync("./src/apps", () => {})
}

let apps = {}

for (let APfile of APfiles) {
    let _APfile = require(`./src/apps/${APfile}`)

    apps[_APfile.config.command] = _APfile.excute
}

for(let Gfile of Gfiles) {
    Gfile = require(`./src/routers/GET/${Gfile}`)

    app.get(`/${Gfile.config.path}`, (request, respond) => {
        Gfile.excute(request, respond, apps)
    })

    if(config.settings.get._config) {
        app.get(`/config:${Gfile.config.path}`, (request, respond) => {
            respond.send(Gfile.config)
        })
    }
}

for(let Pfile of Pfiles) {
    Pfile = require(`./src/routers/POST/${Pfile}`)

    app.post(`/${Pfile.config.path}`, (request, respond) => {
        Pfile.excute(request, respond, apps)
    })

    if(config.settings.post._config) {
        app.post(`/config:${Pfile.config.path}`, (request, respond) => {
            respond.send(Pfile.config)
        })
    }
}

app.listen(config.port, () => {
    console.log(config.start_message)
})