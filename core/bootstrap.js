
var ROOT = '/var/www/browser-test-wms-api-tool';
var utils = require('utils');

phantom.injectJs(getProjectPath('/core/helper.js'));


/**
 *
 */
function getProjectPath(path)
{
    var basePath = ROOT;
    if (path) {
        return basePath + path;
    }
    return basePath;
}
