import { NavigationMenuContent, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { memo } from "react";
import { VscChevronRight } from "react-icons/vsc";

// TODO: Move to global store
const items = ["File Explorer", "New File", "Characters", "Story Settings", "AI Enhancements"];

const Items = ({ onClick }: { onClick: (val: string) => void }) =>
  items.map((item) => (
    <NavigationMenuItem key={item} onClick={() => onClick(item)} className="cursor-pointer hover:bg-neutral-700">
      <NavigationMenuContent className="flex justify-between items-center">
        {item}
        {item === "New File" && <VscChevronRight className="w-5 h-5 text-white" />}
      </NavigationMenuContent>
    </NavigationMenuItem>
  ));

export default memo(Items);
