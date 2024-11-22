import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { CharacterTypes } from "@/types/types";
import CustomDialog from "@/components/Modal/Modal";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type NewCharacterModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onSave: (val: CharacterTypes) => void;
  newCharacterName: string;
};

const NewCharacterModal = ({ show, setShow, onSave, newCharacterName }: NewCharacterModalPropTypes) => {
  const [newCharacter, setNewCharacter] = useState({
    id: uuidv4(),
    name: "",
    description: "",
  });

  useEffect(() => {
    if (newCharacterName !== "") {
      setNewCharacter({ ...newCharacter, name: newCharacterName });
    }
  }, [newCharacterName]);

  return (
    <CustomDialog
      dialogOpen={show}
      setDialogOpen={setShow}
    >
      <DialogContent className="bg-amber-300 border border-amber-500">
        <DialogTitle>
          <div className="flex gap-2 items-center text-black">
            <BsFileEarmarkPersonFill />
            New Character
          </div>
        </DialogTitle>
        <div>
          <div className="mb-3">
            <Label id="character-name" className="text-black">
              Name
            </Label>
            <Input
              placeholder="Name"
              aria-label="Name"
              aria-describedby="character-name"
              className="border-1 border-amber-500"
              value={newCharacter.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCharacter({ ...newCharacter, name: e.target.value })}
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
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewCharacter({ ...newCharacter, description: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onSave(newCharacter)} className="border-r border-2 border-r-slate-800">
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
export default NewCharacterModal;
