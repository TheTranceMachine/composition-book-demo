import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './reducers/charactersSlice'
import storySettingsReducer from './reducers/storySettingsSlice'
import panesReducer from './reducers/panesSlice'
import fileExplorerReducer from './reducers/fileExplorerSlice'
import editorReducer from './reducers/editorSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    storySettings: storySettingsReducer,
    panes: panesReducer,
    fileExplorer: fileExplorerReducer,
    editor: editorReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch