import CustomDialog from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DeletionConfirmationModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onDelete: () => void;
  item: string;
};

const DeletionConfirmationModal = ({ show, setShow, onDelete, item }: DeletionConfirmationModalPropTypes) => (
  <CustomDialog dialogOpen={show} setDialogOpen={setShow}>
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 items-center text-black">Deleting</div>
      </DialogTitle>
      <p className="text-black">
        Are you sure you want to delete <b>{item}</b>?
      </p>
      <DialogFooter>
        <div className="flex gap-2">
          <Button variant="default" onClick={onDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={setShow}>
            No
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </CustomDialog>
);

export default DeletionConfirmationModal;
