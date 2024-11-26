import { VscClose } from "react-icons/vsc";

type WorkspacePaneTabsTypes = {
  paneId: string;
  id: string;
  active: boolean;
  name: string;
  setTabActive: (val: string) => void;
  removeTab: (val: { paneId: string; tabId: string }) => void;
};

const WorkspacePaneTabs = ({
  paneId,
  id,
  active,
  name,
  setTabActive,
  removeTab,
}: WorkspacePaneTabsTypes) => (
  <div

    className={`page-tab flex items-center justify-center gap-2 w-fit min-w-24 h-8 px-2 text-white cursor-pointer 
                      ${active ? `bg-[#15222e] ${active && "border-t border-t-white"}` : "bg-[#0e0e0e]"}
                      `}
  >
    <div onClick={() => setTabActive(id)} className="truncate">
      {name}
    </div>
    <VscClose onClick={() => removeTab({ paneId, tabId: id })} />
  </div>
);

export default WorkspacePaneTabs;
