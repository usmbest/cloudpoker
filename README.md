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
redis 윈도우 버전은 3ㅇ로 종료 stream 은 버전 5부터
윈도우 서브 시스템 에 설치중 
------
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
tar xzf redis-5.0.5.tar.gz
cd redis-5.0.5
sudo apt-get install make
sudo apt-get update
sudo apt-get install gcc
cd deps
make hiredis jemalloc linenoise lua geohash-int
cd ..
make
src/redis-server
------ or ------
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
restarting tables with sids: []
playerIdFromRequest nnADQ6rWhE
initialized seed for test to 137a20a6-6741-4c2b-8d6d-b1319eff53bd
test buys in for 1000
transferring host to test (pid: nnADQ6rWhE) because modIds is empty
D:\pokerSrc\cloudpoker\server\node_modules\redis-parser\lib\parser.js:180
    return new ReplyError(string)
           ^

ReplyError: EXECABORT Transaction discarded because of previous errors.
    at parseError (D:\pokerSrc\cloudpoker\server\node_modules\redis-parser\lib\parser.js:180:12)
    at parseType (D:\pokerSrc\cloudpoker\server\node_modules\redis-parser\lib\parser.js:303:14) {
  command: 'EXEC',
  code: 'EXECABORT',
  errors: [
    ReplyError: ERR unknown command 'xadd'
        at parseError (D:\pokerSrc\cloudpoker\server\node_modules\redis-parser\lib\parser.js:180:12)
        at parseType (D:\pokerSrc\cloudpoker\server\node_modules\redis-parser\lib\parser.js:303:14) {
      command: 'XADD',
      args: [
        '7R_BJDAGy:none:stream',
        '*',
        'type',
        'playerState',
        'playerName',
        'test',
        'inHand',
        false,
        'standingUp',
        false,
        'chips',
        1000,
        'isMod',
        false,
        'isStraddling',
        false,
        'seat',
        0,
        'seed',
        '137a20a6-6741-4c2b-8d6d-b1319eff53bd'
      ],
      code: 'ERR',
      position: 0
    }
  ]
}

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

