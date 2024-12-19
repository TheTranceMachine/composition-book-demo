import CustomDialog from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";

type DeletionConfirmationModalPropTypes = {
  panelElement: HTMLDivElement | null;
  show: boolean;
  setShow: () => void;
  onDelete: () => void;
  item: string;
};

const DeletionConfirmationModal = ({
  panelElement,
  show,
  setShow,
  onDelete,
  item,
}: DeletionConfirmationModalPropTypes) => (
  <CustomDialog dialogOpen={show} setDialogOpen={setShow}>
    <DialogPortal container={panelElement}>
      <DialogOverlay />
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
    </DialogPortal>
  </CustomDialog>
);

export default DeletionConfirmationModal;
