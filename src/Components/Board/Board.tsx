import React from 'react'
import { Keyboard } from '../Keyboard/Keyboard'
import { Square } from '../Square/Square'
import './board.css'

interface Props {
  board: string[]
}

export const Board: React.FC<Props> = (props) => {
  const { board } = props
  return (
    <>
      <div className='board'>
        {board.map((square, idx) => (
          <div key={idx}>
            <Square square={square} squareIdx={idx} />
          </div>
        ))}
      </div>
      <div className="keyboard">
        <Keyboard />
      </div>
    </>
  )
}
