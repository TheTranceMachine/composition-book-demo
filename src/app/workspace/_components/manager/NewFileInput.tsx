import { ChangeEvent, memo, MouseEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NewFileInputTypes = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  panelExpanded: boolean | 0 | undefined;
};

const NewFileInput = ({ onClick, onChange, panelExpanded }: NewFileInputTypes) => (
  <>
    <Input onChange={onChange} className="text-white" placeholder="File Name" />
    <Button
      variant="secondary"
      onClick={onClick}
      size={`${panelExpanded ? "default" : "sm"}`}
      className={`${panelExpanded ? "" : "w-full"}`}
    >
      Create File
    </Button>
  </>
);

export default memo(NewFileInput);
