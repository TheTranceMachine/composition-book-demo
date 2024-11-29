import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Selection } from 'monaco-editor';
import { SortableEvent } from "react-sortablejs";
import { CharacterTypes, DeletionItemType, FileDataType, MonacoEditorCurrentSelectionTypes, PaneTypes, StorySettingTypes, TabTypes } from "@/types/types";
import WorkspacePane from "./WorkspacePane";


type SortTabsTypes = {
  tabs: TabTypes[];
  paneId: string;
};

type WorkspaceVerticalPaneProps = {
  paneId: string;
  order: number;
  group: PaneTypes[];
  tabs: TabTypes[];
  files: FileDataType[];
  editorEnhancedSelection: string;
  editorSelectionRange: Selection;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  isMobile: boolean;
  isLaptop: boolean;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: { paneId: string; file: FileDataType }) => void;
  setTabContent: (val: { tabId: string; content: string | undefined; paneId: string; }) => void;
  sortTabs: (val: SortTabsTypes) => void;
  removeTab: (val: { paneId: string; tabId: string; }) => void;
  setTabActive: (val: { paneId: string; tabId: string; }) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addVerticalPane: (val: { paneId: string; }) => void;
  addPane: (val: { order: number }) => void;
  removePane: (val: string) => void;
  setPaneActive: (val: string) => void;
  handleEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  handleNewCharacter: (val: string) => void;
  handleNewSetting: (val: string) => void;
  handleDeletionRequest: (val: DeletionItemType) => void;
  handlePaneComponentChange: (val: { paneId: string; name: string; type?: string; tabId: string; component: string; }) => void;
}

const WorkspaceVerticalPane = (
  {
    paneId,
    order,
    group,
    tabs,
    files,
    editorEnhancedSelection,
    editorSelectionRange,
    characters,
    storySettings,
    isMobile,
    isLaptop,
    setEnhancementPaneOpen,
    handleSelectedFile,
    setTabContent,
    sortTabs,
    removeTab,
    setTabActive,
    setActiveTabOnMove,
    addVerticalPane,
    addPane,
    removePane,
    setPaneActive,
    handleEditorCurrentSelection,
    handleNewCharacter,
    handleNewSetting,
    handleDeletionRequest,
    handlePaneComponentChange,
  }: WorkspaceVerticalPaneProps) => {
  return (
    <>
      <Panel order={order} id={paneId} minSize={5}>
        <PanelGroup direction="vertical">
          {group.map(({ id: paneId, order, tabs }) => (
            <WorkspacePane
              key={paneId}
              paneId={paneId}
              order={order}
              tabs={tabs}
              files={files}
              editorEnhancedSelection={editorEnhancedSelection}
              editorSelectionRange={editorSelectionRange}
              characters={characters}
              storySettings={storySettings}
              isMobile={isMobile}
              isLaptop={isLaptop}
              resizeHandleClassName="h-[3px]"
              setEnhancementPaneOpen={setEnhancementPaneOpen}
              handleSelectedFile={(val) => handleSelectedFile({ paneId, file: val })}
              setTabContent={(val) => setTabContent({ ...val, paneId })}
              setTabActive={(val) => setTabActive({ paneId, tabId: val })}
              setActiveTabOnMove={(val) => setActiveTabOnMove(val)}
              addVerticalPane={(val) => addVerticalPane(val)}
              sortTabs={(val) => sortTabs(val)}
              removeTab={(val) => removeTab(val)}
              addPane={(val) => addPane(val)}
              removePane={(val) => removePane(val)}
              setPaneActive={(val) => setPaneActive(val)}
              handleEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
              handleNewCharacter={(val) => handleNewCharacter(val)}
              handleNewSetting={(val) => handleNewSetting(val)}
              handleDeletionRequest={(val) => handleDeletionRequest(val)}
              handlePaneComponentChange={(val) => handlePaneComponentChange({ paneId, ...val })}
            />
          ))}
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="bg-amber-700 w-[3px]" />
    </>
  );
}

export default WorkspaceVerticalPane;