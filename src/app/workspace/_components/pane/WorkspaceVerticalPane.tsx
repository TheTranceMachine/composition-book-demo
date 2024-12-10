import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Selection } from 'monaco-editor';
import { SortableEvent } from "react-sortablejs";
import { CharacterTypes, DeletionItemType, FileDataType, MonacoEditorCurrentSelectionTypes, PaneTypes, StorySettingTypes, TabTypes } from "@/types/types";
import WorkspacePane from "./WorkspacePane";

type WorkspaceVerticalPaneProps = {
  paneId: string;
  order: number;
  group: PaneTypes[];
  files: FileDataType[];
  editorEnhancedSelection: string;
  editorSelectionRange: Selection;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  isMobile: boolean;
  isLaptop: boolean;
  panelSize: number;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: { groupPaneId: string; file: FileDataType }) => void;
  setTabContent: (val: { groupPaneId: string; tabId: string; content: string | undefined; }) => void;
  sortTabs: (val: { groupPaneId: string; tabs: TabTypes[] }) => void;
  removeTab: (val: { groupPaneId: string; tabId: string; }) => void;
  setTabActive: (val: { groupPaneId: string; tabId: string; }) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addVerticalPane: (val: string) => void;
  addPane: () => void;
  removePane: (val: string) => void;
  setPaneActive: (val: string) => void;
  handleEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  handleNewCharacter: (val: string) => void;
  handleNewSetting: (val: string) => void;
  handleDeletionRequest: (val: DeletionItemType) => void;
  handlePaneComponentChange: (val: { groupPaneId: string; name: string; type?: string; tabId: string; component: string; }) => void;
  handlePaneSize: (val: { groupPaneId: string; size: number }) => void;
  handleVerticalPaneSize: (val: number) => void;
  setNewFile: (val: { name: string; directoryId: string; type: string; }) => void;
}

const WorkspaceVerticalPane = (
  {
    paneId,
    order,
    group,
    files,
    editorEnhancedSelection,
    editorSelectionRange,
    characters,
    storySettings,
    isMobile,
    isLaptop,
    panelSize,
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
    handlePaneSize,
    handleVerticalPaneSize,
    setNewFile,
  }: WorkspaceVerticalPaneProps) => (
  <>
    <Panel
      id={paneId}
      order={order}
      minSize={isMobile || isLaptop ? 8 : 5}
      className="workspace-pane bg-[#15222e] h-full"
      onResize={(size) => handleVerticalPaneSize(size)}
    >
      <PanelGroup direction="vertical">
        {group.map(({ id: groupPaneId, order, tabs, size }) => (
          <WorkspacePane
            key={groupPaneId}
            paneId={groupPaneId}
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
            panelSize={panelSize}
            panelVerticalSize={size}
            setEnhancementPaneOpen={setEnhancementPaneOpen}
            handleSelectedFile={(val) => handleSelectedFile({ groupPaneId, file: val })}
            setTabContent={(val) => setTabContent({ groupPaneId, ...val })}
            setTabActive={(val) => setTabActive({ groupPaneId, tabId: val })}
            setActiveTabOnMove={(val) => setActiveTabOnMove(val)}
            addVerticalPane={() => addVerticalPane(groupPaneId)}
            sortTabs={(val) => sortTabs({ groupPaneId, tabs: val })}
            removeTab={(val) => removeTab({ groupPaneId, tabId: val })}
            addPane={addPane}
            removePane={() => removePane(groupPaneId)}
            setPaneActive={() => setPaneActive(groupPaneId)}
            handleEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
            handleNewCharacter={(val) => handleNewCharacter(val)}
            handleNewSetting={(val) => handleNewSetting(val)}
            handleDeletionRequest={(val) => handleDeletionRequest(val)}
            handlePaneComponentChange={(val) => handlePaneComponentChange({ groupPaneId, ...val })}
            handlePaneSize={(val) => handlePaneSize({ groupPaneId, size: val })}
            setNewFile={(val) => setNewFile(val)}
          />
        ))}
      </PanelGroup>
    </Panel>
    <PanelResizeHandle className="bg-black hover:bg-neutral-100 w-[3px]" />
  </>
);

export default WorkspaceVerticalPane;