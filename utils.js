const { Conflux } = require("js-conflux-sdk");

const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time || 15 * 1000));

const PRIVATE_KEY = ""; // sender private key
const ADDRESS_FROM = "";
const ADDRESS_TO = "";
const RPC = '';

// initialize a Conflux object
const conflux = new Conflux({
  url: RPC, // testnet provider
  // logger: console, // for debug: this will log all the RPC request and response to console
  networkId: 1,
});

const sender = conflux.wallet.addPrivateKey(PRIVATE_KEY);

module.exports = {
  sleep,
  conflux,
  sender
}