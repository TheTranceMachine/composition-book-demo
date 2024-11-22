import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "@/types/types";
import CustomDialog from "@/components/Modal/Modal";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

  useEffect(() => {
    if (newSettingTitle !== "") {
      setNewSetting({ ...newSetting, title: newSettingTitle });
    }
  }, [newSettingTitle]);

  return (
    <CustomDialog
      dialogOpen={show}
      setDialogOpen={setShow}
    >
      <DialogContent className="bg-amber-300 border border-amber-500">
        <DialogTitle>
          <div className="flex gap-2 items-center text-black">
            <BsImageFill />
            New Story Setting
          </div>
        </DialogTitle>
        <div>
          <div className="mb-3">
            <Label id="character-name" className="text-black">
              Name
            </Label>
            <Input
              placeholder="Title"
              aria-label="Title"
              aria-describedby="setting-title"
              className="border-1 border-amber-500"
              value={newSetting.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSetting({ ...newSetting, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <Label id="character-name" className="text-black">
              Description
            </Label>
            <Textarea
              placeholder="Description"
              aria-label="Description"
              aria-describedby="character-name"
              className="border-1 border-amber-500"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewSetting({ ...newSetting, description: e.target.value })}
            />
          </div>
        </div>
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
      </DialogContent>
    </CustomDialog>
  );
};
export default NewStorySettingModal;
