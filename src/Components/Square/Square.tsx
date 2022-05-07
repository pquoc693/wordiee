import { MotionConfig } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './square.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { rootState } from '../interface'
import { MAX_LETTER } from '../../untils/contant'
import wordList from '../../words.json'

interface Props {
  square: string,
  squareIdx: number
}

export const Square: React.FC<Props> = (props) => {
  const { square, squareIdx } = props
  const { correctWord, pos, row } = useSelector((state: rootState) => state.board)
  const [correct, setCorrect] = useState<Boolean>(false)
  const [almost, setAlmost] = useState<Boolean>(false)
  const [wrong, setWrong] = useState<Boolean>(false)
  const variants = {
    filled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2
      }
    }),
    unfilled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2
      }
    })
  }

  const position = (pos - 1) % 5

  useEffect(() => {
    if (correctWord[position] === square) {
      setCorrect(true)
    } else if (!correct && square !== "" && correctWord.includes(square)) {
      setAlmost(true)
    } else if (!correct && square !== "" && !correctWord.includes(square)) {
      setWrong(true)
    }
    return () => {
      setCorrect(false)
      setAlmost(false)
      setWrong(false)
    }
  }, [square])

  const status = Math.floor(squareIdx / 5) < row ? (correct ? 'correct' : almost ? 'almost' : wrong ? 'wrong' : '') : ''

  return (
    <motion.div animate={square ? 'filled' : 'unfilled'} variants={variants}>
      <div className='square' id={status}>{square}</div>
    </motion.div>
  )
}
