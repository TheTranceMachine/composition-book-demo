import { useState } from "react";
import { BsFileEarmarkPersonFill, BsImageFill, BsFileEarmarkFill } from "react-icons/bs";
import { VscListTree } from "react-icons/vsc";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { FaMagic } from "react-icons/fa";
import { PaneChoicesTypes } from "@/types/types";
import BackButton from "./BackButton";
import Items from "./Items";
import NewFileInput from "./NewFileInput";

// TODO: Move to global store
const items: PaneChoicesTypes[] = [{
  id: "1",
  name: "File Explorer",
  icon: <VscListTree />,
  description: "View and manage your files",
},
{
  id: "2",
  name: "New File",
  icon: <BsFileEarmarkFill />,
  description: "Create a new file",
},
{
  id: "3",
  name: "Characters",
  icon: <BsFileEarmarkPersonFill />,
  description: "View and manage your characters",
},
{
  id: "4",
  name: "Story Settings",
  icon: <BsImageFill />,
  description: "View and manage your story settings",
},
{
  id: "5",
  name: "AI Enhancements",
  icon: <FaMagic />,
  description: "View and manage your AI enhancements",
}
];

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
    <NavigationMenu orientation="vertical" className="m-3 rounded-md border-2 border-neutral-500 bg-neutral-100">
      <NavigationMenuList>
        {items.map(item => (
          <Items key={item.id} onClick={(val) => paneComponentSelection(val)} item={item} />
        ))}
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
