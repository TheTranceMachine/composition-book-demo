import { ReactSortable, SortableEvent } from "react-sortablejs";
import { VscClose } from "react-icons/vsc";
import { TabTypes } from "@/types/types";

type WorkspacePaneTabsTypes = {
  paneId: string;
  tabs: TabTypes[];
  sortTabs: (val: { tabs: TabTypes[]; paneId: string }) => void;
  setPaneActive: (val: string) => void;
  setActiveTabOnMove: (val: SortableEvent) => void;
  setTabActive: (val: string) => void;
  removeTab: (val: { paneId: string; tabId: string }) => void;
};

const WorkspacePaneTabs = ({
  paneId,
  tabs,
  sortTabs,
  setPaneActive,
  setActiveTabOnMove,
  setTabActive,
  removeTab,
}: WorkspacePaneTabsTypes) => (
  <ReactSortable
    group="tabs"
    list={JSON.parse(JSON.stringify(tabs))} // https://github.com/SortableJS/react-sortablejs/issues/149
    setList={(updatedTabs) => sortTabs({ tabs: JSON.parse(JSON.stringify(updatedTabs)) as TabTypes[], paneId })}
    onChoose={() => setPaneActive(paneId)}
    onEnd={(val) => setActiveTabOnMove(val)}
    className="pages-tabs flex flex-nowrap gap-0.5 w-full h-8 bg-black overflow-x-auto overflow-y-hidden"
  >
    {tabs.map(({ id, name, active }) => (
      <div
        key={id}
        className={`page-tab flex items-center justify-center gap-2 w-fit min-w-24 h-8 px-2 text-white cursor-pointer 
                      ${active ? `bg-[#1e1e1e] ${active && "border-t border-t-white"}` : "bg-[#0e0e0e]"}
                      `}
      >
        <div onClick={() => setTabActive(id)} className="truncate">
          {name}
        </div>
        <VscClose onClick={() => removeTab({ paneId, tabId: id })} />
      </div>
    ))}
  </ReactSortable>
);

export default WorkspacePaneTabs;
