import dynamic from "next/dynamic";
import { useRef } from "react";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { VscClose, VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { FileDataType, TabTypes } from "@/types/types";
import ComponentSwitcher from "./ComponentSwitcher";
import components from "../manager/components";

const WorkspacePaneTabs = dynamic(() => import("./WorkspacePaneTabs"), {
  ssr: false,
});

type WorkspacePaneProps = {
  paneId: string;
  order: number;
  tabs: TabTypes[];
  files: FileDataType[];
  isMobile: boolean;
  isLaptop: boolean;
  resizeHandleClassName: string;
  panelSize: number | undefined;
  panelVerticalSize?: number | undefined;
  fullScreen: boolean;
  handleSelectedFile: (val: FileDataType) => void;
  sortTabs: (val: TabTypes[]) => void;
  removeTab: (val: string) => void;
  setTabActive: (val: string) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addVerticalPane: () => void;
  addPane: () => void;
  removePane: () => void;
  setPaneActive: () => void;
  handlePaneComponentChange: (val: { name: string; type?: string; tabId: string; component: string }) => void;
  handlePaneSize: (val: number) => void;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  removeFileExplorerItem: (val: { id: string; name: string; type: string }) => void;
  setMovedItem: (val: SortableEvent) => void;
  togglePaneFullScreen: () => void;
};

const WorkspacePane = ({
  paneId,
  order,
  tabs,
  files,
  isMobile,
  isLaptop,
  resizeHandleClassName,
  panelSize,
  panelVerticalSize,
  fullScreen,
  handleSelectedFile,
  sortTabs,
  removeTab,
  setTabActive,
  setActiveTabOnMove,
  addVerticalPane,
  addPane,
  removePane,
  setPaneActive,
  handlePaneComponentChange,
  handlePaneSize,
  setNewFile,
  removeFileExplorerItem,
  setMovedItem,
  togglePaneFullScreen,
}: WorkspacePaneProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelExpanded = panelSize && panelSize > 8;

  return (
    <>
      <Panel
        id={paneId}
        minSize={isMobile || isLaptop ? 8 : 5}
        className="workspace-pane bg-[#15222e] h-full"
        order={order}
        onResize={(size) => handlePaneSize(size)}
      >
        <div className="flex flex-col h-full" ref={panelRef}>
          <div className="flex justify-between bg-black h-8">
            <ReactSortable
              group="tabs"
              list={JSON.parse(JSON.stringify(tabs))} // https://github.com/SortableJS/react-sortablejs/issues/149
              setList={(updatedTabs) => sortTabs(JSON.parse(JSON.stringify(updatedTabs)))}
              onChoose={setPaneActive}
              onEnd={(val) => setActiveTabOnMove(val)}
              className="pages-tabs flex flex-nowrap gap-0.5 w-full h-8 bg-black overflow-x-auto overflow-y-hidden"
              draggable=".draggable"
            >
              {!!tabs.length ? (
                tabs.map(({ id, name, active }) => (
                  <WorkspacePaneTabs
                    key={id}
                    active={active}
                    name={name}
                    setTabActive={() => setTabActive(id)}
                    removeTab={() => removeTab(id)}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white opacity-20 text-sm">
                  Empty
                </div>
              )}
            </ReactSortable>
            <div className="flex items-center h-8">
              {fullScreen ? (
                <FiMinimize className="text-white cursor-pointer w-4 h-4 mx-1" onClick={togglePaneFullScreen} />
              ) : (
                <>
                  <FiMaximize className="text-white cursor-pointer w-4 h-4 mx-1" onClick={togglePaneFullScreen} />
                  <VscSplitVertical className="text-white cursor-pointer w-4 h-4 mx-1" onClick={addVerticalPane} />
                  <VscSplitHorizontal className="text-white cursor-pointer w-4 h-4 mx-1" onClick={addPane} />
                  <VscClose className="text-white cursor-pointer w-4 h-4 mx-1" onClick={removePane} />
                </>
              )}
            </div>
          </div>
          {tabs.map(({ id, content, active, name }) => (
            <div
              className={`pane-content-wrapper relative ${active ? "active" : ""} ${components.find((comp) => comp.name === name) ? "overflow-y-auto" : ""}`}
              key={id}
              id={`editor-${id}`}
            >
              <ComponentSwitcher
                panelElement={panelRef.current}
                component={name}
                content={content}
                files={files}
                panelExpanded={panelExpanded}
                panelVerticalSize={panelVerticalSize}
                fullScreen={fullScreen}
                handlePaneComponentChange={(val) =>
                  handlePaneComponentChange({ tabId: id, component: val.name, ...val })
                }
                handleSelectedFile={handleSelectedFile}
                setNewFile={(val) => setNewFile(val)}
                removeFileExplorerItem={(val) => removeFileExplorerItem(val)}
                setMovedItem={(val) => setMovedItem(val)}
              />
            </div>
          ))}
        </div>
      </Panel>
      <PanelResizeHandle className={`bg-black hover:bg-neutral-100 ${resizeHandleClassName}`} />
    </>
  );
};

export default WorkspacePane;
