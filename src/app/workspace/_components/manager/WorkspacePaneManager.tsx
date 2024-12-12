import { useState } from "react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { VscChevronLeft } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import Items from "./Items";
import NewFileInput from "./NewFileInput";
import components from "./components";

type WorkspacePaneManagerTypes = {
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
  panelExpanded: boolean | 0 | undefined;
};

const WorkspacePaneManager = ({ handlePaneComponentChange, panelExpanded }: WorkspacePaneManagerTypes) => {
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const paneComponentSelection = (val: string) => {
    return val === "New File" ? setPage(2) : handlePaneComponentChange({ name: val });
  };

  return page === 1 ? (
    <NavigationMenu orientation="vertical" className="m-3 rounded-md border-2 border-black bg-white">
      <NavigationMenuList>
        {components.map(item => (
          <Items key={item.id} onClick={(val) => paneComponentSelection(val)} item={item} panelExpanded={panelExpanded} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ) : (
    <div className="flex flex-col m-3 gap-4">
      <Button variant="secondary" size="sm" onClick={() => setPage(1)} className={`${panelExpanded ? 'w-24' : 'w-full'}`}>
        <VscChevronLeft className="w-5 h-5 text-black" />
        Back
      </Button>
      <div className={`flex items-center gap-2 ${panelExpanded ? '' : 'flex-col'}`}>
        <NewFileInput
          onClick={() => handlePaneComponentChange({ name: input, type: "file" })}
          onChange={(e) => setInput(e.target.value)}
          panelExpanded={panelExpanded}
        />
      </div>
    </div>
  );
};

export default WorkspacePaneManager;
