import { useRef, useState } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa6";
import { FileDataType } from "@/types/types";
import CustomTooltip from "@/components/Tooltip/CustomTooltip";
import NewFilePopover from "./NewFilePopover";
import FileExplorer from "../FileExplorer";
import { SortableEvent } from "react-sortablejs";

type FileObjectPropsType = Readonly<{
  file: FileDataType;
  setSelectedFile: (file: FileDataType) => void;
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string; directoryId: string; type: string; }) => void;
  setMovedItem: (val: SortableEvent) => void;
}>;

const FileObject = ({ file, setSelectedFile, panelExpanded, setNewFile, setMovedItem }: FileObjectPropsType) => {
  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState("file");
  const { children: fileChildren, name: fileName, id: fileId } = file;

  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  const fileNameInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (!isDirectory) {
      setSelectedFile(file);
    }
    setExpanded(!expanded);
  };

  const createNewFile = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputVal = fileNameInputRef.current?.value;
      if (inputVal) {
        setNewFile({ name: inputVal, directoryId: fileId, type });
        setType("file");
      }
    }
  };

  return (
    <li className={`file-item ${!panelExpanded ? 'py-1' : 'pl-2'} ${expanded ? 'bg-gray-900' : ''}`} id={fileId}>
      <div
        className="file-item-button flex items-center gap-1 justify-between text-white hover:bg-gray-800 cursor-pointer"
      >
        <div className="flex items-center gap-1 w-10/12" onClick={handleFileClick}>
          <button className={`flex items-center gap-2 ${panelExpanded ? 'truncate' : ''}`}>
            {panelExpanded ? (
              <>
                <div className="w-3">{isDirectory ? expanded ? <FaFolderOpen /> : <FaFolder /> : <FaFile />}</div>
                <div className="truncate">{fileName}</div>
              </>
            ) : (
              <CustomTooltip itemName={fileName}>
                <div className="w-3">{isDirectory ? expanded ? <FaFolderOpen /> : <FaFolder /> : <FaFile />}</div>
              </CustomTooltip>
            )}
          </button>
        </div>
        {isDirectory && <NewFilePopover ref={fileNameInputRef} handleInput={createNewFile} setType={(val: string) => setType(val)} type={type} />}
      </div>
      {fileChildren && !!fileChildren.length && expanded && (
        <FileExplorer
          data={fileChildren}
          setSelectedFile={(val) => setSelectedFile(val)}
          panelExpanded={panelExpanded}
          setNewFile={(val) => setNewFile(val)}
          setMovedItem={(val) => setMovedItem(val)}
        />
      )}
    </li>
  );
}

export default FileObject;