
var utils = require('utils');

phantom.injectJs(getProjectPath('/core/helper.js'));


/**
 *
 */
function getProjectPath(extendPath)
{
    var basePath = ROOT;
    if (extendPath) {
        return basePath + extendPath;
    }
    return basePath;
}
