import CustomDialog from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DeletionConfirmationModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onDelete: () => void;
  item: string;
  type: string;
};

const DeletionConfirmationModal = ({ show, setShow, onDelete, item, type }: DeletionConfirmationModalPropTypes) => (
  <CustomDialog
    dialogOpen={show}
    setDialogOpen={setShow}
  >
    <DialogContent className="bg-amber-300 border border-amber-500">
      <DialogTitle>
        <div className="flex gap-2 items-center text-black">
          You&apos;re deleting a {type}
        </div>
      </DialogTitle>
      <p className="text-black">
        Are you sure you want to delete <b>{item}</b> from {type}s?
      </p>
      <DialogFooter>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onDelete} className="border-r border-2 border-r-slate-800">
            Yes
          </Button>
          <Button variant="secondary" onClick={setShow} className="border-l border-l-slate-600">
            No
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </CustomDialog>
);

export default DeletionConfirmationModal;
