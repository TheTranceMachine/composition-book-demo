"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PanelGroup } from "react-resizable-panels";
import { SortableEvent } from "react-sortablejs";
import { useMediaQuery } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { setStorySetting, removeStorySetting } from "@/redux/slices/storySettingsSlice";
import { setCharacter, removeCharacter } from "@/redux/slices/charactersSlice";
import {
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
  setGroupTabActiveByName,
  setTabActiveByName,
  updateTab,
  updateGroupTab,
  updateTabContent,
  sortTabs,
  sortGroupTabs,
  setPaneSize,
  setGroupPaneSize,
} from "@/redux/slices/panesSlice";
import {
  setEditorEnhancedSelection,
  setEditorCurrentSelection,
  setEditorSelectionRange,
} from "@/redux/slices/editorSlice";
import { addItem, removeItem } from "@/redux/slices/fileExplorerSlice";
import {
  FileDataType,
  CharacterTypes,
  StorySettingTypes,
  PaneTypes,
  EditorTypes,
  MonacoEditorCurrentSelectionTypes,
  DeletionItemType,
  CharactersState,
  StorySettingsState,
} from "@/types/types";
import WorkspaceVerticalPane from "./_components/pane/WorkspaceVerticalPane";
import "./Workspace.scss";

const WorkspacePane = dynamic(() => import("./_components/pane/WorkspacePane"), {
  ssr: false,
});

const NewCharacterModal = lazy(() => import("./_components/modals/NewCharacterModal"));
const NewStorySettingModal = lazy(() => import("./_components/modals/NewStorySettingModal"));
const DeletionConfirmationModal = lazy(() => import("./_components/modals/DeletionConfirmationModal"));

type HandlePaneComponentChangeTypes = { paneId: string; name: string; type?: string; tabId: string; component: string };

interface HandleVerticalPaneComponentChangeTypes extends HandlePaneComponentChangeTypes {
  groupPaneId: string;
}

