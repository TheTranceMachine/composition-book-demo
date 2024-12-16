import { useState } from "react";
import { ImFolder, ImFolderOpen } from "react-icons/im";
import { FaFile } from "react-icons/fa";
import { FileDataType } from "@/types/types";
import CustomTooltip from "@/components/Tooltip/CustomTooltip";
import FileExplorer from "../FileExplorer";
import { SortableEvent } from "react-sortablejs";

type FileObjectPropsType = Readonly<{
  file: FileDataType;
  setSelectedFile: (file: FileDataType) => void;
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string; }) => void;
  setMovedItem: (val: SortableEvent) => void;
  level: number;
}>;

const FileObject = ({ file, setSelectedFile, panelExpanded, setNewFile, setMovedItem, level }: FileObjectPropsType) => {
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;

  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  const handleFileClick = () => {
    if (!isDirectory) {
      setSelectedFile(file);
    }
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 text-white hover:bg-gray-800 cursor-pointer ${panelExpanded ? 'justify-between' : 'justify-center'}`}
        data-directory={isDirectory}
      >
        <div className={`flex items-center gap-1 ${panelExpanded ? 'w-10/12' : 'w-12/12'} p-2`} onClick={handleFileClick}>
          <div className={`flex items-center gap-2 ${panelExpanded ? 'truncate' : ''}`}>
            {panelExpanded ? (
              <>
                <div className="h-6 w-6">{isDirectory ? expanded ? <ImFolderOpen className="w-6 h-6" /> : <ImFolder className="w-6 h-6" /> : <FaFile className="w-6 h-6" />}</div>
                <div className="truncate">{fileName}</div>
              </>
            ) : (
              <CustomTooltip itemName={fileName}>
                <div className="h-6 w-6">{isDirectory ? expanded ? <ImFolderOpen className="w-6 h-6" /> : <ImFolder className="w-6 h-6" /> : <FaFile className="w-6 h-6" />}</div>
              </CustomTooltip>
            )}
          </div>
        </div>
      </div>
      {fileChildren && !!fileChildren.length && expanded && (
        <FileExplorer
          data={fileChildren}
          setSelectedFile={(val) => setSelectedFile(val)}
          panelExpanded={panelExpanded}
          setNewFile={(val) => setNewFile(val)}
          setMovedItem={(val) => setMovedItem(val)}
          level={level + 1}
        />
      )}
    </>
  );
}

export default FileObject;