import { memo } from "react";
import { BsFileEarmarkPersonFill, BsImageFill } from "react-icons/bs";
import { VscChevronRight, VscFolder, VscFile } from "react-icons/vsc";
import { FaMagic } from "react-icons/fa";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

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

const Items = ({ onClick }: { onClick: (val: string) => void }) => items.map(({ id, name, icon, description }) => (
  <>
    <NavigationMenuItem key={id} className="cursor-pointer hover:bg-neutral-900 px-3 py-2" onClick={() => onClick(name)}>
      <NavigationMenuTrigger className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          {icon}
          {name}
        </div>
        {name === "New File" && <VscChevronRight className="w-5 h-5 text-white" />}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex justify-between items-center mt-2">
        <NavigationMenuLink asChild><span className="text-sm">{description}</span></NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <Separator className="bg-[#151515] h-0.5 last:hidden" />
  </>
));
export default memo(Items);
