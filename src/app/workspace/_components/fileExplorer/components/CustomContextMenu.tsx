import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

type CustomContextMenuTypes = {
  children: React.ReactNode;
  handleInput: (val: { type: string; event: React.KeyboardEvent<HTMLInputElement> }) => void;
};

const CustomContextMenu = ({ children, handleInput }: CustomContextMenuTypes) => (
  <ContextMenu>
    <ContextMenuTrigger>
      {children}
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuSub>
        <ContextMenuSubTrigger className="cursor-pointer">New File</ContextMenuSubTrigger>
        <ContextMenuSubContent sideOffset={8}>
          <div className="flex gap-1">
            <Input placeholder="File Name" onKeyDown={(event) => handleInput({ type: 'file', event })} />
          </div>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger className="cursor-pointer">New Folder</ContextMenuSubTrigger>
        <ContextMenuSubContent sideOffset={8}>
          <div className="flex gap-1">
            <Input placeholder="Folder Name" onKeyDown={(event) => handleInput({ type: 'dir', event })} />
          </div>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  </ContextMenu>
);

export default CustomContextMenu;
