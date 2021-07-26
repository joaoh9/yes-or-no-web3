import { useState } from 'react'

import Web3 from 'web3'
import getRpcUrl from '../utils/getRpcUrl'

async function getWeb3() {
  let web3Provider

  if (window.ethereum) {
    web3Provider = window.ethereum
    try {
      // Request user authorization
      await window.ethereum.enable()
    } catch (error) {
      // When the user is not authorized
      console.error('User denied account access')
    }
  } else if (window.web3) {
    // Old MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider
  } else {
    console.log('no ethereum found on page')
    web3Provider = new Web3.providers.HttpProvider(getRpcUrl())
  }
  const web3js = new Web3(web3Provider) // web3js is the web3 instance you need

  return web3js
}

export default getWeb3
