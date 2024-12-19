import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SortableEvent } from "react-sortablejs";
import { FileDataType, PaneTypes, TabTypes } from "@/types/types";
import WorkspacePane from "./WorkspacePane";

type WorkspaceVerticalPaneProps = {
  paneId: string;
  order: number;
  group: PaneTypes[];
  files: FileDataType[];
  isMobile: boolean;
  isLaptop: boolean;
  panelSize: number;
  fullScreen: boolean;
  handleSelectedFile: (val: { groupPaneId: string; file: FileDataType }) => void;
  sortTabs: (val: { groupPaneId: string; tabs: TabTypes[] }) => void;
  removeTab: (val: { groupPaneId: string; tabId: string }) => void;
  setTabActive: (val: { groupPaneId: string; tabId: string }) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  addVerticalPane: (val: string) => void;
  addPane: () => void;
  removePane: (val: string) => void;
  setPaneActive: (val: string) => void;
  handlePaneComponentChange: (val: {
    groupPaneId: string;
    name: string;
    type?: string;
    tabId: string;
    component: string;
  }) => void;
  handlePaneSize: (val: { groupPaneId: string; size: number }) => void;
  handleVerticalPaneSize: (val: number) => void;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  removeFileExplorerItem: (val: { id: string; name: string; type: string }) => void;
  setMovedItem: (val: SortableEvent) => void;
  togglePaneFullScreen: (val: string) => void;
};

const WorkspaceVerticalPane = ({
  paneId,
  order,
  group,
  files,
  isMobile,
  isLaptop,
  panelSize,
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
  handleVerticalPaneSize,
  setNewFile,
  removeFileExplorerItem,
  setMovedItem,
  togglePaneFullScreen,
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
            isMobile={isMobile}
            isLaptop={isLaptop}
            resizeHandleClassName="h-[3px]"
            panelSize={panelSize}
            panelVerticalSize={size}
            fullScreen={fullScreen}
            handleSelectedFile={(val) => handleSelectedFile({ groupPaneId, file: val })}
            setTabActive={(val) => setTabActive({ groupPaneId, tabId: val })}
            setActiveTabOnMove={(val) => setActiveTabOnMove(val)}
            addVerticalPane={() => addVerticalPane(groupPaneId)}
            sortTabs={(val) => sortTabs({ groupPaneId, tabs: val })}
            removeTab={(val) => removeTab({ groupPaneId, tabId: val })}
            addPane={addPane}
            removePane={() => removePane(groupPaneId)}
            setPaneActive={() => setPaneActive(groupPaneId)}
            handlePaneComponentChange={(val) => handlePaneComponentChange({ groupPaneId, ...val })}
            handlePaneSize={(val) => handlePaneSize({ groupPaneId, size: val })}
            setNewFile={(val) => setNewFile(val)}
            removeFileExplorerItem={(val) => removeFileExplorerItem(val)}
            setMovedItem={(val) => setMovedItem(val)}
            togglePaneFullScreen={() => togglePaneFullScreen(groupPaneId)}
          />
        ))}
      </PanelGroup>
    </Panel>
    <PanelResizeHandle className="bg-black hover:bg-neutral-100 w-[3px]" />
  </>
);

export default WorkspaceVerticalPane;
