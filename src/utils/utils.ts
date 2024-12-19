import { editor } from "monaco-editor";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CharacterTypes, StorySettingTypes } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findMatchesAndDecorate = (
  model: editor.ITextModel | null,
  matchArray: CharacterTypes[] | StorySettingTypes[],
  decorationClass: string
): editor.IModelDeltaDecoration[] => {
  const matches = matchArray.map((item) => {
    const searchString = "name" in item ? item.name : item.title; // The string used to search. If it is a regular expression, set isRegex to true
    const searchOnlyEditableRange = true; // Limit the searching to only search inside the editable range of the model
    const isRegex = false; // Used to indicate that searchString is a regular expression
    const matchCase = true; // Force the matching to match lower/upper case exactly
    const wordSeparators = null; // Force the matching to match entire words only. Pass null otherwise
    const captureMatches = true; // The result will contain the captured groups
    const limitResultCount = 1; // Limit the number of results
    return model?.findMatches(
      searchString,
      searchOnlyEditableRange,
      isRegex,
      matchCase,
      wordSeparators,
      captureMatches,
      limitResultCount
    );
  });

  if (matches[0] && !!matches[0].length) {
    const decorations = matches.map((match) => {
      if (!match) return;
      return {
        range: match[0].range,
        options: {
          inlineClassName: decorationClass,
          stickiness: 1,
        },
      };
    });
    return decorations.filter((decoration) => !!decoration);
  }
  return [];
};

function uniqueObjectsById<T extends { id: string }>(arr: T[]) {
  const map = new Map();
  for (const obj of arr) {
    if (!map.has(obj.id)) {
      map.set(obj.id, obj);
    }
  }
  return Array.from(map.values());
}

export { uniqueObjectsById };
