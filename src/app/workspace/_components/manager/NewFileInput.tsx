import { ChangeEvent, memo, MouseEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NewFileInput = ({ onClick, onChange }: { onClick: MouseEventHandler; onChange: (val: ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center w-full">
    <Label htmlFor="file-name" className="w-24 flex justify-center">File Name</Label>
    <Input onChange={onChange} className="w-96" />
    <Button variant="secondary" onClick={onClick}>
      Create File
    </Button>
  </div>
);

export default memo(NewFileInput);
