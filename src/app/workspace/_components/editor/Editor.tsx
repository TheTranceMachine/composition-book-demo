"use client";

import { memo, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import MinimizedView from "./MinimizedView";
import "./Editor.scss";

export type MonacoEditorTypes = {
  editorValue: string | undefined;
  panelExpanded: boolean | 0 | undefined;
  panelVerticalSize?: number | undefined;
  fullScreen: boolean;
};

const MonacoEditor = ({ editorValue, panelExpanded, panelVerticalSize, fullScreen }: MonacoEditorTypes) => {
  const [height, setHeight] = useState<number | null>(null);

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
    />
  ) : (
    <div className="flex items-center justify-center w-full">
      <MinimizedView />
    </div>
  );
};

export default memo(MonacoEditor);
