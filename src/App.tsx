import React from 'react'
import * as bsc from '@binance-chain/bsc-use-wallet'

import getRpcUrl from './utils/getRpcUrl'

import Question from './Question'

function App() {
  const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID || '1')
  const rpcUrl = getRpcUrl()

  return (
    <div>
      <bsc.UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl },
          bsc,
        }}
      >
        <Question />
      </bsc.UseWalletProvider>
    </div>
  )
}
export default App
