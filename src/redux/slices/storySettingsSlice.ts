import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StorySettingTypes } from '@/types/types';

export type StorySettingsState = {
  selectedStorySetting: StorySettingTypes;
  storySettings: StorySettingTypes[];
}

const initialState: StorySettingsState = {
  selectedStorySetting: {} as StorySettingTypes,
  storySettings: []
}

export const storySettingSlice = createSlice({
  name: 'storySettings',
  initialState,
  reducers: {
    setStorySetting: (state, action: PayloadAction<StorySettingTypes>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        selectedStorySetting: action.payload,
        storySettings: [...state.storySettings, action.payload],
      }
    },
    removeStorySetting: (state, action: PayloadAction<string>) => {
      return {
        selectedStorySetting: {} as StorySettingTypes,
        storySettings: state.storySettings.filter((storySetting) => storySetting.id !== action.payload),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStorySetting, removeStorySetting } = storySettingSlice.actions

export default storySettingSlice.reducer