import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StorySettingsState, StorySettingTypes } from "@/types/types";

const initialState: StorySettingsState = {
  storySettings: [],
};

export const storySettingSlice = createSlice({
  name: "storySettings",
  initialState,
  reducers: {
    setStorySetting: (state, action: PayloadAction<StorySettingTypes>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        storySettings: [...state.storySettings, action.payload],
      };
    },
    removeStorySetting: (state, action: PayloadAction<string>) => {
      return {
        storySettings: state.storySettings.filter((storySetting) => storySetting.id !== action.payload),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStorySetting, removeStorySetting } = storySettingSlice.actions;

export default storySettingSlice.reducer;
