var mcs = require('../index');

var _port = 8082;
const _host = 'localhost';
const _timeout = 2000;

exports.join = function (test) {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(function () {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', function (rclient) {
    rclient.on('join', function (args){
      test.ok(true, 'Join is working');
      test.done();
      server.closeConnection();
      client.closeConnection();
    });
  });

  client.on('open', function () {
    client.join('1','Joao','MCU');
  });
}

exports.joinJoined = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('join', (args) => {
      rclient.joined('abcd1234');
    });
  });

  client.on('open', () => {
    client.join('1','Joao', {});

    client.on('joined', (args) => {
      test.ok(true, 'Joined is working');
      test.done();
      server.closeConnection();
      client.closeConnection();
    });
  });
}

exports.leave = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('leave', (args) => {
      test.ok(true,'leave is working');
      client.closeConnection();
      server.closeConnection();
      test.done();
    })
  });

  client.on('open', () => {
    client.leave('1');
  });
}

exports.leaveLeft = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('join', (args) => {
      rclient.joined('abcd1234');
    })
  });

  client.on('open', () => {
    client.join('1','Joao', {});
    client.on('joined', (args) => {
      test.ok(true,'joined is working');
      client.closeConnection();
      server.closeConnection();
      test.done();
    })
  });
}

exports.publishAndSubscribe = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('publishandsubscribe', (args) => {
      test.ok(true,'publishAndSubscribe is working', args);
      test.done();
    })
  });

  client.on('open', () => {
    client.publishAndSubscribe('MEDIA_1','AUDIO_AND_VIDEO',{});
  });
}

exports.unpublishAndUnsubscribe = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    client.closeConnection();
    server.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('unpublishandsubscribe', (args) => {
      test.ok(true,'publishAndSubscribe is working', args);
      test.done();
    })
  });

  client.on('open', () => {
    client.unpublishAndUnsubscribe('MEDIA_1','AUDIO_AND_VIDEO',{});
  });
}

exports.joinArgs = function (test) {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port++);

  setTimeout(function () {
    test.ok(false,'Server timeout');
    test.done();
  }, _timeout);

  server.on('connection', function (rclient) {
    rclient.on('join', function (args){
      test.equals(args.room_id, '1', 'Join\'s room_id working');
      test.equals(args.user_name, 'Joao', 'Join\'s user_name working');
      test.done();
      server.closeConnection();
      client.closeConnection();
    });
  });

  client.on('open', function () {
    client.join('1','Joao','MCU');
  });
}
