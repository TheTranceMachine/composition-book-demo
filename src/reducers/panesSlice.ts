import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid"
import { uniqueObjectsById } from '@utils/utils'
import { FileDataType, PaneTypes, TabTypes } from '@/types/types';

const initialState = [
  {
    id: uuidv4(),
    order: 1,
    active: true,
    tabs: [{ active: true, id: uuidv4(), name: "Pane Manager", children: [] }],
  },
];

export const panesSlice = createSlice({
  name: 'panes',
  initialState,
  reducers: {
    addPane: (state, action: PayloadAction<PaneTypes>) => {
      return [...state, action.payload]
    },
    removePane: (state, action: PayloadAction<string>) => {
      return state.filter((pane) => pane.id !== action.payload)
    },
    shiftPanes: (state, action: PayloadAction<number>) => {
      return state.map((pane) => (pane.order > action.payload ? { ...pane, order: pane.order + 1 } : pane))
    },
    setPaneOrder: (state) => {
      return state.sort((a, b) => a.order - b.order)
    },
    setPaneActive: (state, action: PayloadAction<string>) => {
      return state.map((pane) => pane.id === action.payload ? { ...pane, active: true } : { ...pane, active: false })
    },
    addTab: (state, action: PayloadAction<FileDataType>) => {
      return state.map((pane) => pane.active ? { ...pane, tabs: uniqueObjectsById<FileDataType>([...pane.tabs, action.payload]) } : pane)
    },
    removeTab: (state, action: PayloadAction<string>) => {
      return state.map((pane) => pane.active ? { ...pane, tabs: pane.tabs.filter((tab) => tab.id !== action.payload) } : pane)
    },
    setTabActive: (state, action: PayloadAction<{ paneId: string, tabId: string }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            tabs: pane.tabs.map((tab) =>
              tab.id === action.payload.tabId ? { ...tab, active: true } : { ...tab, active: false }
            ),
          }
          : pane
      )
    },
    updateTab: (state, action: PayloadAction<{ paneId: string, tabId: string, name: string }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            tabs: pane.tabs.map((tab) =>
              tab.id === action.payload.tabId ? { ...tab, name: action.payload.name } : tab
            ),
          }
          : pane
      )
    },
    updateTabContent: (state, action: PayloadAction<{ paneId: string, tabId: string, content: string }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            tabs: pane.tabs.map((tab) =>
              tab.id === action.payload.tabId ? { ...tab, content: action.payload.content } : tab
            ),
          }
          : pane
      )
    },
    sortTabs: (state, action: PayloadAction<{ paneId: string, tabs: TabTypes[] }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId ? { ...pane, tabs: action.payload.tabs } : pane
      )
    },
  },
})

export const {
  addPane,
  removePane,
  shiftPanes,
  setPaneOrder,
  setPaneActive,
  addTab,
  removeTab,
  setTabActive,
  updateTab,
  updateTabContent,
  sortTabs,
} = panesSlice.actions

export default panesSlice.reducer