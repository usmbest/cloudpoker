const router    = require('express').Router();
const path      = require('path');
const STATIC_PATH = path.join(__dirname, './../../public')
const db_config = require(__dirname + './../database.js');// 2020-09-13
const conn      = db_config.init();//2020-09-13

router.get('/:page', function(req, res, next) {
    var page = req.params.page;
    //#region #################
    var sql3 = " DELETE FROM board WHERE TIMESTAMPDIFF(SECOND, regdate, NOW() ) > 900 ";
    var params = [];
    conn.query(sql3, params, function(err, rows2, fields2){if(err){ console.log(err);} else { console.log("ok - "+sql3);}});
    //#endregion #################
    var sql3 = "select idx, name, title, date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board order by idx desc ";
    conn.query(sql3, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('pages/list', {title: 'Gaming List', rows: rows});
    });
});

router.get('/', function(req, res, next) {
    res.redirect('/list/1');
});

module.exports = router;
