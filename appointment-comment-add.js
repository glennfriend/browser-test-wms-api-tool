
var data = [
    {
        "api": "/crmAms/appointmentCommentAjax/add",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        "data": {
            'appointment_id': '1',
            'content': "hello A " + getRandomInt(1, 9)
        }
    },
    {
        "api": "/crmAms/appointmentCommentAjax/add",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        "data": {
            'appointment_id': '1',
            'content': "hello B " + getRandomInt(10, 100)
        }
    }
]

// debug only
// showContents(data);

module.exports = data;

// --------------------------------------------------------------------------------
//  
// --------------------------------------------------------------------------------
/**
 *
 */
function getRandomInt(min, max)
{ 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

/**
 *
 */
function showContents(data)
{
    var fs = require('fs');
    for (var i = 0; i < data.length; i++) {
        var pretty = JSON.stringify(data, null, 4);
        console.log('index[' + i + ']');
        console.log(pretty);
    }
}
