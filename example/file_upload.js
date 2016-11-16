// ================================================================================
//  
// ================================================================================
var url = 'https://localhost/uploadFile';
casper.start(url);
console.log(url);

casper.then(function() {

    this.page.uploadFile('#file-upload input[type='file']', '/home/prateek/Download/happy.gif'

    var headers = {
        'Content-type': 'multipart/form-data'
    };

    // var headers = {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json'
    //     // or 'Content-type': 'application/x-www-form-urlencoded'
    // };

    this.open(url, {
        method: 'POST',
        headers: headers
    });
});

casper.then(function() {
    var status = this.status().currentHTTPStatus;
    var url = this.getCurrentUrl();
    this.echo( status );
    this.echo( url );
    this.echo( this.getPlainText() );
});

casper.run(function() {
    this
        .echo('Done')
        .exit();
});
