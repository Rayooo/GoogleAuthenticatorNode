var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: 'JustSecretKey' });
var shell = require('shelljs');

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(7777);

handler.on('error', function (err) {
    console.error('Error:', err.message)
});

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);

    shell.cd("~/GoogleAuthenticatorNode");

    shell.exec("git reset --hard");

    shell.exec("git pull");

    shell.exec("npm install");

    shell.cd("~/GoogleAuthenticatorNode/bin");

    shell.sed('-i', '3000', '80', 'www');

    //使用nodemon不用重启node
    // shell.exec("nodejs ~/GoogleAuthenticatorNode/bin/www");

    console.log("Start Node at" + new Date());
});

handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
});