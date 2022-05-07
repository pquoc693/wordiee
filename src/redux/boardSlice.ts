import { createSlice } from "@reduxjs/toolkit";
import wordList from '../words.json'
const randomNum = Math.floor(Math.random() * wordList.words.length)

const initialState = {
  board: [
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
  ],
  pos: 0,
  row: 0,
  key: "",
  correctWord: wordList.words[randomNum].toUpperCase()
}


export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload
    },
    incPos: (state) => {
      state.pos += 1
    },
    decPos: (state) => {
      state.pos -= 1
    },
    incRow: (state) => {
      state.row += 1
    },
    setKey: (state, action) => {
      state.key = action.payload
    },
  }
})

const { actions, reducer } = boardSlice

export const { setBoard, incPos, decPos, incRow, setKey } = actions

export default reducer