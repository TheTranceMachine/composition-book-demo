import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";

interface CustomDialogProps {
  dialogOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setDialogOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const CustomDialog = ({ dialogOpen, setDialogOpen, children }: CustomDialogProps) => (
  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild />
    <DialogPortal>
      <DialogOverlay>{children}</DialogOverlay>
    </DialogPortal>
  </Dialog>
);

export default CustomDialog;
