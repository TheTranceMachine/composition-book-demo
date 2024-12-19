import { VscClose } from "react-icons/vsc";

type WorkspacePaneTabsTypes = {
  active: boolean;
  name: string;
  setTabActive: () => void;
  removeTab: () => void;
};

const WorkspacePaneTabs = ({ active, name, setTabActive, removeTab }: WorkspacePaneTabsTypes) => (
  <div
    className={`page-tab draggable flex items-center justify-center gap-2 w-fit min-w-24 h-8 px-2 text-white cursor-pointer 
                      ${active ? `bg-[#15222e] ${active && "border-t border-t-white"}` : "bg-[#0e0e0e]"}
                      `}
  >
    <div onClick={setTabActive} className="truncate">
      {name}
    </div>
    <VscClose onClick={removeTab} />
  </div>
);

export default WorkspacePaneTabs;
