import { memo } from "react";
import { VscChevronRight } from "react-icons/vsc";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { PaneChoicesTypes } from "@/types/types";
import CustomTooltip from "@/components/Tooltip/CustomTooltip";

type ItemsTypes = {
  item: PaneChoicesTypes;
  onClick: (val: string) => void;
  panelExpanded: boolean | 0 | undefined;
};

const Items = ({ item, onClick, panelExpanded }: ItemsTypes) => {
  const { name, icon, description } = item;

  return (
    <>
      <NavigationMenuItem onClick={() => onClick(name)} className="cursor-pointer">
        <NavigationMenuTrigger
          className={`flex ${panelExpanded ? "justify-between" : "justify-center"} items-center w-full px-3 py-2`}
        >
          <div className={`flex gap-2 items-center ${panelExpanded ? "truncate" : ""} text-neutral-800`}>
            {panelExpanded ? (
              <>
                <div className="w-3">{icon}</div>
                <div className="truncate">{name}</div>
              </>
            ) : (
              <CustomTooltip itemName={name}>{icon}</CustomTooltip>
            )}
          </div>
          {name === "New File" && panelExpanded && <VscChevronRight className="w-5 h-5 text-neutral-800" />}
        </NavigationMenuTrigger>
        {!panelExpanded ? null : (
          <NavigationMenuContent className="flex justify-between items-center px-3 pb-2 pt-0">
            <NavigationMenuLink asChild>
              <span className="text-sm">{description}</span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        )}
      </NavigationMenuItem>
      <Separator className="bg-neutral-300 h-0.5 last:hidden" />
    </>
  );
};

export default memo(Items);
