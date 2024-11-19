import React, { memo, useRef, useState } from "react";
import { Selection } from "monaco-editor";
import { ImperativePanelHandle, Panel, PanelResizeHandle } from "react-resizable-panels";
import { SortableEvent } from "react-sortablejs";
import { VscSplitHorizontal } from "react-icons/vsc";
import { CharacterTypes, DeletionItemType, FileDataType, MonacoEditorCurrentSelectionTypes, StorySettingTypes, TabTypes } from "@/types/types";
import ComponentSwitcher from "./ComponentSwitcher";
import WorkspacePaneTabs from "./WorkspacePaneTabs";

type SortTabsTypes = {
  tabs: TabTypes[];
  id: string;
};

type WorkspacePaneProps = {
  paneId: string;
  order: number;
  tabs: TabTypes[];
  files: FileDataType[];
  editorEnhancedSelection: string;
  editorSelectionRange: Selection;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  isMobile: boolean;
  isLaptop: boolean;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: FileDataType) => void;
  setTabContent: (val: { tabId: string; content: string | undefined; }) => void;
  sortTabs: (val: SortTabsTypes) => void;
  removeTab: (val: { paneId: string; tabId: string; }) => void;
  setTabActive: (val: string) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addPane: (val: { paneId: string; order: number }) => void;
  setPaneActive: (val: string) => void;
  handleEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  handleNewCharacter: (val: string) => void;
  handleNewSetting: (val: string) => void;
  handleDeletionRequest: (val: DeletionItemType) => void;
  handlePaneComponentChange: (val: { name: string; type?: string; tabId: string; component: string; }) => void;
};

const WorkspacePane = ({
  paneId,
  order,
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
  addPane,
  setPaneActive,
  handleEditorCurrentSelection,
  handleNewCharacter,
  handleNewSetting,
  handleDeletionRequest,
  handlePaneComponentChange,
}: WorkspacePaneProps) => {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const [panelSize, setPanelSize] = useState(panelRef.current?.getSize());
  const handleResize = () => {
    setPanelSize(panelRef.current?.getSize());
  };

  return (
    <>
      <Panel
        id={paneId}
        minSize={isMobile || isLaptop ? 8 : 5}
        className="bg-[#1e1e1e] h-full"
        order={order}
        ref={panelRef}
        onResize={handleResize}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-end bg-black">
            {!!tabs.length && (
              <WorkspacePaneTabs
                paneId={paneId}
                tabs={tabs}
                sortTabs={(val: SortTabsTypes) => sortTabs(val)}
                setPaneActive={(val: string) => setPaneActive(val)}
                setActiveTabOnMove={(val: SortableEvent) => setActiveTabOnMove(val)}
                setTabActive={(val: string) => setTabActive(val)}
                removeTab={(val: { paneId: string; tabId: string; }) => removeTab(val)}
              />
            )}
            <VscSplitHorizontal
              className="text-white cursor-pointer w-8 h-8 p-1.5"
              onClick={() => addPane({ paneId, order })}
            />
          </div>
          {tabs.map(({ id, content, active, name }) => (
            <div
              className={`pane-content-wrapper ${active ? "active" : ""} ${name === "Characters" || name === "Story Settings" ? "overflow-y-auto" : ""}`}
              key={id}
              id={`editor-${id}`}
            >
              <ComponentSwitcher
                id={id}
                component={name}
                content={content}
                files={files}
                editorEnhancedSelection={editorEnhancedSelection}
                editorSelectionRange={editorSelectionRange}
                characters={characters}
                storySettings={storySettings}
                panelSize={panelSize}
                setEnhancementPaneOpen={setEnhancementPaneOpen}
                handleDeletionRequest={(val) => handleDeletionRequest(val)}
                handlePaneComponentChange={(val) =>
                  handlePaneComponentChange({ tabId: id, component: val.name, ...val })
                }
                handleSelectedFile={handleSelectedFile}
                handleEditorChange={setTabContent}
                handleEditorCurrentSelection={handleEditorCurrentSelection}
                handleNewCharacter={handleNewCharacter}
                handleNewSetting={handleNewSetting}
              />
            </div>
          ))}
        </div>
      </Panel>
      <PanelResizeHandle className="bg-black w-[3px]" />
    </>
  );
};

export default memo(WorkspacePane);
