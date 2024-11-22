import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "@/types/types";
import CustomDialog from "@/components/Modal/Modal";
import { DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NewStorySettingModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onSave: (val: StorySettingTypes) => void;
  newSettingTitle: string;
};

const NewStorySettingModal = ({ show, setShow, onSave, newSettingTitle }: NewStorySettingModalPropTypes) => {
  const [newSetting, setNewSetting] = useState({
    id: uuidv4(),
    title: "",
    description: "",
  });

  if (newSettingTitle !== "") {
    setNewSetting({ ...newSetting, title: newSettingTitle });
  }

  return (
    <CustomDialog
      dialogOpen={show}
      setDialogOpen={setShow}
    >
      <DialogHeader>
        <div className="flex gap-2 items-center">
          <BsImageFill />
          New Story Setting
        </div>
      </DialogHeader>
      <DialogContent>
        <Label id="setting-title" className="bg-amber-300 border-1 border-amber-500">
          Title
        </Label>
        <Input
          placeholder="Title"
          aria-label="Title"
          aria-describedby="setting-title"
          className="border-1 border-amber-500"
          value={newSetting.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSetting({ ...newSetting, title: e.target.value })}
        />
        <Label id="setting-title" className="bg-amber-300 border-1 border-amber-500">
          Description
        </Label>
        <Input
          type="textarea"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="setting-title"
          value={newSetting.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSetting({ ...newSetting, description: e.target.value })}
        />
      </DialogContent>
      <DialogFooter>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onSave(newSetting)} className="border-r border-2 border-r-slate-800">
            Save
          </Button>
          <Button variant="secondary" onClick={setShow} className="border-l border-l-slate-600">
            Cancel
          </Button>
        </div>
      </DialogFooter>
    </CustomDialog>
  );
};
export default NewStorySettingModal;
