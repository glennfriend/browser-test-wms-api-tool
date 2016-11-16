### 前置作業
```
    確認版本
        https://bitbucket.org/ariya/phantomjs/downloads/

    安裝必要套件
        sudo apt-get update
        sudo apt-get install build-essential g++ flex bison gperf ruby perl \
                libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev \
                libpng-dev libjpeg-dev
```

#### install casperjs & phantomjs

    安裝方法很多
    這裡提供以 nodejs 為主的安裝方式

    sudo apt-get update
    sudo apt-get install nodejs nodejs-legacy

    mkdir -p /usr/developer-tool/casperjs 
    cd /usr/developer-tool/casperjs
    
    npm install phantomjs
    sudo ln -s /usr/developer-tool/casperjs/node_modules/phantomjs/bin/phantomjs  /usr/bin/phantomjs
    phantomjs -v

    npm install casperjs
    sudo ln -s /usr/developer-tool/casperjs/node_modules/casperjs/bin/casperjs  /usr/local/bin/casperjs
    casperjs --version

#### install first
```sh
mkdir var
chmod 777 var
cp config/config.example.json config/config.json
vi config/config.json
```

#### try
```sh
cd src
casperjs --ignore-ssl-errors=true ../core/core.js test.js 
```

#### casperjs 參數

    --ignore-ssl-errors=true
        忽略 certificate 的問題

