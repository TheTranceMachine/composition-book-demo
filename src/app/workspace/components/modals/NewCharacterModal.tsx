'use client'

import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { CharacterTypes } from "@/types/types";
import CustomDialog from "@/components/Modal/Modal";
import { DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  if (newCharacterName !== "") {
    setNewCharacter({ ...newCharacter, name: newCharacterName });
  }

  return (
    <CustomDialog
      dialogOpen={show}
      setDialogOpen={setShow}
    >
      <DialogHeader>
        <div className="flex gap-2 items-center">
          <BsFileEarmarkPersonFill />
          New Character
        </div>
      </DialogHeader>
      <DialogContent>
        <div className="mb-3">
          <Label id="character-name" className="bg-amber-300 border-1 border-amber-500">
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
          <Label id="character-name" className="bg-amber-300 border-1 border-amber-500">
            Description
          </Label>
          <Input
            type="textarea"
            placeholder="Description"
            aria-label="Description"
            aria-describedby="character-name"
            className="border-1 border-amber-500"
            value={newCharacter.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCharacter({ ...newCharacter, description: e.target.value })}
          />
        </div>
      </DialogContent>
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
    </CustomDialog>
  );
};
export default NewCharacterModal;
