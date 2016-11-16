// ================================================================================
//  setting
// ================================================================================

var isCaptureImage = false;
var isDebug = false;

if (isDebug) {
    var casper = require('casper').create({
        logLevel: "debug",
        verbose: true
    });
}
else {
    var casper = require('casper').create({
        logLevel: "info",
        verbose: false
    });
}


// ================================================================================
//  start
// ================================================================================
phantom.injectJs('/var/www/browser-test-wms-api-tool/core/bootstrap.js'); // 必須使用絕對路徑
var URL = getConfig().system.base_url;

if (!casper.cli.args || !casper.cli.args[0]) {
    echo('Notice: you need input script.');
    exit();
}


// ================================================================================
//  login
// ================================================================================

//
casper.start(URL, function() {
    // echoInfo(this);
});
casper.then(captureImageFunc('w1-url.png'));


//
casper.then(function() {
    this.thenEvaluate(function(config) {
        $('input[name="account"]').val(config.system.account);
        $('input[name="password"]').val(config.system.pwd);
        $('form button[type="submit"]').click();
    }, getConfig());
});
casper.then(captureImageFunc('w2-login.png'));


// ================================================================================
//  script
// ================================================================================
var script = casper.cli.args[0];
var items = require(getProjectPath('/src') + '/' + script);
for (var i = 0; i < items.length; i++) {
    var json = items[i];
    // utils.dump(json);

    if (!json || !json.api || !json.method || !json.data) {
        console.log('Error: script data index = ' + i);
        exit();
    }
    
    casper.then(createApiCallFunc(json));
    casper.then(createApiResponseFunc());
}


// ================================================================================
//  error event
// ================================================================================
casper.on('http.status.404', function(resource) {
    console.log("---- http error ----");
    this.echo('url error 404:');
    resource.headers = undefined;
    utils.dump(resource);
    this.die('error');
});
casper.on('complete.error', function(err) {
    console.log("---- complete error ----");
    utils.dump(err);
    this.die(err);
});
casper.on('cresource.error', function(err) {
    console.log("---- resource error ----");
    utils.dump(err);
    this.die(err);
});
casper.on("page.error", function(msg, trace) {
    console.log("---- page error ----");
    utils.dump(msg);
    utils.dump(trace);
    this.die(err);
    //this.echo(msg, "ERROR");
});
casper.on('step.error', function(err) {
    console.log("---- step error ----");
    utils.dump(err);
    this.die(err);
});


// ================================================================================
//
// ================================================================================
casper.run(function() {
    this
        .echo('Done')
        .exit();
});


// ================================================================================
//
// ================================================================================

/**
 *  create "API call" function()
 */
function createApiCallFunc(json)
{
    return function() {
        var url = getApi(json.api);
        var requestString = JSON.stringify(json.data);

        // requestString = '';
        // console.log('-> ' + url);
        // console.log(requestString);

        // var headers = {
        //     'Accept': 'application/json',
        //     'Content-type': 'application/json'
        //     // or 'Content-type': 'application/x-www-form-urlencoded'
        // };

        this.open(url, {
            method: json.method,
            data: requestString,
            headers: json.headers
        });
    };
}

/**
 *  create "API response" function()
 */
function createApiResponseFunc()
{
    return function() {
        var status = this.status().currentHTTPStatus;
        var statusStyle = getStatusColor(status);
        var url = this.getCurrentUrl();
        this.echo(this.colorizer.format(status, statusStyle) + ' ' + url );


        // 如果你能確定回傳的是 ajax json
        var resultText = this.getPlainText();
        var json = JSON.parse(resultText);
        if (json.error) {
            console.log("[error]");
            utils.dump(json);
            this.exit();
            return;
        }
        else {
            utils.dump(json);
        }
    };
}

/**
 *  截圖 function()
 */
function captureImageFunc(name)
{
    return function() {
        if (!isCaptureImage) {
            return;
        }
        this.capture(getTemp("/" + name))
    };
}

/**
 *  取得 api 完整路徑
 */
function getApi(url)
{
    return URL + url;
}

/**
 *  取得 this.echo() 所需要的顏色配製
 *
 *  @param status
 *  @return json
 */
function getStatusColor(status)
{
    var statusStyle = {
        fg: 'magenta',
        bold: true
    };
    switch(status) {
        case 200:
            statusStyle.fg = 'green';
            break;
        case 404:
            statusStyle.fg = 'red';
            break;
    }

    return statusStyle;
}

