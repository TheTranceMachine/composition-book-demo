import { editor, IRange } from 'monaco-editor';

type EditorEnhanceTextTypes = {
  editorInstance: editor.IStandaloneCodeEditor | undefined;
  editorEnhancedSelection: string;
  editorSelectionRange: IRange;
};

const useEditorEnhanceText = ({ editorInstance, editorEnhancedSelection, editorSelectionRange }: EditorEnhanceTextTypes) => {
  if (!editorInstance) return;
  if (editorEnhancedSelection !== "") {
    const options = {
      range: editorSelectionRange,
      text: editorEnhancedSelection,
    };
    return editorInstance.executeEdits("enhance-text", [options]);
  }
  return false;
};

export { useEditorEnhanceText };
