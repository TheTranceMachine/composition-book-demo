import { useEffect, useState } from "react";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { FileDataType } from "@/types/types";
import FileObject from "./components/FileObject";
import CustomContextMenu from "@/app/workspace/_components/fileExplorer/components/CustomContextMenu";

type FileListPropsType = Readonly<{
  data: ReadonlyArray<FileDataType>;
  setSelectedFile: (file: FileDataType) => void;
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string; directoryId: string; type: string; }) => void;
  setMovedItem: (state: SortableEvent) => void;
  level: number;
}>;

const FileExplorer = ({ data, setSelectedFile, panelExpanded, setNewFile, setMovedItem, level }: FileListPropsType): JSX.Element => {
  const directories = data.filter((fileItem) => fileItem.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = data.filter((fileItem) => !fileItem.children);
  // nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];

  const [files, setFiles] = useState<FileDataType[]>([]);

  useEffect(() => {
    setFiles(items);
  }, []);

  useEffect(() => {
    setFiles(items);
  }, [data]);

  const handleMovedItem = (dataOnMove: SortableEvent) => {
    dataOnMove.item.classList.remove("selected");
    setMovedItem(dataOnMove);
  };

  const createNewFile = ({ fileId, type, event }: { fileId: string; type: string; event: React.KeyboardEvent<HTMLInputElement>; }) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const inputVal = input.value;
      if (inputVal) {
        setNewFile({ name: inputVal, directoryId: fileId, type });
      }
    }
  };

  return !!files.length ? (
    <ReactSortable
      tag="ul"
      list={JSON.parse(JSON.stringify(files))} // https://github.com/SortableJS/react-sortablejs/issues/149
      setList={(updatedFiles) => setFiles(updatedFiles as FileDataType[])}
      className="file-list"
      group="files"
      onStart={(val) => val.item.classList.add("selected")}
      onEnd={(val) => handleMovedItem(val)}
    >
      {files.map((file) => (
        <li className={`file-item ${level === 0 ? 'border-b border-b-gray-900' : ''} ${level > 1 ? 'pl-6' : ''}`} id={file.id} key={file.id}>
          <CustomContextMenu handleInput={(val) => createNewFile({ fileId: file.id, ...val })}>
            <FileObject
              file={file}
              setSelectedFile={(val) => setSelectedFile(val)}
              panelExpanded={panelExpanded}
              setNewFile={(val) => setNewFile(val)}
              setMovedItem={(val) => handleMovedItem(val)}
              level={level + 1}
            />
          </CustomContextMenu>
        </li>
      ))}
    </ReactSortable>
  ) : (
    <div className="text-white">No files found</div>
  );
}

export default FileExplorer;