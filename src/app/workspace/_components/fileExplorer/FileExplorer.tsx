import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FileDataType } from "@/types/types";
import FileObject from "./components/FileObject";

type FileListPropsType = Readonly<{
  data: ReadonlyArray<FileDataType>;
  setSelectedFile: (file: FileDataType) => void;
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string; directoryId: string; type: string; }) => void;
}>;

const FileExplorer = ({ data, setSelectedFile, panelExpanded, setNewFile }: FileListPropsType): JSX.Element => {
  const directories = data.filter((fileItem) => fileItem.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = data.filter((fileItem) => !fileItem.children);
  // nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];

  const [files, setFiles] = useState<FileDataType[]>([]);

  useEffect(() => {
    setFiles(items);
  }, [data]);

  return !!files.length ? (
    <ReactSortable
      tag="ul"
      list={JSON.parse(JSON.stringify(files))} // https://github.com/SortableJS/react-sortablejs/issues/149
      setList={(updatedFiles) => setFiles(updatedFiles as FileDataType[])}
      className={`file-list ${panelExpanded ? 'pl-2' : ''}`}
      group="files"
      onStart={(val) => val.item.classList.add("selected")}
      onEnd={(val) => val.item.classList.remove("selected")}
    >
      {files.map((file) => (
        <FileObject
          key={file.id}
          file={file}
          setSelectedFile={(val) => setSelectedFile(val)}
          panelExpanded={panelExpanded}
          setNewFile={(val) => setNewFile(val)}
        />
      ))}
    </ReactSortable>
  ) : (
    <div className="text-white">No files found</div>
  );
}

export default FileExplorer;