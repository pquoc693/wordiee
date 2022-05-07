import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decPos, incRow, setBoard } from '../../redux/boardSlice'
import { MAX_LETTER, MIN_LETTER } from '../../untils/contant'
import { rootState } from '../interface'
import { Key } from '../Key/Key'
import wordList from '../../words.json'
import './keyboard.css'

interface Props {
  q: number
}

export const Keyboard: React.FC = () => {
  const rows: string[] = ['q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m']
  const { board, pos, row, correctWord } = useSelector((state: rootState) => state.board)
  const dispatch = useDispatch()
  const currRow = Math.floor(pos / 5)

  const wordCurrRow: string = `${board[pos - 5]}${board[pos - 4]}${board[pos - 3]}${board[pos - 2]}${board[pos - 1]}`

  const clickBack = () => {
    if (pos <= MIN_LETTER) return
    if (pos - 1 < row * 5) return
    const newBoard = [...board]
    newBoard[pos - 1] = ''
    dispatch(setBoard(newBoard))
    dispatch(decPos())
  }

  const clickEnter = () => {
    if (wordList.words.includes(wordCurrRow.toLocaleLowerCase())) {
      if (pos % 5 === 0 && pos !== 0 && currRow !== row) {
        console.log('wordCurrRow', wordCurrRow, correctWord)
        dispatch(incRow())
      }
    } else {
      alert('Invalid word')
    }

    if (pos === MAX_LETTER && wordList.words.includes(wordCurrRow.toLocaleLowerCase())) {
      alert('Correct word is: ' + correctWord)
    }
  }
  return (
    <div className='keyboard-container'>
      {
        rows.map((row, idx) => (
          <div key={idx} className='row'>
            {idx === 2 ? <span className='letter' onClick={clickEnter}>Enter</span> : null}
            {row.split(' ').map((key, index) => (
              <React.Fragment key={index}>
                <Key letter={key.toUpperCase()} />
                {key === 'm' ? <span className='letter' onClick={clickBack}>Back</span> : null}
              </React.Fragment>
            ))}
          </div>))
      }
    </div>
  )
}
