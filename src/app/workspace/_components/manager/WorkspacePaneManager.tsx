import { useState } from "react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import BackButton from "./BackButton";
import Items from "./Items";
import NewFileInput from "./NewFileInput";
import components from "./components";

type WorkspacePaneManagerTypes = {
  handlePaneComponentChange: (val: { name: string; }) => void;
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
    <div className="flex flex-col m-3 gap-3">
      <BackButton onClick={() => setPage(1)} />
      <div className={`flex items-center gap-2 w-full ${panelExpanded ? '' : 'flex-col'}`}>
        <NewFileInput
          onClick={() => handlePaneComponentChange({ name: input })}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default WorkspacePaneManager;
