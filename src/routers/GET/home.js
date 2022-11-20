#! /usr/bin/env node
module.exports = {
    "config": {
        "name": "home",
        "path": "",
        "description": "The home path"
    },

    "excute": (req, res, app) => {
        res.send("<h1>This is home page</h1>")
    }
}