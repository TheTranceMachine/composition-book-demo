import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

type CustomContextMenuTypes = {
  children: React.ReactNode;
  handleInput: (val: { type: string; name: string | undefined }) => void;
  removeFileExplorerItem?: () => void;
  panelElement: HTMLDivElement | null;
};

const CustomContextMenu = ({ children, handleInput, removeFileExplorerItem, panelElement }: CustomContextMenuTypes) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dirInputRef = useRef<HTMLInputElement>(null);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuPortal container={panelElement}>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger className="cursor-pointer">New File</ContextMenuSubTrigger>
            <ContextMenuSubContent sideOffset={8}>
              <div className="flex gap-1">
                <Input placeholder="File Name" ref={fileInputRef} />
                <Button
                  variant="default"
                  onClick={() => handleInput({ type: "file", name: fileInputRef.current?.value })}
                >
                  Create
                </Button>
              </div>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger className="cursor-pointer">New Folder</ContextMenuSubTrigger>
            <ContextMenuSubContent sideOffset={8}>
              <div className="flex gap-1">
                <Input placeholder="Folder Name" ref={dirInputRef} />
                <Button
                  variant="default"
                  onClick={() => handleInput({ type: "dir", name: dirInputRef.current?.value })}
                >
                  Create
                </Button>
              </div>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={removeFileExplorerItem} className="cursor-pointer">
            Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default CustomContextMenu;
