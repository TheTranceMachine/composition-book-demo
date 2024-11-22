import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FileDataType } from "@/types/types";
import { FileObject } from "./FileExplorer";

type FileListPropsType = Readonly<{
  fileList: ReadonlyArray<FileDataType>;
  level: number;
  setSelectedFile: (file: FileDataType) => void;
}>;

export default function FileList({ fileList, level, setSelectedFile }: FileListPropsType): JSX.Element {
  const directories = fileList.filter((fileItem) => fileItem.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter((fileItem) => !fileItem.children);
  // nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];

  const [files, setFiles] = useState<FileDataType[]>(items);

  return (
    <ReactSortable
      tag="ul"
      list={JSON.parse(JSON.stringify(files))} // https://github.com/SortableJS/react-sortablejs/issues/149
      setList={(updatedFiles) => setFiles(updatedFiles as FileDataType[])}
      className="file-list"
      group="files"
      onStart={(val) => val.item.classList.add("selected")}
      onEnd={(val) => val.item.classList.remove("selected")}
    >
      {files.map((file) => (
        <FileObject key={file.id} file={file} level={level} setSelectedFile={(val) => setSelectedFile(val)} />
      ))}
    </ReactSortable>
  );
}
