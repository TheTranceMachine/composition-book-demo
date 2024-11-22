import { useState } from "react";
import BackButton from "./BackButton";
import Items from "./Items";
import NewFileInput from "./NewFileInput";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";

type WorkspacePaneManagerTypes = {
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
};

const WorkspacePaneManager = ({ handlePaneComponentChange }: WorkspacePaneManagerTypes) => {
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const paneComponentSelection = (val: string) => {
    return val === "New File" ? setPage(2) : handlePaneComponentChange({ name: val });
  };

  return page === 1 ? (
    <NavigationMenu orientation="vertical" className="m-3 rounded-md border-2 border-[#151515] bg-neutral-800">
      <NavigationMenuList>
        <Items onClick={(val) => paneComponentSelection(val)} />
      </NavigationMenuList>
    </NavigationMenu>
  ) : (
    <div className="flex flex-col m-3 gap-3">
      <BackButton onClick={() => setPage(1)} />
      <NewFileInput
        onClick={() => handlePaneComponentChange({ name: input, type: "file" })}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default WorkspacePaneManager;
