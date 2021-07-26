import React, { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import getWeb3 from './hooks/getWeb3'
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

// entra na página
// conecta com o web3
// faz query pra ver se a carteira já respondeu alguma coisa
// se não respondeu, colocar na primeira pergunta
// se já respondeu, colocar na próxima pergunta

const hashSeed = process.env.REACT_APP_HASH_GUID

const Question: React.FC = () => {
  const [web3, setWeb3] = useState(new Web3())
  const refWeb3 = useRef(web3)
  const [userAccount, setUserAccount] = useState('')
  const refUserAccount = useRef(userAccount)

  useEffect(() => {
    (async () => {
      const newWeb3 = await getWeb3()
      if (newWeb3 !== refWeb3.current) {
        setWeb3(newWeb3)
        refWeb3.current = newWeb3
      }

      const newUserAccount = (await refWeb3.current.eth.getAccounts())[0]

      if (newUserAccount !== refUserAccount.current) {
        setUserAccount(newUserAccount)
        refUserAccount.current = newUserAccount
      }
    })()
  })

  const [index, setIndex]: [number, any] = useState(0)
  const [question, setQUestion]: [CurrentQuestion, any] = useState(questions[0])

  const nextQuestion = () => {
    setIndex(index + 1)
    setQUestion(questions[index + 1])
  }

  const Vote = async (answer: string) => {
    const data = {
      question: question.question,
      answer,
      questionNumber: index,
      address: userAccount,
      answerTimestamp: new Date().getTime(),
    }

    const signedData = await web3.eth.personal.sign(JSON.stringify(data), userAccount, 'a')
    console.log('🚀 ~ file: Question.tsx ~ line 34 ~ Vote ~ signedData', signedData)

    const recoveredData = await web3.eth.personal.ecRecover('data', signedData)
    console.log('🚀 ~ file: Question.tsx ~ line 37 ~ Vote ~ recoveredData', recoveredData)
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
        <button style={{ marginRight: '10px' }} type="button" onClick={() => Vote(question.optionA)}>
          {question.optionA}
        </button>
        <button style={{ marginLeft: '10px' }} type="button" onClick={() => Vote(question.optionB)}>
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
