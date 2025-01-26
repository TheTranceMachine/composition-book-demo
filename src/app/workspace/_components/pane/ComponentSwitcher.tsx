import dynamic from "next/dynamic";
import { FileDataType } from "@/types/types";
import FileExplorer from "../fileExplorer/FileExplorer";
import WorkspacePaneManager from "../manager/WorkspacePaneManager";
import { SortableEvent } from "react-sortablejs";
import CustomContextMenu from "../fileExplorer/components/CustomContextMenu";
import NoFilesSpace from "../fileExplorer/components/NoFilesSpace";

// https://www.npmjs.com/package/@monaco-editor/react#for-nextjs-users
const MonacoEditor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
});

type ComponentSwitcherPropTypes = {
  panelElement: HTMLDivElement | null;
  component: string;
  content: string | undefined;
  files: FileDataType[];
  panelExpanded: boolean | 0 | undefined;
  panelVerticalSize?: number | undefined;
  fullScreen: boolean;
  handleSelectedFile: (val: FileDataType) => void;
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  removeFileExplorerItem: (val: { id: string; name: string; type: string }) => void;
  setMovedItem: (val: SortableEvent) => void;
};

const ComponentSwitcher = ({
  panelElement,
  component,
  content,
  files,
  panelExpanded,
  panelVerticalSize,
  fullScreen,
  handleSelectedFile,
  handlePaneComponentChange,
  setNewFile,
  removeFileExplorerItem,
  setMovedItem,
}: ComponentSwitcherPropTypes) => {
  switch (component) {
    case "Pane Manager":
      return (
        <WorkspacePaneManager
          handlePaneComponentChange={(val) => handlePaneComponentChange(val)}
          panelExpanded={panelExpanded}
        />
      );
    case "File Explorer":
      return !!files.length ? (
        <>
          <FileExplorer
            data={files}
            setSelectedFile={(val) => handleSelectedFile(val)}
            panelExpanded={panelExpanded}
            setMovedItem={(val) => setMovedItem(val)}
            level={0}
            setNewFile={setNewFile}
            removeFileExplorerItem={(val) => removeFileExplorerItem(val)}
            panelElement={panelElement}
          />
          <CustomContextMenu handleInput={(val) => setNewFile({ directoryId: "", ...val })} panelElement={panelElement}>
            <div className="file-creation-area diagonal-background border-b border-b-gray-900">&nbsp;</div>
          </CustomContextMenu>
        </>
      ) : (
        <NoFilesSpace panelExpanded={panelExpanded} setNewFile={setNewFile} panelElement={panelElement} />
      );
    case "New File":
      return (
        <MonacoEditor
          editorValue={content}
          panelExpanded={panelExpanded}
          panelVerticalSize={panelVerticalSize}
          fullScreen={fullScreen}
        />
      );
    default:
      return (
        <MonacoEditor
          editorValue={content}
          panelExpanded={panelExpanded}
          panelVerticalSize={panelVerticalSize}
          fullScreen={fullScreen}
        />
      );
  }
};

export default ComponentSwitcher;