export default function WorkspacePage() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLaptop = useMediaQuery("(max-width: 1024px)");

  const files = useSelector((state: { fileExplorer: FileDataType[] }) => state.fileExplorer);
  const { characters } = useSelector((state: { characters: CharactersState }) => state.characters);
  const { storySettings } = useSelector((state: { storySettings: StorySettingsState }) => state.storySettings);
  const panes = useSelector((state: { panes: PaneTypes[] }) => state.panes);
  const editorStore = useSelector((state: { editor: EditorTypes }) => state.editor);
  const { editorSelectionRange, editorCurrentSelection, editorEnhancedSelection } = editorStore;

  const [newCharacterName, setNewCharacterName] = useState<string>("");
  const [newStorySettingTitle, setNewStorySettingTitle] = useState<string>("");
  const [newCharacterModal, setNewCharacterModal] = useState<boolean>(false);
  const [newStorySettingModal, setNewStorySettingModal] = useState<boolean>(false);
  const [deletionConfirmationModal, setDeletionConfirmationModal] = useState<boolean>(false);
  const [deletionItem, setDeletionItem] = useState({
    id: "",
    title: "",
    type: "",
  });
  const [fullScreen, setFullScreen] = useState({
    paneId: "",
    fullScreen: false,
  });

  const handleEditorCurrentSelection = ({ range, currentSelection }: MonacoEditorCurrentSelectionTypes) => {
    if (range) {
      dispatch(setEditorSelectionRange(range));
    }
    dispatch(setEditorCurrentSelection(currentSelection));
    dispatch(setEditorEnhancedSelection(""));
  };

  const handleOpenEnhancementPane = () => {
    // Add new pane rendering AI Enhancement Tab with current selection
    const tab = { id: uuidv4(), name: "AI Enhancement", content: editorCurrentSelection, active: true };
    const newPaneId = uuidv4();
    const newPane = { id: newPaneId, order: panes.length + 1, active: true, tabs: [tab], group: [], size: 50 };
    dispatch(addPane(newPane));
  };

  // const handleEditorEnhancedSelection = (enhancedText: string) => {
  //   dispatch(setEditorEnhancedSelection(enhancedText));
  // };

  const handleNewCharacter = (name: string) => {
    setNewCharacterName(name);
    setNewCharacterModal(true);
  };

  const handleNewSetting = (title: string) => {
    setNewStorySettingTitle(title);
    setNewStorySettingModal(true);
  };

  const handleNewCharacterSave = (character: CharacterTypes) => {
    const id = uuidv4();
    dispatch(setCharacter({ ...character, id }));
    setNewCharacterModal(false);
    toast.success("New character created successfully");
  };

  const handleNewStorySettingSave = (storySetting: StorySettingTypes) => {
    const id = uuidv4();
    dispatch(setStorySetting({ ...storySetting, id }));
    setNewStorySettingModal(false);
    toast.success("New story setting created successfully");
  };

  const handleDeletionRequest = (deletionItem: DeletionItemType) => {
    setDeletionItem(deletionItem);
    setDeletionConfirmationModal(true);
  };

  const handleDeleteItem = (id: string, type: string) => {
    if (type === "story setting") {
      dispatch(removeStorySetting(id));
    } else if (type === "character") {
      dispatch(removeCharacter(id));
    } else {
      dispatch(removeItem({ id }));
    }
    setDeletionConfirmationModal(false);
    toast.success(`${type} deleted successfully`);
  };

  const handleAddNewPane = (order: number) => {
    const tab = { id: uuidv4(), name: "Pane Manager", content: "", active: true };
    const newPaneId = uuidv4();
    const newPane = { id: newPaneId, order: order + 1, active: true, tabs: [tab], group: [], size: 50 };

    dispatch(shiftPanes(order));
    dispatch(addPane(newPane));
    dispatch(setPaneOrder());
    dispatch(setPaneActive(newPaneId));
  };

  const handleSelectedFile = ({
    paneId,
    groupPaneId,
    file,
  }: {
    paneId: string;
    groupPaneId?: string;
    file: FileDataType;
  }) => {
    const tabExists = panes
      .map((pane) => {
        const tab = pane.tabs.find((tab) => tab.id === file.id);
        if (tab) {
          return { pane, tab };
        } else {
          const group = pane.group.find((group) => group.tabs.some((tab) => tab.id === file.id));
          if (group) {
            const groupTab = group.tabs.find((tab) => tab.id === file.id);
            return { pane, group, tab: groupTab };
          }
        }
        return null;
      })
      .filter(Boolean);

    if (!!tabExists.length && tabExists[0]) {
      if (tabExists[0].group && tabExists[0].tab) {
        dispatch(
          setGroupTabActive({
            paneId: tabExists[0].pane.id,
            groupPaneId: tabExists[0].group.id,
            tabId: tabExists[0].tab.id,
          })
        );
      } else if (tabExists[0].tab) {
        dispatch(setTabActive({ paneId: tabExists[0].pane.id, tabId: tabExists[0].tab.id }));
      }
    } else {
      if (groupPaneId) {
        dispatch(addGroupTab({ paneId, groupPaneId, tab: { ...file, active: false } }));
      } else {
        dispatch(addTab({ paneId, tab: { ...file, active: false } }));
      }
    }
  };

  const handleAddGroupPane = ({ paneId, order }: { paneId: string; order: number }) => {
    const tab = { id: uuidv4(), name: "Pane Manager", content: "", active: true };

    dispatch(shiftPanes(order));
    dispatch(addGroupPane({ paneId, tab }));
  };

  const handleRemoveTab = ({ paneId, tabId }: { paneId: string; tabId: string }) => {
    const activePane = panes.find((pane) => pane.id === paneId);
    if (activePane) {
      const activePaneTabs = activePane.tabs;
      const activeTabIndex = activePaneTabs.findIndex((tab) => tab.id === tabId);
      if (activePane.tabs.length > 1) {
        if (activeTabIndex === 0) {
          dispatch(setTabActive({ paneId, tabId: activePaneTabs[1].id }));
        } else {
          dispatch(setTabActive({ paneId, tabId: activePaneTabs[activeTabIndex - 1].id }));
        }
        dispatch(removeTab({ paneId, tabId }));
      } else {
        toast.error("Cannot remove the last tab");
      }
    }
  };

  const handleRemoveGroupTab = ({
    paneId,
    groupPaneId,
    tabId,
  }: {
    paneId: string;
    groupPaneId: string;
    tabId: string;
  }) => {
    const activePane = panes.find((pane) => pane.id === paneId);
    if (activePane) {
      const activePaneGroup = activePane.group.find((group) => group.id === groupPaneId);
      if (activePaneGroup) {
        const activePaneGroupTabs = activePaneGroup.tabs;
        const activePaneGroupIndex = activePaneGroupTabs.findIndex((tab) => tab.id === tabId);

        if (activePaneGroupTabs.length > 1) {
          if (activePaneGroupIndex === 0) {
            dispatch(setGroupTabActive({ paneId, groupPaneId, tabId: activePaneGroupTabs[1].id }));
          } else {
            dispatch(
              setGroupTabActive({ paneId, groupPaneId, tabId: activePaneGroupTabs[activePaneGroupIndex - 1].id })
            );
          }
          dispatch(removeGroupedTab({ paneId, groupPaneId, tabId }));
        } else {
          toast.error("Cannot remove the last tab");
        }
      }
    }
  };

  const handleRemovePane = (paneId: string) => {
    if (panes.length > 1) {
      dispatch(removePane(paneId));
    } else {
      toast.error("Cannot remove the last pane");
    }
  };

  const removePaneGroup = ({ paneId, groupPaneId }: { paneId: string; groupPaneId: string }) => {
    dispatch(removeGroupedPane({ paneId, groupPaneId }));
  };

  const handleTabContentUpdate = ({
    tabId,
    content,
    paneId,
  }: {
    tabId: string;
    content: string | undefined;
    paneId: string;
  }) => {
    dispatch(updateTabContent({ paneId, tabId, content }));
  };

  const handleSelectTab = ({ paneId, tabId }: { paneId: string; tabId: string }) => {
    dispatch(setTabActive({ paneId, tabId }));
  };

  const handleSelectGroupTab = ({
    paneId,
    groupPaneId,
    tabId,
  }: {
    paneId: string;
    groupPaneId: string;
    tabId: string;
  }) => {
    dispatch(setGroupTabActive({ paneId, groupPaneId, tabId }));
  };

  const handleSetActiveTabsOnMove = (dataOnMove: SortableEvent) => {
    // TODO: Change to use tabId instead of tabName
    const tabName = dataOnMove.item.innerText || "";

    const fromPaneId = dataOnMove.from.parentElement?.parentElement?.parentElement?.id;
    const toPaneId = dataOnMove.to.parentElement?.parentElement?.parentElement?.id;

    const toPaneGroup = dataOnMove.to.parentElement?.parentElement?.parentElement?.parentElement;
    const toPaneGroupDirection = toPaneGroup?.dataset.panelGroupDirection;

    const fromPaneGroup = dataOnMove.from.parentElement?.parentElement?.parentElement?.parentElement;
    const fromPaneGroupDirection = fromPaneGroup?.dataset.panelGroupDirection;

    // to vertical pane
    if (toPaneGroupDirection === "vertical") {
      // make "to pane group" tab active
      const toParentPaneId =
        dataOnMove.to.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id;
      const toGroupPaneId = dataOnMove.to.parentElement?.parentElement?.parentElement?.dataset.panelId;
      dispatch(setGroupTabActiveByName({ paneId: toParentPaneId, groupPaneId: toGroupPaneId, tabName }));
    }

    // to horizontal pane
    if (toPaneId) {
      dispatch(setTabActiveByName({ paneId: toPaneId, tabName }));
    }

    // from vertical pane
    if (fromPaneGroupDirection === "vertical") {
      // make "from pane group" tab active
      const fromParentPaneId =
        dataOnMove.from.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id;
      const fromGroupPaneId = dataOnMove.from.parentElement?.parentElement?.parentElement?.dataset.panelId;
      const findParentPane = panes.find((pane) => pane.id === fromParentPaneId);
      const findGroupPane = findParentPane?.group.find((group) => group.id === fromGroupPaneId);
      const inactiveTab = findGroupPane?.tabs.find((tab) => tab.name !== tabName);
      if (inactiveTab) {
        dispatch(
          setGroupTabActiveByName({ paneId: fromParentPaneId, groupPaneId: fromGroupPaneId, tabName: inactiveTab.name })
        );
      }
    }

    // from horizontal pane
    const activePane = panes.find((pane) => pane.id === fromPaneId);
    if (activePane) {
      const inactiveTab = activePane.tabs.find((tab) => tab.name !== tabName);
      if (inactiveTab) {
        dispatch(setTabActiveByName({ paneId: fromPaneId, tabName: inactiveTab.name }));
      }
    }
  };

  const validation = (val: string) => {
    const isNameValid = /^[a-zA-Z0-9_.-]*$/.test(val);
    if (!isNameValid) {
      toast.error("Invalid file name. Please use only letters, numbers, and the following characters: - _ .");
      return false;
    }
    return true;
  };

  const handlePaneComponentChange = ({ paneId, tabId, component, type }: HandlePaneComponentChangeTypes) => {
    if (type === "file") {
      if (!validation(component)) return;
      dispatch(addItem({ id: uuidv4(), name: component, directoryId: "", content: "", type }));
      toast.success("New file created successfully");
    }
    dispatch(updateTab({ paneId, tabId, name: component }));
  };

  const handleGroupPaneComponentChange = ({
    paneId,
    groupPaneId,
    tabId,
    component,
    type,
  }: HandleVerticalPaneComponentChangeTypes) => {
    dispatch(updateGroupTab({ paneId, groupPaneId, tabId, name: component }));
    if (type === "file") {
      if (!validation(component)) return;
      dispatch(addItem({ id: uuidv4(), name: component, directoryId: "", content: "", type }));
      toast.success("New file created successfully");
    }
  };

  const handleAddFile = ({
    name,
    directoryId,
    type,
  }: {
    name: string | undefined;
    directoryId: string;
    type: string;
  }) => {
    if (!name) return;
    const id = uuidv4();
    if (type === "file") {
      if (!validation(name)) return;
      dispatch(addItem({ id, name, directoryId, content: "", type }));
      toast.success("New file created successfully");
    } else {
      if (!validation(name)) return;
      dispatch(addItem({ id, name, directoryId, children: [], type }));
      toast.success("New directory created successfully");
    }
  };

  const handlePaneSize = ({ paneId, size }: { paneId: string; size: number }) => {
    dispatch(setPaneSize({ paneId, size }));
  };

  const handleVerticalPaneSize = ({ paneId, size }: { paneId: string; size: number }) => {
    dispatch(setPaneSize({ paneId, size }));
  };

  const handleGroupPaneSize = ({
    paneId,
    groupPaneId,
    size,
  }: {
    paneId: string;
    groupPaneId: string;
    size: number;
  }) => {
    dispatch(setGroupPaneSize({ paneId, groupPaneId, size }));
  };

  const handleMovedFileExplorerItem = (dataOnMove: SortableEvent) => {
    const itemId = dataOnMove.item.id;
    const toDirId = dataOnMove.to.parentElement?.parentElement?.id || "";

    const isDirectory = (dataOnMove.item.firstChild?.firstChild as HTMLElement)?.dataset.directory;

    const findItem = (items: FileDataType[]): FileDataType | undefined => {
      for (const item of items) {
        if (item.id === itemId) {
          return item;
        } else if (item.children) {
          const children: FileDataType | undefined = findItem(item.children);
          if (children) {
            return children;
          }
        }
      }
    };

    const item = findItem(files);
    if (item) {
      dispatch(removeItem({ id: item.id }));
      dispatch(addItem({ ...item, directoryId: toDirId, type: isDirectory === "true" ? "dir" : "file" }));
    }
  };

  const handleRemoveFileExplorerItem = ({ id, name, type }: { id: string; name: string; type: string }) => {
    setDeletionItem({ id, title: name, type });
    setDeletionConfirmationModal(true);
  };

  const togglePaneFullScreen = (id: string) => {
    const div = document.getElementById(id);
    if (document.fullscreenElement) {
      setFullScreen({ paneId: "", fullScreen: false });
      document.exitFullscreen();
    } else {
      setFullScreen({ paneId: id, fullScreen: true });
      div?.requestFullscreen();
    }
  };

  const getPanelElement = (paneId: string) => {
    return fullScreen.fullScreen ? (document.querySelector(`[data-panel-id="${paneId}"]`) as HTMLDivElement) : null;
  };

  return (
    <div className="workspace w-full h-full">
      <PanelGroup direction="horizontal">
        {panes.map(({ id: paneId, order, tabs, group, size }) =>
          !!group.length ? (
            <WorkspaceVerticalPane
              key={paneId}
              paneId={paneId}
              order={order}
              group={group}
              files={files}
              editorEnhancedSelection={editorEnhancedSelection}
              editorSelectionRange={editorSelectionRange}
              characters={characters}
              storySettings={storySettings}
              isMobile={isMobile}
              isLaptop={isLaptop}
              panelSize={size}
              fullScreen={fullScreen.fullScreen}
              setEnhancementPaneOpen={handleOpenEnhancementPane}
              handleSelectedFile={(val) => handleSelectedFile({ paneId, ...val })}
              setTabContent={(val) => handleTabContentUpdate({ paneId, ...val })}
              setTabActive={(val) => handleSelectGroupTab({ paneId, ...val })}
              setActiveTabOnMove={(val) => handleSetActiveTabsOnMove(val)}
              addVerticalPane={(val) => handleAddGroupPane({ paneId: val, order })}
              sortTabs={(val) => dispatch(sortGroupTabs({ paneId, ...val }))}
              removeTab={(val) => handleRemoveGroupTab({ paneId, ...val })}
              addPane={() => handleAddNewPane(order)}
              removePane={(val) => removePaneGroup({ paneId, groupPaneId: val })}
              setPaneActive={(val) => dispatch(setGoupPaneActive({ paneId, groupPaneId: val }))}
              handleEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
              handleNewCharacter={(val) => handleNewCharacter(val)}
              handleNewSetting={(val) => handleNewSetting(val)}
              handleDeletionRequest={(val) => handleDeletionRequest(val)}
              handlePaneComponentChange={(val) => handleGroupPaneComponentChange({ paneId, ...val })}
              handlePaneSize={(val) => handleGroupPaneSize({ paneId, ...val })}
              handleVerticalPaneSize={(val) => handleVerticalPaneSize({ paneId, size: val })}
              setNewFile={(val) => handleAddFile(val)}
              removeFileExplorerItem={(val) => handleRemoveFileExplorerItem(val)}
              setMovedItem={(val) => handleMovedFileExplorerItem(val)}
              togglePaneFullScreen={(val) => togglePaneFullScreen(val)}
            />
          ) : (
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
              resizeHandleClassName="w-[3px]"
              panelSize={size}
              fullScreen={fullScreen.fullScreen}
              setEnhancementPaneOpen={handleOpenEnhancementPane}
              handleSelectedFile={(val) => handleSelectedFile({ paneId, file: val })}
              setTabContent={(val) => handleTabContentUpdate({ paneId, ...val })}
              setTabActive={(val) => handleSelectTab({ paneId, tabId: val })}
              setActiveTabOnMove={(val) => handleSetActiveTabsOnMove(val)}
              addVerticalPane={() => handleAddGroupPane({ paneId, order })}
              sortTabs={(val) => dispatch(sortTabs({ paneId, tabs: val }))}
              removeTab={(val) => handleRemoveTab({ paneId, tabId: val })}
              addPane={() => handleAddNewPane(order)}
              removePane={() => handleRemovePane(paneId)}
              setPaneActive={() => dispatch(setPaneActive(paneId))}
              handleEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
              handleNewCharacter={(val) => handleNewCharacter(val)}
              handleNewSetting={(val) => handleNewSetting(val)}
              handleDeletionRequest={(val) => handleDeletionRequest(val)}
              handlePaneComponentChange={(val) => handlePaneComponentChange({ paneId, ...val })}
              handlePaneSize={(val) => handlePaneSize({ paneId, size: val })}
              setNewFile={(val) => handleAddFile(val)}
              removeFileExplorerItem={(val) => handleRemoveFileExplorerItem(val)}
              setMovedItem={(val) => handleMovedFileExplorerItem(val)}
              togglePaneFullScreen={() => togglePaneFullScreen(paneId)}
            />
          )
        )}
      </PanelGroup>
      <Suspense>
        <NewCharacterModal
          panelElement={getPanelElement(fullScreen.paneId)}
          show={newCharacterModal}
          setShow={() => setNewCharacterModal(false)}
          onSave={(val) => handleNewCharacterSave(val)}
          newCharacterName={newCharacterName}
        />
      </Suspense>
      <Suspense>
        <NewStorySettingModal
          panelElement={getPanelElement(fullScreen.paneId)}
          show={newStorySettingModal}
          setShow={() => setNewStorySettingModal(false)}
          onSave={(storySetting: StorySettingTypes) => handleNewStorySettingSave(storySetting)}
          newSettingTitle={newStorySettingTitle}
        />
      </Suspense>
      <Suspense>
        <DeletionConfirmationModal
          panelElement={getPanelElement(fullScreen.paneId)}
          show={deletionConfirmationModal}
          setShow={() => setDeletionConfirmationModal(false)}
          onDelete={() => handleDeleteItem(deletionItem.id, deletionItem.type)}
          item={deletionItem.title}
        />
      </Suspense>
    </div>
  );
}
