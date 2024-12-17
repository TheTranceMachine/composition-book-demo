import { Selection } from "monaco-editor";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditorTypes } from "@/types/types";

const initialState: EditorTypes = {
  editorCurrentSelection: "",
  editorSelectionRange: {} as Selection,
  editorEnhancedSelection: "",
  editorEnhancementCount: 0,
};

export const panesSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorEnhancedSelection: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        editorEnhancedSelection: action.payload,
      };
    },
    setEditorSelectionRange: (state, action: PayloadAction<Selection>) => {
      return {
        ...state,
        editorSelectionRange: action.payload,
      };
    },
    setEditorCurrentSelection: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        editorCurrentSelection: action.payload,
      };
    },
  },
});

export const { setEditorEnhancedSelection, setEditorCurrentSelection, setEditorSelectionRange } = panesSlice.actions;
export default panesSlice.reducer;
