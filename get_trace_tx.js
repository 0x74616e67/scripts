const { format } = require("js-conflux-sdk");
const { conflux } = require('./utils')
const { tracesInTree } = require('js-conflux-sdk/src/util/trace');

const txHash = ''
const txBlock = ''

const fn = async () => {
  try {
    // const trace = await conflux.traceBlock(txBlock);
    // console.log("trace======>", JSON.stringify(trace));

    const resp = await conflux.traceTransaction(format.transactionHash(txHash))
    const data = tracesInTree(resp)

    console.log('resp: ', resp)
    console.log('data: ', data.calls[0].result)
  } catch (e) {
    console.log('error: ', e)
  }
}

fn()