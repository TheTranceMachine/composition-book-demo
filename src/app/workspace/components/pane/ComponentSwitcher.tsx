import dynamic from 'next/dynamic'
import { Selection } from 'monaco-editor';
// import { AiEnhancements } from "../AiEnhancements/AiEnhancements";
import { CharacterTypes, DeletionItemType, FileDataType, MonacoEditorCurrentSelectionTypes, StorySettingTypes } from "@/types/types";
import CharactersPane from "../characters/Characters";
import StorySettingsPane from "../storySettings/StorySettings";
// import MonacoEditor from "../editor/Editor";
import FileExplorer from "../fileExplorer/FileExplorer";
import WorkspacePaneManager from "../manager/WorkspacePaneManager";

// https://www.npmjs.com/package/@monaco-editor/react#for-nextjs-users
const MonacoEditor = dynamic(() => import('../editor/Editor'), {
  ssr: false,
})

type ComponentSwitcherPropTypes = {
  id: string;
  component: string;
  content: string | undefined;
  files: FileDataType[];
  editorSelectionRange: Selection;
  editorEnhancedSelection: string;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  panelSize: number | undefined;
  setEnhancementPaneOpen: () => void;
  handleSelectedFile: (val: FileDataType) => void;
  handleEditorChange: (val: { tabId: string, content: string | undefined }) => void;
  handleEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  handleNewCharacter: (val: string) => void;
  handleNewSetting: (val: string) => void;
  handleDeletionRequest: (val: DeletionItemType) => void;
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
};

const ComponentSwitcher = ({
  id,
  component,
  content,
  files,
  editorEnhancedSelection,
  editorSelectionRange,
  characters,
  storySettings,
  panelSize,
  setEnhancementPaneOpen,
  handleSelectedFile,
  handleEditorChange,
  handleEditorCurrentSelection,
  handleNewCharacter,
  handleNewSetting,
  handleDeletionRequest,
  handlePaneComponentChange,
}: ComponentSwitcherPropTypes) => {
  console.log('ComponentSwitcher', component);
  switch (component) {
    case "Pane Manager":
      return <WorkspacePaneManager handlePaneComponentChange={(val) => handlePaneComponentChange(val)} />;
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
        />
      );
    case "File Explorer":
      return (
        <div className="m-3">
          <FileExplorer data={files} setSelectedFile={(val) => handleSelectedFile(val)} />
        </div>
      );
    case "Characters":
      return (
        <CharactersPane
          characters={characters}
          removeCharacter={({ id, name: title }) =>
            handleDeletionRequest({ id, title, type: "character" })
          }
          panelSize={panelSize}
        />
      );
    case "Story Settings":
      return (
        <StorySettingsPane
          storySettings={storySettings}
          removeStorySetting={({ id, title }) =>
            handleDeletionRequest({ id, title, type: "story setting" })
          }
          panelSize={panelSize}
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
        />
      );
  }
};

export default ComponentSwitcher;
