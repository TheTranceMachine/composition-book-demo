import { useRef } from "react";
import * as monaco from "monaco-editor";
import { renderToString } from "react-dom/server";
import Popup from "./Popup";
import { CharacterTypes, StorySettingTypes } from "@/types/types";

type showPopupTypes = {
  position: monaco.Position
  title: string
  description: string
  type: string
  currentWidgetIdRef: { current: string }
};

type UseEditorPopupTypes = {
  editorInstance: monaco.editor.IStandaloneCodeEditor | undefined;
  characters: Array<CharacterTypes>;
  storySettings: Array<StorySettingTypes>;
};

const useEditorPopup = ({ editorInstance, characters, storySettings }: UseEditorPopupTypes) => {
  const currentWidgetIdRef = useRef<string>("");
  if (!editorInstance) return;
  const createPopupContent = (title: string, description: string, type: string) => {
    const domNode = document.createElement("div");
    domNode.innerHTML = renderToString(<Popup title={title} description={description} type={type} />);
    return domNode;
  };
  const showPopup = ({ position, title, description, type, currentWidgetIdRef }: showPopupTypes) => {
    hidePopup(); // Ensure any existing popup is removed before showing a new one

    const contentWidget = {
      domNode: createPopupContent(title, description, type),
      getId: () => `my.widget.${title}`,
      getDomNode: function () {
        return this.domNode;
      },
      getPosition: function () {
        return {
          position: position,
          preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
        };
      },
    };

    currentWidgetIdRef.current = contentWidget.getId();

    editorInstance?.addContentWidget(contentWidget);
  };

  const hidePopup = () => {
    if (currentWidgetIdRef.current) {
      const contentWidget: monaco.editor.IContentWidget = {
        getId: () => currentWidgetIdRef.current,
        getDomNode: () => document.createElement("div"),
        getPosition: () => null,
      };
      editorInstance?.removeContentWidget(contentWidget);
      currentWidgetIdRef.current = "";
    }
  };

  // Show popup when hovering over character or story setting names

  return editorInstance.onMouseMove((event: monaco.editor.IEditorMouseEvent) => {
    if (!characters.length && !storySettings.length) return;
    const target = event.target.element;
    const position = event.target.position;
    if (!position) {
      hidePopup();
      return;
    }
    const model = editorInstance.getModel();
    const word = model?.getWordAtPosition(position);
    // check if there's a character with name equal to the word
    if (word) {
      const character = characters.find(({ name }: CharacterTypes) => name === word.word);
      const storySetting = storySettings.find(({ title }: { title: string }) => title === word.word);
      // TODO: What if a character and a story setting have the same name?
      if (character || storySetting) {
        showPopup({
          position,
          title: word.word,
          description: character ? character.description : storySetting ? storySetting.description : "",
          type: character ? "character" : "story setting",
          currentWidgetIdRef,
        });
      } else {
        hidePopup();
      }
    } else {
      hidePopup();
    }
  });
};

export { useEditorPopup };
