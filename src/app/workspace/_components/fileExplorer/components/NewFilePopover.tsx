import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscDiffAdded } from "react-icons/vsc";
import InputToggleGroup from "./InputToggleGroup";

type NewFilePopoverTypes = {
  handleInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setType: (val: string) => void;
  type: string;
  ref: React.RefObject<HTMLInputElement>;
};

const NewFilePopover = ({ handleInput, setType, type, ref }: NewFilePopoverTypes) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className="flex justify-end">
        <VscDiffAdded />
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <div className="flex gap-1">
        <Input placeholder="Title" onKeyDown={handleInput} ref={ref} />
        <InputToggleGroup setType={(val) => setType(val)} type={type} />
      </div>
    </PopoverContent>
  </Popover>
);

export default NewFilePopover;