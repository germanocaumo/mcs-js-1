'use strict';

const MCSMessage = require('./MCSMessage');

class Join extends MCSMessage {
  constructor(room_id, type, params) {
    super("Join");
    this.body.room_id = room_id;
    this.body.type = type;
    this.body.params = params;
  }
}

module.exports = Join;
