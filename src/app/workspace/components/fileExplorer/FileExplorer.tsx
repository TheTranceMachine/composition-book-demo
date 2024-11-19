import { useState, useContext, useRef, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { VscClose, VscDiffAdded } from "react-icons/vsc";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Button, ButtonGroup, Form, InputGroup, Tooltip } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FileDataType } from "@/types/types";
import { addFile } from "@/reducers/fileExplorerSlice";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const { children: fileChildren, name: fileName, id: fileId } = file;

  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  const newFileId = uuidv4();

  const fileNameInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (showTooltip) {
      fileNameInputRef.current?.focus();
    }
  }, [showTooltip]);

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
        setShowTooltip(false);
      }
    }
  };

  const menuTooltip = (
    <Tooltip>
      <div className="flex gap-1">
        <InputGroup size="sm" className="py-0.5">
          <Form.Control
            as="input"
            placeholder="Title"
            aria-label="Title"
            onKeyDown={handleInput}
            ref={fileNameInputRef}
          />
          <Button
            variant="outline-light"
            onClick={() => setType("file")}
            className={`${type === "file" && "bg-white text-black"}`}
          >
            File
          </Button>
          <Button
            variant="outline-light"
            onClick={() => setType("dir")}
            className={`${type === "dir" && "bg-white text-black"}`}
          >
            Dir
          </Button>
        </InputGroup>
        <Button variant="link" size="sm" onClick={() => setShowTooltip(false)} className="p-0">
          <VscClose />
        </Button>
      </div>
    </Tooltip>
  );

  return (
    <li className="file-item">
      <div
        className={`file-item-button flex items-center justify-between text-white ${isDirectory && "file-item-button--directory"}`}
      >
        <div className="flex items-center gap-1 w-10/12">
          <button className="flex items-center gap-1 truncate" onClick={handleFileClick}>
            {isDirectory && <div className="text-xs">{expanded ? "▼" : "▶"}</div>}
            <div className="truncate">{fileName}</div>
          </button>
        </div>
        {isDirectory && (
          <OverlayTrigger placement="auto" overlay={menuTooltip} show={showTooltip}>
            <div className="flex justify-end">
              <VscDiffAdded onClick={() => setShowTooltip(true)} />
            </div>
          </OverlayTrigger>
        )}
      </div>
      {fileChildren && !!fileChildren.length && expanded && (
        <FileList fileList={fileChildren} level={level + 1} setSelectedFile={(val) => setSelectedFile(val)} />
      )}
    </li>
  );
}

export default memo(FileExplorer);