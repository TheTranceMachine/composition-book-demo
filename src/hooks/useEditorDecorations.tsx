import { editor } from 'monaco-editor';
import { CharacterTypes, StorySettingTypes } from "@/types/types";
import { findMatchesAndDecorate } from "@/utils/utils";

type useEditorDecorationsTypes = {
  editorInstance: editor.IStandaloneCodeEditor | undefined;
  characters: CharacterTypes[];
  storySettings: StorySettingTypes[];
};

const useEditorDecorations = ({ editorInstance, characters, storySettings }: useEditorDecorationsTypes) => {
  if (!editorInstance) return;
  const model = editorInstance.getModel();
  const newCharacterDecorations = findMatchesAndDecorate(model, characters, "character-decoration");
  const newStorySettingDecorations = findMatchesAndDecorate(model, storySettings, "story-setting-decoration");

  return editorInstance.createDecorationsCollection([...newCharacterDecorations, ...newStorySettingDecorations]);
};

export { useEditorDecorations };
