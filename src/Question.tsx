import React, { useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useWeb3 from './hooks/useWeb3'
import questions from './questions'

interface CurrentQuestion {
  question: string
  optionA: string
  optionB: string
}

const center = {
  display: 'flex',
  'flex-direction': 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const hashSeed = process.env.REACT_APP_GUID

const Question: React.FC = () => {
  const [index, setIndex]: [number, any] = useState(0)
  const [question, setQUestion]: [CurrentQuestion, any] = useState(questions[0])

  const nextQuestion = () => {
    setIndex(index + 1)
    setQUestion(questions[index + 1])
  }

  const [web3, setWeb3] = useState(useWeb3())

  const vote = (_vote: string) => {
    console.log(web3)
  }

  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  return (
    <div style={center}>
      <h1>Hot or not</h1>
      <h2>{question.question}</h2>
      <button style={{ marginRight: '10px' }} type="button" onClick={() => connect('injected')}>
        Connect
      </button>
      <div>
        <button style={{ marginRight: '10px' }} type="button" onClick={() => vote('A')}>
          {question.optionA}
        </button>
        <button style={{ marginLeft: '10px' }} type="button" onClick={() => vote('B')}>
          {question.optionB}
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button type="button" onClick={nextQuestion}>
          next
        </button>
      </div>
    </div>
  )
}

export default Question
