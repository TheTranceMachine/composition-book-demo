"use client";

import { memo, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { editor, Range } from "monaco-editor";
import { toast } from "sonner";
import { enhanceEditorFunctions } from "./enhanceEditorFunctions";
import { CharacterTypes, MonacoEditorCurrentSelectionTypes, StorySettingTypes } from "@/types/types";
import { useEditorDecorations } from "@hooks/useEditorDecorations";
import { useEditorEnhanceText } from "@hooks/useEditorEnhanceText";
import { useEditorPopup } from "./Popup/useEditorPopup";
import editorActions from "./editor-actions";
import MinimizedView from "./MinimizedView";
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
  panelExpanded: boolean | 0 | undefined;
  panelVerticalSize?: number | undefined;
  fullScreen: boolean;
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
  panelExpanded,
  panelVerticalSize,
  fullScreen,
}: MonacoEditorTypes) => {
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | undefined>(undefined);
  const [height, setHeight] = useState<number | null>(null);

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

  const vhToPixels = () => {
    const tabsAreaHeight = 32;
    return panelVerticalSize !== undefined
      ? window.innerHeight * (panelVerticalSize / 100) - tabsAreaHeight
      : window.innerHeight - tabsAreaHeight;
  };

  const handleEditorWillMount = () => {
    setHeight(vhToPixels());
  };

  useEffect(() => {
    setHeight(vhToPixels());
  }, [panelVerticalSize]);

  useEffect(() => {
    if (fullScreen) {
      const tabsAreaHeight = 32;
      setHeight(window.screen.height - tabsAreaHeight);
    } else {
      // it takes 150ms for the browser to update the window.innerHeight
      setTimeout(() => setHeight(vhToPixels()), 150);
    }
  }, [fullScreen]);

  return panelExpanded ? (
    <Editor
      className={`editor w-full`}
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
      height={`${height}px`}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      onChange={(val: string | undefined) => handleEditorChange(val)}
    />
  ) : (
    <div className="flex items-center justify-center w-full">
      <MinimizedView />
    </div>
  );
};

export default memo(MonacoEditor);
