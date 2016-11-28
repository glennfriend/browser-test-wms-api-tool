// store_schedule_date_id "10" is "2016-08-27"

var data = [
    {
        "api": "/crmAms/appointmentAjax/add",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        "data": {
            "appointment": {
                "store_id":                 1,
                "customer_id":              14680,
                "consultant_user_id":       3,
                "store_schedule_date_id":   10,
                "service_type":             1,
                "hear_via":                 2,
                "is_show":                  0,
                "is_complete":              0,
                "check_status":             0,
                "wedding_date":             "2016-06-01",
                "schedule_order":           0,
                "schedule_time_start":      "0900",
                "first_name":               "my first name",
                "last_name":                "my last name",
                "phone_number":             "1111111111",
                "call_number":              "2222222222",
                "customer_public_note":     "public message 1",
                "apprx_size":               "20",
                "how_many_guest":           "5",
                "bride_name":               "美麗的新娘",
                "tuxedo_lead":              "1",
                "try_on":                   "2",
            },
            "appointment_comment": {
                "content": "comment " + getRandomInt(1, 100),
            },
            "appointment_comment_attachment": {
                "uuid": "6e5dcc2f-fdf0-56a2-913e-a1c2370719fc",
            },
        },
    },
];

// debug only
// utils.dump(data); exit;

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
