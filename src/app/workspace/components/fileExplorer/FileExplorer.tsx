import { useState, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { VscDiffAdded } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import { FileDataType } from "@/types/types";
import { addFile } from "@/redux/slices/fileExplorerSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileList from "./FileList";
import "./fileExplorer.scss";

type FileExplorerPropsType = Readonly<{
  data: ReadonlyArray<FileDataType>;
  setSelectedFile: (file: FileDataType) => void;
}>;

function FileExplorer({ data, setSelectedFile }: FileExplorerPropsType) {
  return <FileList fileList={data} level={1} setSelectedFile={(val) => setSelectedFile(val)} />;
}

type FileObjectPropsType = Readonly<{
  file: FileDataType;
  level: number;
  setSelectedFile: (file: FileDataType) => void;
}>;

export function FileObject({ file, level, setSelectedFile }: FileObjectPropsType) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState("file");
  const { children: fileChildren, name: fileName, id: fileId } = file;

  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  const newFileId = uuidv4();

  const fileNameInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (!isDirectory) {
      setSelectedFile(file);
    }
    setExpanded(!expanded);
  };

  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputVal = fileNameInputRef.current?.value;
      if (inputVal) {
        dispatch(addFile({ id: newFileId, name: inputVal, directoryId: fileId, type }));
        setType("file");
      }
    }
  };

  return (
    <li className="file-item">
      <div
        className={`file-item-button flex items-center justify-between text-white ${isDirectory && "file-item-button--directory"} hover:bg-gray-800`}
      >
        <div className="flex items-center gap-1 w-10/12">
          <button className="flex items-center gap-1 truncate" onClick={handleFileClick}>
            {isDirectory && <div className="text-xs">{expanded ? "▼" : "▶"}</div>}
            <div className="truncate">{fileName}</div>
          </button>
        </div>
        {isDirectory && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex justify-end">
                <VscDiffAdded />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex gap-1">
                <Input placeholder="Title" onKeyDown={handleInput} ref={fileNameInputRef} />
                <Button
                  variant="secondary"
                  onClick={() => setType("file")}
                  className={`${type === "file" && "bg-white text-black"}`}
                >
                  File
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setType("dir")}
                  className={`${type === "dir" && "bg-white text-black"}`}
                >
                  Dir
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {fileChildren && !!fileChildren.length && expanded && (
        <FileList fileList={fileChildren} level={level + 1} setSelectedFile={(val) => setSelectedFile(val)} />
      )}
    </li>
  );
}

export default memo(FileExplorer);
