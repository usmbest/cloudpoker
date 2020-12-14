# cloudpoker

[cloudpoker.io](https://cloudpoker.io) is a fully functional poker server built on React and Node.js with Socket.io.


npm i redis-server
npm -g uninstall redis-server

C:\nodejs\node.exe .\server\src\index.js


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