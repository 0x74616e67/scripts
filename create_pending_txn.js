// import Conflux Class
const { Conflux, Drip } = require("js-conflux-sdk");

const PRIVATE_KEY = ""; // sender private key
const ADDRESS_FROM = "";
const ADDRESS_TO = "";
const RPC = "https://testnet-scantest.confluxnetwork.org/rpcv2";

const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time || 15 * 1000));

// initialize a Conflux object
const conflux = new Conflux({
  url: RPC, // testnet provider
  // logger: console, // for debug: this will log all the RPC request and response to console
  networkId: 1,
});

const sender = conflux.wallet.addPrivateKey(PRIVATE_KEY);

const run = async () => {
  const status = await conflux.getStatus();
  console.log("conflux status: ", status);

  conflux
    .sendTransaction({
      from: ADDRESS_FROM,
      to: ADDRESS_TO,
      value: Drip.fromCFX(3),
      nonce: 55, // need to change
    })
    .then(async (hash) => {
      console.log("hash of mistake nonce: ", hash);

      // you might need wait seconds here...
      await sleep();

      const transaction = await conflux.getTransactionByHash(hash);
      console.log(transaction); // get transaction from remote
    });

  conflux
    .sendTransaction({
      from: ADDRESS_FROM,
      to: ADDRESS_TO,
      value: Drip.fromCFX(2000),
    })
    .then(async (hash) => {
      console.log("hash of lacking balance: ", hash);

      // you might need wait seconds here...
      await new Promise((resolve) => setTimeout(resolve, 15 * 1000));

      const transaction = await conflux.getTransactionByHash(hash);
      console.log(transaction); // get transaction from remote
    });
};

const getPendingTxns = async (address) => {
  const pendingTxns = await conflux.getAccountPendingTransactions(
    address,
    "0x0",
    "0x10"
  );
  console.log("pending txns: ", pendingTxns);
};

run();

// getPendingTxns(ADDRESS_FROM);
