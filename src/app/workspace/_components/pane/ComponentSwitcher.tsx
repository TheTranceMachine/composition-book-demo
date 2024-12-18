import dynamic from "next/dynamic";
import { Selection } from "monaco-editor";
// import { AiEnhancements } from "../AiEnhancements/AiEnhancements";
import {
  CharacterTypes,
  DeletionItemType,
  FileDataType,
  MonacoEditorCurrentSelectionTypes,
  StorySettingTypes,
} from "@/types/types";
import CharactersPane from "../characters/Characters";
import StorySettingsPane from "../storySettings/StorySettings";
import FileExplorer from "../fileExplorer/FileExplorer";
import WorkspacePaneManager from "../manager/WorkspacePaneManager";
import { SortableEvent } from "react-sortablejs";
import CustomContextMenu from "../fileExplorer/components/CustomContextMenu";
import NoFilesSpace from "../fileExplorer/components/NoFilesSpace";

// https://www.npmjs.com/package/@monaco-editor/react#for-nextjs-users
const MonacoEditor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
});

type ComponentSwitcherPropTypes = {
  panelElement: HTMLDivElement | null;
  id: string;
  component: string;
  content: string | undefined;
  files: FileDataType[];
  editorSelectionRange: Selection;
  editorEnhancedSelection: string;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  panelExpanded: boolean | 0 | undefined;
  panelVerticalSize?: number | undefined;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: FileDataType) => void;
  handleEditorChange: (val: { tabId: string; content: string | undefined }) => void;
  handleEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  handleNewCharacter: (val: string) => void;
  handleNewSetting: (val: string) => void;
  handleDeletionRequest: (val: DeletionItemType) => void;
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  removeFileExplorerItem: (val: { id: string; name: string; type: string }) => void;
  setMovedItem: (val: SortableEvent) => void;
};

const ComponentSwitcher = ({
  panelElement,
  id,
  component,
  content,
  files,
  editorEnhancedSelection,
  editorSelectionRange,
  characters,
  storySettings,
  panelExpanded,
  panelVerticalSize,
  setEnhancementPaneOpen,
  handleSelectedFile,
  handleEditorChange,
  handleEditorCurrentSelection,
  handleNewCharacter,
  handleNewSetting,
  handleDeletionRequest,
  handlePaneComponentChange,
  setNewFile,
  removeFileExplorerItem,
  setMovedItem,
}: ComponentSwitcherPropTypes) => {
  switch (component) {
    case "Pane Manager":
      return (
        <WorkspacePaneManager
          handlePaneComponentChange={(val) => handlePaneComponentChange(val)}
          panelExpanded={panelExpanded}
        />
      );
    case "New File":
      return (
        <MonacoEditor
          changeEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
          editorEnhancedSelection={editorEnhancedSelection}
          editorSelectionRange={editorSelectionRange}
          characters={characters}
          storySettings={storySettings}
          newCharacter={(val) => handleNewCharacter(val)}
          newSetting={(val) => handleNewSetting(val)}
          setEnhancementPaneOpen={setEnhancementPaneOpen}
          handleEditorChange={(val) => handleEditorChange({ tabId: id, content: val })}
          editorValue={content}
          panelExpanded={panelExpanded}
          panelVerticalSize={panelVerticalSize}
        />
      );
    case "File Explorer":
      return !!files.length ? (
        <>
          <FileExplorer
            data={files}
            setSelectedFile={(val) => handleSelectedFile(val)}
            panelExpanded={panelExpanded}
            setMovedItem={(val) => setMovedItem(val)}
            level={0}
            setNewFile={setNewFile}
            removeFileExplorerItem={(val) => removeFileExplorerItem(val)}
            panelElement={panelElement}
          />
          <CustomContextMenu
            handleInput={(val) => setNewFile({ directoryId: "", ...val })}
            panelElement={panelElement}
          >
            <div className="diagonal-background border-b border-b-gray-900">&nbsp;</div>
          </CustomContextMenu>
        </>
      ) : (
        <NoFilesSpace panelExpanded={panelExpanded} setNewFile={setNewFile} panelElement={panelElement} />
      );
    case "Characters":
      return (
        <CharactersPane
          characters={characters}
          removeCharacter={({ id, name: title }) => handleDeletionRequest({ id, title, type: "character" })}
          panelExpanded={panelExpanded}
        />
      );
    case "Story Settings":
      return (
        <StorySettingsPane
          storySettings={storySettings}
          removeStorySetting={({ id, title }) => handleDeletionRequest({ id, title, type: "story setting" })}
          panelExpanded={panelExpanded}
        />
      );
    // case "Enhancements":
    //   return <AiEnhancements />;
    default:
      return (
        <MonacoEditor
          changeEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
          editorEnhancedSelection={editorEnhancedSelection}
          editorSelectionRange={editorSelectionRange}
          characters={characters}
          storySettings={storySettings}
          newCharacter={(val) => handleNewCharacter(val)}
          newSetting={(val) => handleNewSetting(val)}
          setEnhancementPaneOpen={setEnhancementPaneOpen}
          handleEditorChange={(val) => handleEditorChange({ tabId: id, content: val })}
          editorValue={content}
          panelExpanded={panelExpanded}
          panelVerticalSize={panelVerticalSize}
        />
      );
  }
};

export default ComponentSwitcher;
