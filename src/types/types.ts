import { Selection } from "monaco-editor";

export type FileDataType = {
  id: string;
  name: string;
  children: FileDataType[];
};

export type CharacterTypes = {
  id: string;
  name: string;
  description: string;
};

export type StorySettingTypes = {
  id: string;
  title: string;
  description: string;
};

export type TabTypes = {
  id: string;
  name: string;
  active: boolean;
  content: string;
  children: FileDataType[];
};

export type PaneTypes = {
  id: string;
  order: number;
  active: boolean;
  tabs: TabTypes[];
};

export type EditorTypes = {
  editorCurrentSelection: string;
  editorSelectionRange: Selection;
  editorEnhancedSelection: string;
  editorEnhancementCount: number;
}

export type MovedTabs = {
  from: { paneId: string; tabId?: string };
  to: { paneId: string; tabId: string };
}

export type MonacoEditorCurrentSelectionTypes = {
  range: Selection;
  currentSelection: string;
};

export type DeletionItemType = {
  id: string,
  title: string;
  type: string;
};