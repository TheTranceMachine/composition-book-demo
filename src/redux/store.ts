import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";
import storySettingsReducer from "./slices/storySettingsSlice";
import panesReducer from "./slices/panesSlice";
import fileExplorerReducer from "./slices/fileExplorerSlice";
import editorReducer from "./slices/editorSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      characters: charactersReducer,
      storySettings: storySettingsReducer,
      panes: panesReducer,
      fileExplorer: fileExplorerReducer,
      editor: editorReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
