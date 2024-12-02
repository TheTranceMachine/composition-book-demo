import dynamic from "next/dynamic";
import React, { memo, useRef, useState } from "react";
import { Selection } from 'monaco-editor';
import { ImperativePanelHandle, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { VscClose, VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import { CharacterTypes, DeletionItemType, FileDataType, MonacoEditorCurrentSelectionTypes, StorySettingTypes, TabTypes } from "@/types/types";
import ComponentSwitcher from "./ComponentSwitcher";

const WorkspacePaneTabs = dynamic(() => import('./WorkspacePaneTabs'), {
  ssr: false,
})

type SortTabsTypes = {
  tabs: TabTypes[];
  paneId: string;
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
  resizeHandleClassName: string;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: FileDataType) => void;
  setTabContent: (val: { tabId: string; content: string | undefined; }) => void;
  sortTabs: (val: SortTabsTypes) => void;
  removeTab: (val: { paneId: string; tabId: string; }) => void;
  setTabActive: (val: string) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addVerticalPane: () => void;
  addPane: () => void;
  removePane: (val: string) => void;
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
  resizeHandleClassName,
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
        className="workspace-pane bg-[#15222e] h-full"
        order={order}
        ref={panelRef}
        onResize={handleResize}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-end bg-black h-8">
            <ReactSortable
              group="tabs"
              list={JSON.parse(JSON.stringify(tabs))} // https://github.com/SortableJS/react-sortablejs/issues/149
              setList={(updatedTabs) => sortTabs({ tabs: JSON.parse(JSON.stringify(updatedTabs)) as TabTypes[], paneId })}
              onChoose={() => setPaneActive(paneId)}
              onEnd={(val) => setActiveTabOnMove(val)}
              className="pages-tabs flex flex-nowrap gap-0.5 w-full h-8 bg-black overflow-x-auto overflow-y-hidden"
            >
              {!!tabs.length ? tabs.map(({ id, name, active }) => (
                <WorkspacePaneTabs
                  key={id}
                  id={id}
                  active={active}
                  name={name}
                  paneId={paneId}
                  setTabActive={(val) => setTabActive(val)}
                  removeTab={(val) => removeTab(val)}
                />
              )) : <div className="flex items-center justify-center w-full h-full text-white opacity-20 text-sm">Empty</div>}
            </ReactSortable>
            <VscClose className="text-white cursor-pointer w-8 h-8 p-1.5" onClick={() => removePane(paneId)} />
            <VscSplitVertical
              className="text-white cursor-pointer w-8 h-8 p-1.5"
              onClick={addVerticalPane}
            />
            <VscSplitHorizontal
              className="text-white cursor-pointer w-8 h-8 p-1.5"
              onClick={addPane}
            />
          </div>
          {tabs.map(({ id, content, active, name }) => (
            <div
              className={`pane-content-wrapper relative ${active ? "active" : ""} ${name === "Characters" || name === "Story Settings" ? "overflow-y-auto" : ""}`}
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
      <PanelResizeHandle className={`bg-amber-700 ${resizeHandleClassName}`} />
    </>
  );
};

export default memo(WorkspacePane);
