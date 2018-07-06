var express = require('express');
var knex = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
});

/* GET users listing. */
const router = (req, res) => {
    knex.select({
        f_id: 'f_id',
        f_ugyfelnev: 'f_ugyfelnev',
        f_anyanev: 'f_anyanev',
        f_szuldat: knex.raw('TO_CHAR(f_szuldat, \'yyyy-MM-dd\')'),
        f_szulhely: 'f_szulhely'
    }).from("person")
        .then((data) => {

            if(req.query.ugyfelnev) data = filterInput(data, 'ugyfelnev', req);
            if(req.query.anyanev) data = filterInput(data, 'anyanev', req);
            if(req.query.szulhely) data = filterInput(data, 'szulhely', req);

            if(req.query.szuldat) {
                data = data.filter(row => row["f_szuldat"] === req.query.szuldat);
            }

            res.status(200);
            res.send(data);
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send(error);
    })
};

const filterInput = (data, field, req) => {
    return data.filter(row => row["f_" + field].includes(req.query[field]));
}

module.exports = router;
