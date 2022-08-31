'use strict'

const Hapi = require('@hapi/hapi');
const pg = require('pg');
require("dotenv").config({ path: `./env/.env` })
const Path = require('path');

const init_db = () => {
    const pool = new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    return pool;
}

const init = async () => {
    const pool = init_db();
    const myServer = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    })

    await myServer.register({
        plugin: require('hapi-auto-route'),
        options: {
            routes_dir: Path.join(__dirname, 'routes'),
        }
    })

    myServer.ext("onRequest", function (request, h) {
        request.pg = pool;
        return h.continue;
    });

    await myServer.start();
    console.log('server started at %s', myServer.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
})

init()