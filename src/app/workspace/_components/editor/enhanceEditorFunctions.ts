import { EditorAction, MonacoEditorCurrentSelectionTypes } from "@/types/types";
import { editor } from 'monaco-editor';

type EnhanceEditorFunctionsTypes = {
  editor: editor.IStandaloneCodeEditor | undefined;
  editorActions: EditorAction[];
  newCharacter: (currentSelection: string) => void;
  newSetting: (currentSelection: string) => void;
  changeEditorCurrentSelection: (val: MonacoEditorCurrentSelectionTypes) => void;
  setEnhancementPaneOpen: () => void;
};

const enhanceEditorFunctions = ({
  editor,
  editorActions,
  newCharacter,
  newSetting,
  changeEditorCurrentSelection,
  setEnhancementPaneOpen,
}: EnhanceEditorFunctionsTypes) => {
  if (!editor) return;
  editorActions.map((action) => {
    editor.addAction({
      id: action.id,
      label: action.label,
      keybindings: action.keybindings,
      contextMenuGroupId: action.contextMenuGroupId,
      contextMenuOrder: action.contextMenuOrder,
      run: () => {
        const range = editor.getSelection();
        const model = editor.getModel();
        const currentSelection = range ? model?.getValueInRange(range) : null;
        switch (action.id) {
          case "create-new-character":
            newCharacter(currentSelection ?? "");
            break;
          case "create-new-setting":
            newSetting(currentSelection ?? "");
            break;
          case "ai-enhance":
            if (currentSelection) {
              changeEditorCurrentSelection({ range, currentSelection });
              setEnhancementPaneOpen();
            } else {
              alert('Please select text to enhance and then click "Enhance with AI"');
            }
            break;
          default:
            break;
        }
      },
    });
  });
  return editor;
};

export { enhanceEditorFunctions };