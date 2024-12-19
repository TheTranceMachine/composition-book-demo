import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "@/types/types";
import CustomDialog from "@/components/Modal/Modal";
import { DialogContent, DialogFooter, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type NewStorySettingModalPropTypes = {
  panelElement: HTMLDivElement | null;
  show: boolean;
  setShow: () => void;
  onSave: (val: StorySettingTypes) => void;
  newSettingTitle: string;
};

const NewStorySettingModal = ({
  panelElement,
  show,
  setShow,
  onSave,
  newSettingTitle,
}: NewStorySettingModalPropTypes) => {
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
    <CustomDialog dialogOpen={show} setDialogOpen={setShow}>
      <DialogPortal container={panelElement}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>
            <div className="flex gap-2 items-center text-black">
              <BsImageFill />
              New Story Setting
            </div>
          </DialogTitle>
          <div>
            <div className="mb-3">
              <Label id="character-name">Name</Label>
              <Input
                placeholder="Title"
                aria-label="Title"
                aria-describedby="setting-title"
                value={newSetting.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSetting({ ...newSetting, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <Label id="character-name">Description</Label>
              <Textarea
                placeholder="Description"
                aria-label="Description"
                aria-describedby="character-name"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setNewSetting({ ...newSetting, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="default" onClick={() => onSave(newSetting)}>
                Save
              </Button>
              <Button variant="secondary" onClick={setShow}>
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </CustomDialog>
  );
};
export default NewStorySettingModal;
