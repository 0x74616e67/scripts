const abi = require("./contract/checkBalance/abi.json")
const { conflux } = require('./utils')

const address = '0x8f35930629fce5b5cf4cd762e71006045bfeb24d'
const accounts = []
const tokens = []

const contract = conflux.Contract({ abi, address, })

const fn = async () => {
  const resp = await contract.balances(accounts, tokens).call()

  console.log('resp: ', resp)
}

fn()