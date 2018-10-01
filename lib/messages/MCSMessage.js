'use strict';

const Transaction = require('./transaction');

/**
 * Base message for the MCS API
 * @memberof module:mcs-js
 */
class MCSMessage extends Transaction {
  /**
   * Creates a MCSMessage
   * @param  {String} [name] The name of the message
   * @param  {Object} [body] The body of the message
   */
  constructor (name, body, params = {}) {
    const { transactionId } = params;
    super(transactionId);
    this._name = name || this.constructor.name.charAt(0).toLowerCase() +
      this.constructor.name.slice(1);
    console.log("Name: ", name);
    console.log("this name: ", this._name);
    this.version = "0.0.1-dev";
    this.timestamp = 0;
    this.body = body || {};
  }

  set name (value) {
    this._name = value;
  }

  get name () {
    return this._name;
  }
}

module.exports = MCSMessage;
