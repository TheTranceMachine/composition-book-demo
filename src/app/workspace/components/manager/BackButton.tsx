import { memo, MouseEventHandler } from "react";
import { VscChevronLeft } from "react-icons/vsc";

export const BackButton = memo(({ onClick }: { onClick: MouseEventHandler }) => (
  <div
    className="flex gap-0.5 items-center bg-zinc-700 w-fit px-1.5 py-0.5 rounded-md border-1 border-zinc-500 cursor-pointer hover:bg-neutral-700"
    onClick={onClick}
  >
    <VscChevronLeft className="w-5 h-5 text-white" />
    <span className="text-white font-light mr-2">Back</span>
  </div>
));
