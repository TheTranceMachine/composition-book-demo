import { ChangeEvent, memo, MouseEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NewFileInput = ({ onClick, onChange }: { onClick: MouseEventHandler; onChange: (val: ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <Label htmlFor="file-name" className="flex justify-center text-white">File Name</Label>
    <Input onChange={onChange} className="text-white" />
    <Button variant="secondary" onClick={onClick}>
      Create File
    </Button>
  </>
);

export default memo(NewFileInput);
