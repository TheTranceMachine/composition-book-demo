const useEditorEnhanceText = ({ editorInstance, editorEnhancedSelection, editorSelectionRange }) => {
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
