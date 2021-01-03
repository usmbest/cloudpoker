# cloudpoker

[cloudpoker.io](https://cloudpoker.io) is a fully functional poker server built on React and Node.js with Socket.io.


npm i redis-server
npm -g uninstall redis-server

C:\nodejs\node.exe .\server\src\index.js
---------------------------------
---------------------------------
cd D:\pokerSrc\cloudpoker
node  ./server/src/index.js
---------------------------------
---------------------------------

cd D:\pokerSrc\cloudpoker\server\src
d:
node index.js

cd D:\pokerSrc\cloudpoker\
node .\server\src\index.js

node --unhandled-rejections=strict .\server\src\index.js


node .\client\src\index.js

redis-cli -version
-----------------------------
sudo apt install redis-server
redis-cli -v
    dev@Dev:~/redis-5.0.5$ redis-cli -v
    redis-cli 5.0.7
-- Redis 서버를 다시 시작
sudo service redis-server restart
--port : 6379
--Redis 서버를 중지하려면
sudo service redis-server stop
----------------------------
D:\pokerSrc\cloudpoker>node --unhandled-rejections=strict .\server\src\index.js
Starting server on port 8080

D:\pokerSrc\cloudpoker>


/////////////////////////////////////////
---------------------------------
1. Redis 이미지 가져오기
docker pull redis
2. 신규 Container 생성, 실행
docker run --name redis-container -p 6379:6379 redis
도커 컨테이너를 자동으로 재시작하고 싶다면 아래와 같은 옵션을 추가해주세요.
docker run --name redis-container -p 6379:6379 -dit --restart unless-stopped redis
3. 컨테이너에 터미널 접속
docker exec -it redis-container /bin/bash
4. 시작/중지/재시작
docker start redis-container
docker stop redis-container
docker restart redis-container
---------------------------------

cd D:\pokerSrc\cloudpoker\
d:
node .\server\src\index.js

cd D:\pokerSrc\cloudpoker\
d:
node .\client\src\index.js

cd D:\pokerSrc\cloudpoker\server\
d:
node .\src\index.js




크로스플랫폼 환경변수 설정

dotenv 라이브러리# npm
npm i -s dotenv
# Yarn
yarn add dotenv

cd ~/cloudpoker/client
yarn build
<!-- yarn init -y
yarn add webpack webpack-cli --dev
webpack --config webpack.config.js -->

cd D:\pokerSrc\cloudpoker\
.env  --> PKR_JWT_SECRET=


----- 2020-12-27
cd /cloudpoker
node ./server/src/index.js

----- 2020-12-28
sudo apt-get update
sudo apt-get install mysql-server
sudo apt-get install mysql-client
sudo mysql_secure_installation
sudo mysql -u root -p

sudo apt-get install wine
HeidiSQL 다운로드
https://www.heidisql.com/download.php
wine HeidiSQL_11.1.0.6116_Setup.exe

============= mysql delete =============
sudo /etc/init.d/mysql stop
docker pull mysql:5.7
docker images

docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name ems_mysql mysql:5.7
docker ps -a
winpty docker exec -it ems_mysql //bin//bash
//start docker redis
alias redis-flush="docker exec -it dingrr redis-cli FLUSHALL"
docker exec -it dingrr redis-cli FLUSHALL
sudo docker stop dingrr
sudo docker start dingrr
//start docker mysql
sudo docker start ems_mysql

node ./server/src/index.js

Stack (스택) : 자신 앞에 놓여 있는 칩을 스택이라고 표현한다.
Straddle (스트레들)
스트래들이란, UTG1자리에서 첫 순서 일 때 스몰, 빅 블라인드 이외에 추가로 의무 베팅을 내는 것. 예를 들어, UTG1 플레이어가 2장의 스타팅 핸드를 받기 전 "스트래들"을 외칠 경우 앞의 블라인드를 내는 플레이어들과 함께 같이 금액을 낸다. $1/$2 블라인드 $5 스트레들. 스트래들을 하는 이유는 기본 판돈을 높이고 프리플랍에 자신에게 마지막 순서가 돌아오기 때문이다.

user_POT [stack]  = CTP * 100 
게임에 참가 하시려면 최소 1개 이상의 CTP를 보유 하셔야 합니다.


2021-01-03 ing  --> X JOIN GAME
/home/dev/cloudpoker/client/src/index.js  --> import Header from "./components/header";
/home/dev/cloudpoker/client/src/components/header.jsx --> import BuyInButton from "./buyInButton";
/home/dev/cloudpoker/client/src/components/buyInButton.jsx 에 session 값 바인딩 테스트 중
    readOnly="true" 
    <input className="u-max-full-width" name="playerName" type="text" value={this.state.playerName} onChange={this.handleInputChange} placeholder="name" min="2" max="10" id="new-playerName"/>
    <input className="u-max-full-width" name="stackSize" type="number" value={this.state.stackSize} onChange={this.handleInputChange} placeholder="stack size" min="1" id="new-stack"/>
/home/dev/cloudpoker/server/src/routes/session.js
    router.route('/:id').get(asyncErrorHandler((req, res) => {
        res.render('pages/game', {
            //2021-01-03 add 
        ,user_id:req.session.user_id  ......


/home/dev/cloudpoker/server/src/server-logic.js
    buyin(playerName, playerid, stack, isStraddling, seed) {

new-playerName jsfn_bind_user 바인딩 실패
/home/dev/cloudpoker/server/views/pages/game.ejs


