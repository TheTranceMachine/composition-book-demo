import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid"
import { uniqueObjectsById } from '@utils/utils'
import { FileDataType, PaneTypes, TabTypes } from '@/types/types';

const initialState: PaneTypes[] = [
  {
    id: uuidv4(),
    order: 1,
    active: true,
    tabs: [{ active: true, id: uuidv4(), name: "File Explorer" }],
    group: [],
    size: 100,
  },
];

export const panesSlice = createSlice({
  name: 'panes',
  initialState,
  reducers: {
    addPane: (state, action: PayloadAction<PaneTypes>) => {
      return [...state, action.payload]
    },
    addGroupPane: (state, action: PayloadAction<{ paneId: string; tab: TabTypes; }>) => {
      return state.map(
        (pane) => {
          if (!!pane.group.length) {
            const findGroup = pane.group.find((group: PaneTypes) => group.id === action.payload.paneId);
            if (findGroup) {
              return {
                ...pane,
                group: [
                  ...pane.group,
                  {
                    id: uuidv4(),
                    order: pane.group.length + 1,
                    active: true,
                    tabs: [action.payload.tab],
                    group: [],
                    size: 100 / (pane.group.length + 1)
                  }
                ]
              }
            } else {
              return pane;
            }
          } else {
            if (pane.id === action.payload.paneId) {
              return {
                ...pane,
                tabs: [],
                group: [{
                  id: uuidv4(),
                  order: 1,
                  active: false,
                  tabs: pane.tabs,
                  group: [],
                  size: 100 / 2
                }, {
                  id: uuidv4(),
                  order: 2,
                  active: true,
                  tabs: [action.payload.tab],
                  group: [],
                  size: 100 / 2
                }]
              }
            } else {
              return pane;
            }
          }
        })
    },
    removePane: (state, action: PayloadAction<string>) => {
      return state.filter((pane) => pane.id !== action.payload)
    },
    removeGroupedPane: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, group: pane.group.filter((group) => group.id !== action.payload.groupPaneId) } : pane)
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
    setGoupPaneActive: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            group: pane.group.map((group) =>
              group.id === action.payload.groupPaneId
                ? {
                  ...group,
                  active: true,
                }
                : group
            )
          }
          : pane
      )
    },
    addTab: (state, action: PayloadAction<{ paneId: string; tab: FileDataType; }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, tabs: uniqueObjectsById<FileDataType>([...pane.tabs, action.payload.tab]) } : pane)
    },
    addGroupTab: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tab: FileDataType; }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, group: pane.group.map((group) => group.id === action.payload.groupPaneId ? { ...group, tabs: [...group.tabs, action.payload.tab] } : group) } : pane)
    },
    removeTab: (state, action: PayloadAction<{ paneId: string; tabId: string; }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, tabs: pane.tabs.filter((tab) => tab.id !== action.payload.tabId) } : pane)
    },
    removeGroupedTab: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tabId: string; }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, group: pane.group.map((group) => group.id === action.payload.groupPaneId ? { ...group, tabs: group.tabs.filter((tab) => tab.id !== action.payload.tabId) } : group) } : pane)
    },
    setTabActive: (state, action: PayloadAction<{ paneId: string; tabId: string; }>) => {
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
    setTabActiveByName: (state, action: PayloadAction<{ paneId: string; tabName: string; }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            tabs: pane.tabs.map((tab) =>
              tab.name === action.payload.tabName ? { ...tab, active: true } : { ...tab, active: false }
            ),
          }
          : pane
      )
    },
    setGroupTabActive: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tabId: string; }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            group: pane.group.map((group) =>
              group.id === action.payload.groupPaneId
                ? {
                  ...group,
                  tabs: group.tabs.map((tab) =>
                    tab.id === action.payload.tabId ? { ...tab, active: true } : { ...tab, active: false }
                  )
                }
                : group
            )
          }
          : pane
      )
    },
    setGroupTabActiveByName: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tabName: string; }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            group: pane.group.map((group) =>
              group.id === action.payload.groupPaneId
                ? {
                  ...group,
                  tabs: group.tabs.map((tab) =>
                    tab.name === action.payload.tabName ? { ...tab, active: true } : { ...tab, active: false }
                  )
                }
                : group
            )
          }
          : pane
      )
    },
    updateTab: (state, action: PayloadAction<{ paneId: string; tabId: string; name: string; }>) => {
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
    updateGroupTab: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tabId: string; name: string; }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            group: pane.group.map((group) =>
              group.id === action.payload.groupPaneId
                ? {
                  ...group,
                  tabs: group.tabs.map((tab) =>
                    tab.id === action.payload.tabId ? { ...tab, name: action.payload.name } : tab
                  )
                }
                : group
            )
          }
          : pane
      )
    },
    updateTabContent: (state, action: PayloadAction<{ paneId: string; tabId: string; content: string | undefined }>) => {
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
    sortTabs: (state, action: PayloadAction<{ paneId: string; tabs: TabTypes[] }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId ? { ...pane, tabs: action.payload.tabs } : pane
      )
    },
    sortGroupTabs: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; tabs: TabTypes[] }>) => {
      return state.map((pane) =>
        pane.id === action.payload.paneId
          ? {
            ...pane,
            group: pane.group.map((group) =>
              group.id === action.payload.groupPaneId
                ? { ...group, tabs: action.payload.tabs }
                : group
            )
          }
          : pane
      )
    },
    setPaneSize: (state, action: PayloadAction<{ paneId: string; size: number }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, size: action.payload.size } : pane)
    },
    setGroupPaneSize: (state, action: PayloadAction<{ paneId: string; groupPaneId: string; size: number }>) => {
      return state.map((pane) => pane.id === action.payload.paneId ? { ...pane, group: pane.group.map((group) => group.id === action.payload.groupPaneId ? { ...group, size: action.payload.size } : group) } :
        pane
      )
    },
  },
})

export const {
  addPane,
  addGroupPane,
  removePane,
  removeGroupedPane,
  shiftPanes,
  setPaneOrder,
  setPaneActive,
  setGoupPaneActive,
  addTab,
  addGroupTab,
  removeTab,
  removeGroupedTab,
  setTabActive,
  setGroupTabActive,
  setTabActiveByName,
  setGroupTabActiveByName,
  updateTab,
  updateGroupTab,
  updateTabContent,
  sortTabs,
  sortGroupTabs,
  setPaneSize,
  setGroupPaneSize,
} = panesSlice.actions

export default panesSlice.reducer