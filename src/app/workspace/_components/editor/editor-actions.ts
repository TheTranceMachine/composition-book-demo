import { KeyMod, KeyCode } from 'monaco-editor';

export default [
  {
    id: "create-new-character",
    label: "Create New Character",
    keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyC],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1,
  },
  {
    id: "create-new-setting",
    label: "Create New Story Setting",
    keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyS],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 2,
  },
  {
    id: "ai-enhance",
    label: "Enhance with AI",
    keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyE],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 3,
  },
];
