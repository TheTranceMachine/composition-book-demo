import { v4 as uuidv4 } from "uuid";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { uniqueObjectsById } from '@/utils/utils';
import { FileDataType } from "@/types/types";

export type NewFileDataType = {
  id: string;
  name: string;
  directoryId: string;
  type: string
};

const initialState = [
  {
    id: uuidv4(),
    name: "README.md",
    content: "# Welcome to the project!",
  },
  {
    id: uuidv4(),
    name: "Documents Test test",
    children: [
      {
        id: uuidv4(),
        name: "Word.doc",
        content: "This is a word document",
      },
      {
        id: uuidv4(),
        name: "Powerpoint.ppt",
        content: "This is a powerpoint presentation",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Downloads",
    children: [
      {
        id: uuidv4(),
        name: "unnamed.txt",
        content: "This is a text file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "foo.txt",
            content: "This is a text file",
          },
          {
            id: uuidv4(),
            name: "bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Testing",
    children: [
      {
        id: uuidv4(),
        name: "unnamed.txt",
        content: "This is a text file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "foo.txt",
            content: "This is a text file",
          },
          {
            id: uuidv4(),
            name: "bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Jokes",
    children: [
      {
        id: uuidv4(),
        name: "joke.md",
        content: "This is a markdown file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "foo.pdf",
            content: "This is a pdf file",
          },
          {
            id: uuidv4(),
            name: "bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Favourites",
    children: [
      {
        id: uuidv4(),
        name: "food.txt",
        content: "This is a text file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "cake.txt",
            content: "This is a text file",
          },
          {
            id: uuidv4(),
            name: "choco-bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Comedies",
    children: [
      {
        id: uuidv4(),
        name: "loopy.txt",
        content: "This is a text file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "fake.txt",
            content: "This is a text file",
          },
          {
            id: uuidv4(),
            name: "monkey-bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Dramas",
    children: [
      {
        id: uuidv4(),
        name: "sad.txt",
        content: "This is a text file",
      },
      {
        id: uuidv4(),
        name: "Misc",
        children: [
          {
            id: uuidv4(),
            name: "fools.txt",
            content: "This is a text file",
          },
          {
            id: uuidv4(),
            name: "bar.txt",
            content: "This is a text file",
          },
        ],
      },
    ],
  },
];

export const panesSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<NewFileDataType>) => {
      // filter through state.files including children array if it's present and return the array of matched directories
      const filterThroughDir = (files: FileDataType[], id: string): FileDataType[] => {
        return files.reduce((acc: FileDataType[], file) => {
          if (file.id === id) {
            acc.push(file);
          }
          if (file.children) {
            const children = filterThroughDir(file.children, id);
            if (children.length) {
              acc.push(...children);
            }
          }
          return acc;
        }, []);
      };
      const filteredArray = filterThroughDir(state, (action.payload as NewFileDataType).directoryId);
      if (!!filteredArray.length) {
        // Directory found, Create this file/dir in the directory
        filteredArray[0].children = [
          ...(filteredArray[0].children || []),
          {
            id: (action.payload as NewFileDataType).id,
            name: (action.payload as NewFileDataType).name,
            ...((action.payload as NewFileDataType).type === "dir" && { children: [] }),
          },
        ];
        return uniqueObjectsById<FileDataType>([...state])
      } else {
        // Directory not found, Create this file/dir in the root directory
        return uniqueObjectsById<FileDataType>([
          ...state,
          {
            id: (action.payload as NewFileDataType).id,
            name: (action.payload as NewFileDataType).name,
            ...((action.payload as NewFileDataType).type === "dir" && { children: [] }),
          },
        ]);
      }
    }
  },
})

export const { addFile } = panesSlice.actions
export default panesSlice.reducer