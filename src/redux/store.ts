import { configureStore } from "@reduxjs/toolkit";
import panesReducer from "./slices/panesSlice";
import fileExplorerReducer from "./slices/fileExplorerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      panes: panesReducer,
      fileExplorer: fileExplorerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
