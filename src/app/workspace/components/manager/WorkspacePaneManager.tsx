import { useState } from "react";
import { BsFileEarmarkPersonFill, BsImageFill } from "react-icons/bs";
import { VscFolder, VscFile } from "react-icons/vsc";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { FaMagic } from "react-icons/fa";
import BackButton from "./BackButton";
import Items from "./Items";
import NewFileInput from "./NewFileInput";

// TODO: Move to global store
const items = [{
  id: "1",
  name: "File Explorer",
  icon: <VscFolder />,
  description: "View and manage your files",
},
{
  id: "2",
  name: "New File",
  icon: <VscFile />,
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
    <NavigationMenu orientation="vertical" className="m-3 rounded-md border-2 border-[#151515] bg-neutral-800">
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
