import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type MinimizedViewTooltipTypes = {
  children: React.ReactNode;
  itemName: string;
};

const CustomTooltip = ({ itemName, children }: MinimizedViewTooltipTypes) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={8} className="bg-white text-black">
        <p>{itemName}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default CustomTooltip;