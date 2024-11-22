import { memo } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { PaneChoicesTypes } from "@/types/types";

const Items = ({ item, onClick }: { item: PaneChoicesTypes, onClick: (val: string) => void }) => {
  const { name, icon, description } = item;

  return (
    <>
      <NavigationMenuItem onClick={() => onClick(name)} className="cursor-pointer hover:bg-neutral-900 px-3 py-2">
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
  )
};

export default memo(Items);
