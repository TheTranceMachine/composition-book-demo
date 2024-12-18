import { useEffect, useState } from "react";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { FileDataType } from "@/types/types";
import FileObject from "./components/FileObject";
import CustomContextMenu from "@/app/workspace/_components/fileExplorer/components/CustomContextMenu";

type FileListPropsType = Readonly<{
  panelElement: HTMLDivElement | null;
  data: ReadonlyArray<FileDataType>;
  setSelectedFile: (file: FileDataType) => void;
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  removeFileExplorerItem: (val: { id: string; name: string; type: string }) => void;
  setMovedItem: (state: SortableEvent) => void;
  level: number;
}>;

const FileExplorer: React.FC<FileListPropsType> = ({
  panelElement,
  data,
  setSelectedFile,
  panelExpanded,
  setNewFile,
  removeFileExplorerItem,
  setMovedItem,
  level,
}) => {
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
    dataOnMove.item.classList.remove("pl-6");
    setMovedItem(dataOnMove);
  };

  return (
    <ReactSortable
      tag="ul"
      list={JSON.parse(JSON.stringify(files))} // https://github.com/SortableJS/react-sortablejs/issues/149
      setList={(updatedFiles) => setFiles(updatedFiles as FileDataType[])}
      className="file-list"
      group="files"
      onStart={(val) => val.item.classList.add("pl-6")}
      onEnd={(val) => handleMovedItem(val)}
    >
      {files.map((file) => (
        <li
          className={`file-item ${level === 0 ? "border-b border-b-gray-900" : ""} ${level > 1 ? "pl-6" : ""}`}
          id={file.id}
          key={file.id}
        >
          <CustomContextMenu
            handleInput={(val) => setNewFile({ directoryId: file.id, ...val })}
            removeFileExplorerItem={() =>
              removeFileExplorerItem({
                id: file.id,
                name: file.name,
                type: Boolean(file.children) ? "directory" : "file",
              })
            }
            panelElement={panelElement}
          >
            <FileObject
              file={file}
              setSelectedFile={(val) => setSelectedFile(val)}
              panelExpanded={panelExpanded}
              setNewFile={(val) => setNewFile(val)}
              setMovedItem={(val) => handleMovedItem(val)}
              level={level + 1}
              removeFileExplorerItem={removeFileExplorerItem}
              isDirectory={Boolean(file.children)}
              panelElement={panelElement}
            />
          </CustomContextMenu>
        </li>
      ))}
    </ReactSortable>
  );
};

export default FileExplorer;
