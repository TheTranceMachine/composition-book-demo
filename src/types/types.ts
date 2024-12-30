// Landing page
export type Feature = {
  id: number;
  icon: JSX.Element;
  title: string;
  paragraph: string;
};

export type Menu = {
  id: number;
  title: string;
  path: string;
  newTab: boolean;
  submenu?: Menu[];
};

// Workspace
export type FileDataType = {
  id: string;
  name: string;
  content?: string;
  children?: FileDataType[];
};

export type TabTypes = {
  id: string;
  name: string;
  active: boolean;
  content?: string | undefined;
};

export type PaneChoicesTypes = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
};

export type PaneTypes = {
  id: string;
  order: number;
  active: boolean;
  tabs: TabTypes[];
  group: PaneTypes[];
  size: number;
};

export type MovedTabs = {
  from: { paneId: string; tabId?: string };
  to: { paneId: string; tabId: string };
};

export type DeletionItemType = {
  id: string;
  title: string;
  type: string;
};

export type EditorAction = {
  id: string;
  label: string;
  keybindings: number[];
  contextMenuGroupId: string;
  contextMenuOrder: number;
};
