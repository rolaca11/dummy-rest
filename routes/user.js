var express = require('express');
var router = express.Router();
var knex = require('knex')({
    client: 'pg',
    // connection: process.env.PG_CONNECTION_STRING,
    connection: 'postgres://dssgdpr@dssgdprpostgres:AaL3R9P3FBJ9VyFA@dssgdprpostgres.postgres.database.azure.com:5432/pentaho-test-data'
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    knex.select("*").from("person")
        .then((data) => {
            console.log(data);
            res.status(200);
            res.send(data.filter((data) => data.));
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send(error);
    })
});

module.exports = router;
