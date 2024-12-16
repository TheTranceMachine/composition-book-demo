import { v4 as uuidv4 } from "uuid";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { uniqueObjectsById } from '@/utils/utils';
import { FileDataType } from "@/types/types";


interface PayloadFileDataType extends FileDataType {
  directoryId: string;
}

interface PayloadMoveFileDataType extends FileDataType {
  directoryId: string;
  children: FileDataType[];
}

// const initialState: FileDataType[] = [
//   {
//     id: uuidv4(),
//     name: "README.md",
//     content: "# Welcome to the project!",
//   },
//   {
//     id: uuidv4(),
//     name: "Documents Test test",
//     children: [
//       {
//         id: uuidv4(),
//         name: "Word.doc",
//         content: "This is a word document",
//       },
//       {
//         id: uuidv4(),
//         name: "Powerpoint.ppt",
//         content: "This is a powerpoint presentation",
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Downloads",
//     children: [
//       {
//         id: uuidv4(),
//         name: "unnamed.txt",
//         content: "This is a text file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "foo.txt",
//             content: "This is a text file",
//           },
//           {
//             id: uuidv4(),
//             name: "bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Testing",
//     children: [
//       {
//         id: uuidv4(),
//         name: "unnamed.txt",
//         content: "This is a text file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "foo.txt",
//             content: "This is a text file",
//           },
//           {
//             id: uuidv4(),
//             name: "bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Jokes",
//     children: [
//       {
//         id: uuidv4(),
//         name: "joke.md",
//         content: "This is a markdown file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "foo.pdf",
//             content: "This is a pdf file",
//           },
//           {
//             id: uuidv4(),
//             name: "bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Favourites",
//     children: [
//       {
//         id: uuidv4(),
//         name: "food.txt",
//         content: "This is a text file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "cake.txt",
//             content: "This is a text file",
//           },
//           {
//             id: uuidv4(),
//             name: "choco-bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Comedies",
//     children: [
//       {
//         id: uuidv4(),
//         name: "loopy.txt",
//         content: "This is a text file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "fake.txt",
//             content: "This is a text file",
//           },
//           {
//             id: uuidv4(),
//             name: "monkey-bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Dramas",
//     children: [
//       {
//         id: uuidv4(),
//         name: "sad.txt",
//         content: "This is a text file",
//       },
//       {
//         id: uuidv4(),
//         name: "Misc",
//         children: [
//           {
//             id: uuidv4(),
//             name: "fools.txt",
//             content: "This is a text file",
//           },
//           {
//             id: uuidv4(),
//             name: "bar.txt",
//             content: "This is a text file",
//           },
//         ],
//       },
//     ],
//   },
// ];

const initialState: FileDataType[] = [];

const addIntoDirectories = (items: FileDataType[], payload: PayloadFileDataType, type: string) => {
  items.map((dir) => {
    if (dir.id === payload.directoryId) {
      dir.children?.push({
        id: payload.id,
        name: payload.name,
        ...(type === 'file' ? { content: payload.content } : { children: payload.children }),
      });
    } else {
      addIntoDirectories(dir.children || [], payload, type);
    }
  });
}

export const panesSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PayloadFileDataType>) => {
      if (action.payload.directoryId !== '') {
        addIntoDirectories(state, action.payload, 'dir');
      } else {
        state.push({
          id: action.payload.id,
          name: action.payload.name,
          children: action.payload.children || [],
        })
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string, directoryId: string }>) => {
      const removeFromDirectories = (items: FileDataType[]) => {
        items.map((dir) => {
          if (dir.id === action.payload.directoryId) {
            dir.children = dir.children?.filter((file) => file.id !== action.payload.id);
          } else {
            removeFromDirectories(dir.children || []);
          }
        });
      }
      if (action.payload.directoryId !== '') {
        removeFromDirectories(state);
      } else {
        return state.filter((file) => file.id !== action.payload.id);
      }
    },
    addFile: (state, action: PayloadAction<PayloadFileDataType>) => {
      if (action.payload.directoryId !== '') {
        addIntoDirectories(state, action.payload, 'file');
      } else {
        state.push({
          id: action.payload.id,
          name: action.payload.name,
          content: action.payload.content,
        })
      }
    },
  },
})

export const { addItem, removeItem, addFile } = panesSlice.actions
export default panesSlice.reducer