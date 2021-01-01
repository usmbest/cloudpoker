const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const express = require('express');
const http = require('http');
const cors = require('cors');

// // if you ever want to do the https stuff through express (rather than nginx, or whatever) uncomment this
// var https = require('https');
// var fs = require('fs');

// var options = {
//     cert: fs.readFileSync(__dirname + '/cert/cloudpoker_io.crt'),
//     ca: fs.readFileSync(__dirname + '/cert/cloudpoker_io.ca-bundle'),
//     key: fs.readFileSync(__dirname + '/cert/example_com.key')
// };

//instantiate server
const app = express();
const port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);
// const server = https.createServer(options, app);

//socket setup
const {setSio} = require("./sio");
setSio(require('socket.io')(server));

// initializeSocket(server);
//ejs
app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'ejs');
//middleware
app.use(cors());
app.use(express.json());
app.use('/client', express.static(__dirname + '/../../client'));
app.use('/sharedjs', express.static(__dirname + '/sharedjs'));
//handling login
// #############################################
// const loginRouter = require('./routes/login');
// app.use(loginRouter);
// #############################################

//#region ######### 2021-01-01 mod user login start #########

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//node ./server/src/index.js
///home/dev/cloudpoker/server/src/database.js
/////////// 2020-12-30 추가 ///////////
// cd ~/cloudpoker/server
//npm install mysql 
//npm install --save md5
// cd D:\pokerSrc\cloudpoker\server\src
// d:
// node index.js

//D:\pokerSrc\cloudpoker\common
//database.js

// redis mysql start
//sudo docker start dingrr
//sudo docker start ems_mysql
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//npm install mysql
//npm install ejs
//cd ~/cloudpoker/server
//npm install --save express-session
//npm install --save cookie-parser
//npm install --save express-error-handler
//npm install --save md5
//npm i body-parser 2021-01-02 html request 받기위해 

/////////////////////////////////////////////////////
// html request 받기위해 start @@@@@@
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// html request 받기위해 end @@@@@@
var db_config = require(__dirname + '/database.js');// 2020-09-13

var user_id           = ""; // user idx
var user_nick         = ""; // user 닉네임
var user_avata        = ""; // user 아바타 Default N
var user_level        = 0; // 접속한 후 _levelUpTime 분당 + 1
var user_ip           = "";
var user_CTP_address  = ""; // CTP 입금 주소
var md5 = require('md5');

// #############################################
app.use(express.static('public'));
const STATIC_PATH = path.join(__dirname, '../public')
app.get('/', function(req, res) {
    if (user_id==""){
        res.sendFile(STATIC_PATH + '/ulogin.html')
    }else{
        // res.writeHead("200", {"Content-Type":"text/html;charset=utf-8"});
        // res.end(indexPage(user_id,user_nick,user_avata,user_level)); 
        // Login page for host
        // res.render('pages/login');
        // res.render('pages/login',{user_id:user_id,user_nick:user_nick,user_avata:user_avata,user_level:user_level});
        res.render('pages/login', get_user_info_json(user_id,user_nick,user_avata,user_level));
    }
});
function get_user_info_json(user_id,user_nick,user_avata,user_level) {
    var render_json = new Object();
    render_json.title       = "title";
    render_json.user_id     = user_id;
    render_json.user_nick   = user_nick;
    render_json.user_avata  = user_avata;
    render_json.user_level  = user_level;
    return render_json;
}
// #############################################

// // post 로 넘어 오면 !!! 게임
app.post('/ulogin', function (req, res) {
    var md5 = require('md5');
    var param_username = req.body.username;
    var param_password = req.body.password;
    console.log('요청 파라미터 >> username : '+param_username);
    
    var conn = db_config.init();//2020-09-13
    db_config.connect(conn);
    var sql = "SELECT a.* , (SELECT IFNULL(sum(minuteCnt),0) FROM tbl_game WHERE game_idx='1' and user_idx=a.id) as user_level FROM users a WHERE username ='"+param_username+"' and password ='"+md5(param_password)+"'";
    // console.log(sql);
    conn.query(sql, function (err, rows, fields) 
    {
      if(err){
          console.log('query is not excuted. select fail...\n' + err);
          res.writeHead("200", {"Content-Type":"text/html;charset=utf-8"});
          res.end("<h1>error. query is not excuted </h1>"); 
          res.sendFile(STATIC_PATH + '/ulogin.html')
      }
      else {
        //res.render('list.ejs', {list : rows});
        //console.log( 'select ok - ' + sql);
        //for(var i=0; i<rows.length; i++){ console.log(i+':i / '+rows[i].username +'-'+ rows[i].CTP_address +'-'+ rows[i].id +'-'+ rows[i].nick); }
        if(rows.length>0){
          user_id     = rows[0].id;
          user_nick   = rows[0].nick;
          user_avata  = rows[0].avata;
          user_level  = rows[0].user_level;
          user_CTP_address= rows[0].CTP_address;
          console.log('유저레벨:'+user_level);
          user_ip = req.headers['x-forwarded-for'] ||req.connection.remoteAddress ||req.socket.remoteAddress ||req.connection.socket.remoteAddress;
        //   intervalLvUpFunc();
          var sql2 = " "; 
          sql2 = sql2 + " INSERT INTO `tbl_game`(`game_idx`, `user_idx`, `user_coin`, `coin_address`, `yyyymmdd`, `ip`) ";
          sql2 = sql2 + " VALUES (2,?,'CTP',?,CURDATE()+0,?) ";
          sql2 = sql2 + " ON DUPLICATE KEY UPDATE minuteCnt = minuteCnt + 1, last_time=now() "; //무조건 +1 되는 버그로 Merge 문 X 
          var params = [rows[0].id, rows[0].CTP_address, user_ip];
          conn.query(sql2, params, function(err, rows2, fields2){
            if(err){
              console.log(err);
              //conn.release();
            } else {
              console.log('merge success !!!!');
              // console.log(rows2);
              //conn.release();
            }
          });
          // login 성공
        //   res.writeHead("200", {"Content-Type":"text/html;charset=utf-8"});
        //   res.end(indexPage(user_id,user_nick,user_avata,user_level)); 
            res.writeHead("200", {"Content-Type":"text/html;charset=utf-8"});
            res.end("<script>document.location.href='/';</script>"); 
        }else{
          res.writeHead("200", {"Content-Type":"text/html;charset=utf-8"});
          res.end("<script>alert('password maybe wrong');document.location.href='/';</script>"); 
        //   res.sendFile(STATIC_PATH + '/ulogin.html')
        }
      }
    });
  })


////#endregion  ######### 2021-01-01 mod user login end #########


//handling sessions
const sessionRouter = require('./routes/session');
app.use('/session', sessionRouter);

// Starts the server.
server.listen(port, function () {
    console.log(`Starting server on port ${port}`);
});

// 404 pages
app.use(function (req, res) {
    res.status(404).render('pages/404');
});

