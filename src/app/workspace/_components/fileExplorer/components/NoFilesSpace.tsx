import CustomContextMenu from "./CustomContextMenu";

type NoFilesSpaceTypes = {
  panelExpanded: boolean | 0 | undefined;
  setNewFile: (val: { name: string | undefined; directoryId: string; type: string }) => void;
  panelElement: HTMLDivElement | null;
};

const NoFilesSpace = ({ panelExpanded, setNewFile, panelElement }: NoFilesSpaceTypes) => (
  <div className="h-32 p-3">
    <CustomContextMenu
      handleInput={(val) => setNewFile({ directoryId: "", ...val })}
      panelElement={panelElement}
    >
      <div className="flex items-center justify-center text-white border-2 border-dashed border-white p-3 h-full">
        {panelExpanded ? "No files found. Right click here to create a new file or folder" : "Right click"}
      </div>
    </CustomContextMenu>
  </div>
);

export default NoFilesSpace;
