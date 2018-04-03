var ERR = require('async-stacktrace');
var express = require('express');
var router = express.Router();

var sqldb = require('@prairielearn/prairielib/sql-db');
var sqlLoader = require('@prairielearn/prairielib/sql-loader');

var sql = sqlLoader.loadSqlEquiv(__filename);

router.get('/', function(req, res, next) {
    var params = {
        req_date: res.locals.req_date,
    };
    sqldb.query(sql.current_assessments, params, function(err, result) {
        if (ERR(err, next)) return;
        console.log(result.rows);
        res.locals.assessments = result.rows;

        res.render(__filename.replace(/\.js$/, '.ejs'), res.locals);
    });
});

module.exports = router;
