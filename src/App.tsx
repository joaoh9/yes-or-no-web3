import React, { useState } from 'react'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { useMoralis } from 'react-moralis'

import getRpcUrl from './utils/getRpcUrl'

import Question from './Question'

function App() {
  const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID || '1')
  const rpcUrl = getRpcUrl()

  const User = () => {
    const { authenticate, isAuthenticated, user: userMoralis } = useMoralis()

    if (!isAuthenticated || userMoralis._objCount === 0) {
      return (
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            style={{
              color: 'blue',
            }}
            type="button"
            onClick={() => authenticate()}
          >
            Connect Wallet
          </button>
        </div>
      )
    }

    return (
      <div>
        <span
          style={{
            marginTop: '10px',
            color: 'green',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Wallet connected
        </span>
      </div>
    )
  }

  return (
    <div>
      <bsc.UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl },
          bsc,
        }}
      >
        <User />
        <Question />
      </bsc.UseWalletProvider>
    </div>
  )
}
export default App
