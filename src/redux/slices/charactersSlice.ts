import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharactersState, CharacterTypes } from '@/types/types';

const initialState: CharactersState = {
  characters: [],
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<CharacterTypes>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        characters: [...state.characters, action.payload],
      }
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      return {
        characters: state.characters.filter((character) => character.id !== action.payload),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCharacter, removeCharacter } = charactersSlice.actions

export default charactersSlice.reducer