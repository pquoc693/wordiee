import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoard, incPos } from '../../redux/boardSlice'
import { MAX_LETTER } from '../../untils/contant'
import { rootState } from '../interface'
import './key.css'

interface Props {
  letter: string
}

export const Key: React.FC<Props> = (props) => {
  const { board, pos, row } = useSelector((state: rootState) => state.board)
  const { letter } = props
  const dispatch = useDispatch()
  const currRow = Math.floor(pos / 5)

  const chooseLetter = () => {
    if (pos >= MAX_LETTER) return
    if (currRow > row) return
    const newBoard = [...board]
    newBoard[pos] = letter
    dispatch(setBoard(newBoard))
    dispatch(incPos())
  }
  return (
    <div className='letter' onClick={chooseLetter}>{letter}</div>
  )
}
