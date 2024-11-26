"use client";

import { memo, useState } from "react";
import Editor from "@monaco-editor/react";
import { editor, Range } from 'monaco-editor';
import { toast } from "sonner";
import { enhanceEditorFunctions } from "./enhanceEditorFunctions";
import { CharacterTypes, MonacoEditorCurrentSelectionTypes, StorySettingTypes } from "@/types/types";
import { useEditorDecorations } from "@hooks/useEditorDecorations";
import { useEditorEnhanceText } from "@hooks/useEditorEnhanceText";
import { useEditorPopup } from "./Popup/useEditorPopup";
import editorActions from "./editor-actions";
import "./Editor.scss";

export type MonacoEditorTypes = {
  changeEditorCurrentSelection: (selection: MonacoEditorCurrentSelectionTypes) => void;
  editorEnhancedSelection: string;
  editorSelectionRange: Range;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
  newCharacter: (name: string) => void;
  newSetting: (title: string) => void;
  setEnhancementPaneOpen: () => void;
  handleEditorChange: (value: string | undefined) => void;
  editorValue: string | undefined;
};

const MonacoEditor = ({
  changeEditorCurrentSelection,
  editorEnhancedSelection,
  editorSelectionRange,
  characters,
  storySettings,
  newCharacter,
  newSetting,
  setEnhancementPaneOpen,
  handleEditorChange,
  editorValue,
}: MonacoEditorTypes) => {
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | undefined>(undefined);

  useEditorPopup({ editorInstance, characters, storySettings });

  // Decorate the editor with characters and story settigns
  // TODO: fix bug when character name is the same as story setting name
  useEditorDecorations({ editorInstance, characters, storySettings });

  // TODO: test if this works - it's about enhancing the text when changes appear
  const enhancedText = useEditorEnhanceText({ editorInstance, editorEnhancedSelection, editorSelectionRange });
  if (enhancedText) {
    toast.success("Your text has been enhanced!");
  }

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    const editorConfiguration = enhanceEditorFunctions({
      editor,
      editorActions,
      newCharacter,
      newSetting,
      changeEditorCurrentSelection,
      setEnhancementPaneOpen,
    });

    setEditorInstance(editorConfiguration);
  };

  return (
    <Editor
      className="editor w-full"
      defaultLanguage="plaintext"
      theme="vs-dark"
      value={editorValue}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        contextmenu: true,
        wordWrap: "on",
      }}
      width="100%"
      onMount={handleEditorDidMount}
      onChange={(val: string | undefined) => handleEditorChange(val)}
    />
  );
};

export default memo(MonacoEditor);
