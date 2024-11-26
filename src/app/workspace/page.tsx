'use client'

import dynamic from 'next/dynamic'
import { Suspense, lazy, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { PanelGroup } from "react-resizable-panels";
import { SortableEvent } from "react-sortablejs";
import { useMediaQuery } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { toast, Toaster } from "sonner";
import { setStorySetting, removeStorySetting } from "@/redux/slices/storySettingsSlice";
import {
  setCharacter,
  removeCharacter,
} from "@/redux/slices/charactersSlice";
import {
  addPane,
  removePane,
  shiftPanes,
  setPaneOrder,
  setPaneActive,
  addTab,
  removeTab,
  setTabActive,
  updateTab,
  updateTabContent,
  sortTabs,
} from "@/redux/slices/panesSlice";
import { setEditorEnhancedSelection, setEditorCurrentSelection, setEditorSelectionRange } from "@/redux/slices/editorSlice";
import { addFile } from "@/redux/slices/fileExplorerSlice";
import { FileDataType, CharacterTypes, StorySettingTypes, PaneTypes, EditorTypes, MovedTabs, MonacoEditorCurrentSelectionTypes, DeletionItemType, CharactersState, StorySettingsState } from "@/types/types";
import "./Workspace.css";

const WorkspacePane = dynamic(() => import('./components/pane/WorkspacePane'), {
  ssr: false,
})

const NewCharacterModal = lazy(() => import("./components/modals/NewCharacterModal"));
const NewStorySettingModal = lazy(() => import("./components/modals/NewStorySettingModal"));
const DeletionConfirmationModal = lazy(() => import("./components/modals/DeletionConfirmationModal"));

type HandlePaneComponentChangeTypes = { paneId: string; name: string; type?: string; tabId: string; component: string; };

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

  const [movedTabs, setMovedTabs] = useState<MovedTabs>({ from: { paneId: '', tabId: '' }, to: { paneId: '', tabId: '' } });

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
    dispatch(addPane({ id: newPaneId, order: panes.length + 1, active: true, tabs: [tab] }));
  }

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
    } else {
      dispatch(removeCharacter(id));
    }
    setDeletionConfirmationModal(false);
    toast.success(`${type} deleted successfully`);
  };

  const handleAddNewPane = (pane: { paneId: string; order: number }) => {
    const tab = { id: uuidv4(), name: "Pane Manager", content: "", active: true };
    const newPaneId = uuidv4();

    dispatch(shiftPanes(pane.order));
    dispatch(addPane({ id: newPaneId, order: pane.order + 1, active: true, tabs: [tab] }));
    dispatch(setPaneOrder());
    dispatch(setPaneActive(newPaneId));
  };

  const handleSelectedFile = (file: FileDataType) => {
    if (!panes.length) {
      dispatch(addPane({ id: uuidv4(), order: 1, active: true, tabs: [{ ...file, active: true }] }));
    } else {
      const tabExists = panes.map((pane) => {
        const tab = pane.tabs.find((tab) => tab.id === file.id);
        if (!!tab) {
          return { pane, tab };
        } else {
          return null;
        }
      });
      if (tabExists[0] !== null) {
        dispatch(setTabActive({ paneId: tabExists[0].pane.id, tabId: tabExists[0].tab.id }));
      } else {
        dispatch(addTab(file));
      }
    }
  };

  const handleRemoveTab = ({ paneId, tabId }: { paneId: string; tabId: string }) => {
    const activePane = panes.find((pane) => pane.id === paneId);
    if (activePane) {
      const activeTabIndex = activePane.tabs.findIndex((tab) => tab.id === tabId);
      if (activeTabIndex === 0 && activePane.tabs.length > 1) {
        dispatch(setTabActive({ paneId, tabId: activePane.tabs[1].id }));
      } else if (activeTabIndex > 0) {
        dispatch(setTabActive({ paneId, tabId: activePane.tabs[activeTabIndex - 1].id }));
      }
      dispatch(removeTab(tabId));
    }
  };

  const handleTabContentUpdate = ({ tabId, content, paneId }: { tabId: string; content: string | undefined; paneId: string }) => {
    dispatch(updateTabContent({ paneId, tabId, content }));
  };

  const handleSelectTab = ({ paneId, tabId }: { paneId: string; tabId: string }) => {
    dispatch(setTabActive({ paneId, tabId }));
  };

  const handleSelectTabOnMove = (onMoveData: SortableEvent) => {
    const toPaneId = onMoveData.to.parentElement?.parentElement?.parentElement?.dataset.panelId || "";
    const fromPaneId = onMoveData.from.parentElement?.parentElement?.parentElement?.dataset.panelId || "";
    const tabId = onMoveData.item.dataset.id || "";
    const inactiveTab = panes.find((pane) => pane.id === fromPaneId)?.tabs.find((tab) => tab.id !== tabId);

    setMovedTabs({
      from: { paneId: fromPaneId, tabId: inactiveTab?.id },
      to: { paneId: toPaneId, tabId },
    });
  };

  const handlePaneComponentChange = ({ paneId, tabId, component, type }: HandlePaneComponentChangeTypes) => {
    dispatch(updateTab({ paneId, tabId, name: component }));
    if (type === "file") {
      // Add new file to the file explorer
      dispatch(addFile({ id: uuidv4(), name: component, directoryId: uuidv4(), type }));
    }
  };

  useEffect(() => {
    if (movedTabs.to.paneId !== '' && movedTabs.to.tabId !== '') {
      dispatch(setTabActive({ paneId: movedTabs.to.paneId, tabId: movedTabs.to.tabId }));
    }
    if (movedTabs.from.paneId !== '' && movedTabs.from.tabId && movedTabs.from.tabId !== '') {
      dispatch(setTabActive({ paneId: movedTabs.from.paneId, tabId: movedTabs.from.tabId }));
    }
  }, [movedTabs, dispatch]);

  // Pane cleanup
  useEffect(() => {
    if (!!panes.length) {
      for (const pane of panes) {
        if (!pane.tabs.length) {
          dispatch(removePane(pane.id));
        }
      }
    }
  }, [panes, dispatch]);

  return (
    <div className="workspace w-full h-full">
      <PanelGroup direction="horizontal">
        {panes.map(({ id: paneId, order, tabs }) => (
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
            setEnhancementPaneOpen={handleOpenEnhancementPane}
            handleSelectedFile={(val) => handleSelectedFile(val)}
            setTabContent={(val) => handleTabContentUpdate({ ...val, paneId })}
            setTabActive={(val) => handleSelectTab({ paneId, tabId: val })}
            setActiveTabOnMove={(val) => handleSelectTabOnMove(val)}
            sortTabs={(val) => dispatch(sortTabs(val))}
            removeTab={(val) => handleRemoveTab(val)}
            addPane={(val) => handleAddNewPane(val)}
            setPaneActive={(val) => dispatch(setPaneActive(val))}
            handleEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
            handleNewCharacter={(val) => handleNewCharacter(val)}
            handleNewSetting={(val) => handleNewSetting(val)}
            handleDeletionRequest={(val) => handleDeletionRequest(val)}
            handlePaneComponentChange={(val) => handlePaneComponentChange({ paneId, ...val })}
          />
        ))}
      </PanelGroup>
      <Suspense>
        <NewCharacterModal
          show={newCharacterModal}
          setShow={() => setNewCharacterModal(false)}
          onSave={(val) => handleNewCharacterSave(val)}
          newCharacterName={newCharacterName}
        />
      </Suspense>
      <Suspense>
        <NewStorySettingModal
          show={newStorySettingModal}
          setShow={() => setNewStorySettingModal(false)}
          onSave={(storySetting: StorySettingTypes) => handleNewStorySettingSave(storySetting)}
          newSettingTitle={newStorySettingTitle}
        />
      </Suspense>
      <Suspense>
        <DeletionConfirmationModal
          show={deletionConfirmationModal}
          setShow={() => setDeletionConfirmationModal(false)}
          onDelete={() => handleDeleteItem(deletionItem.id, deletionItem.type)}
          item={deletionItem.title}
          type={deletionItem.type}
        />
      </Suspense>
      <Toaster visibleToasts={4} closeButton />
    </div>
  );
};
