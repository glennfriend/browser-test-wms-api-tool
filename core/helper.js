
var fs = require('fs');


/**
 *
 */
function echo(data)
{
    var type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object String]':
            console.log(data);
            break;

        case '[object Array]':
            var items = [];
            for( key in data ) {
                items.push( data[key] );
            }
            content = '[' + items.join(",") + ']';
            console.log(content);
            break;

        case '[object Object]':
            var items = [];
            for( key in data ) {
                items.push( key +'='+ data[key] );
            }
            content = '{'+ items.join(",") +'}';
            console.log(content);
            break;

        default:
            console.log(type);
    }

    //this.echo(data);
}

/**
 *
 */
function echoInfo(that)
{
    echo('{');
    echo('    title = ' + that.getTitle() );
    echo('    url   = ' + that.getCurrentUrl() );
    echo('}');
}

/**
 *  列出物件所有的 keys
 *
 *  example:
 *      dumpObjectKeys(this);
 */
function dumpObjectKeys(object)
{
    var keys = [];
    for( hash in object ) {
        keys.push(hash);
    }
    console.log( keys.join(",") );
}

/**
 *
 */
function getTemp(tempFile)
{
    return getProjectPath('/var' + tempFile);
}

/**
 *  get configs
 *
 *  @depend fs
 *  @return object
 */
function getConfig()
{
    var configPath = getProjectPath('/config/config.json');
    var text = fs.read(configPath);
    return JSON.parse(text);
}

/**
 *
 */
function saveCookie()
{
    var file = getProjectPath('/var/cookie.txt');
    var cookies = JSON.stringify(phantom.cookies);
    fs.write(file, cookies, 755);
}

/**
 *  @return boolean
 */
function loadCookie()
{
    var file = getProjectPath('/var/cookie.txt');

    if (fs.exists(file)) {
        var data = fs.read(file);
        //phantom.cookies = JSON.parse(data);
        return true;
    }
    else {
        return false;
    }
}

