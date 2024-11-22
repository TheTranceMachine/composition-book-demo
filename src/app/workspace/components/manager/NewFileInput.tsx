import { ChangeEvent, memo, MouseEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NewFileInput = ({ onClick, onChange }: { onClick: MouseEventHandler; onChange: (val: ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex">
    <Label htmlFor="file-name">File Name</Label>
    <Input onChange={onChange} />
    <Button variant="secondary" onClick={onClick}>
      Create File
    </Button>
  </div>
);

export default memo(NewFileInput);
