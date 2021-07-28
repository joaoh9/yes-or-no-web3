import React, { useState, useEffect, useRef } from 'react'
import { useMoralis, useNewMoralisObject, useMoralisQuery } from 'react-moralis'

import questions from './questions'

interface CurrentQuestion {
  question: string
  optionA: string
  optionB: string
}

const centerColumn = {
  display: 'flex',
  'flex-direction': 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const centerRow = {
  display: 'flex',
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const Question: React.FC = () => {
  const [index, setIndex]: [number, any] = useState(0)
  const [question, setQUestion]: [CurrentQuestion, any] = useState(questions[0])

  const nextQuestion = () => {
    // if (questions.length - 1 > index + 1) {
    setIndex(index + 1)
    setQUestion(questions[index + 1])
    // }

    // alert('Congratulations! You answered all questions coorectly!')
  }

  const SaveQuestion = ({ answer, leftSide }: { answer: string; leftSide: boolean }) => {
    const { isSaving, error, save } = useNewMoralisObject('Answers')
    const { isAuthenticated, user: userMoralis } = useMoralis()

    if ((!isAuthenticated || userMoralis._objCount === 0) && leftSide) {
      return (
        <div>
          <span>Please connect your wallet to answer the questions!</span>
        </div>
      )
    }

    if ((!isAuthenticated || userMoralis._objCount === 0) && !leftSide) {
      return <div />
    }

    const userAccount = isAuthenticated ? userMoralis.attributes.accounts[0] : 'null'

    return (
      <div>
        {error && <p>{error} </p>}

        <button
          type="button"
          style={leftSide ? { marginRight: '10px' } : { marginLeft: '10px' }}
          onClick={() => {
            save({
              question: question.question,
              answer,
              questionNumber: index,
              address: userAccount,
            })
            nextQuestion()
          }}
          disabled={isSaving}
        >
          {answer}
        </button>
      </div>
    )
  }

  return (
    <div style={centerColumn}>
      <h1>Hot or not?</h1>
      <span style={{ color: 'grey' }}>Pick what you prefer!</span>
      <h2>{question.question}</h2>
      <div style={{ ...centerRow, marginTop: '10px' }}>
        <SaveQuestion leftSide answer={question.optionA} />
        <SaveQuestion leftSide={false} answer={question.optionB} />
      </div>
    </div>
  )
}

export default Question
