import { BsFileEarmarkPersonFill, BsImageFill } from "react-icons/bs";

type PopupContentTypes = {
  title: string;
  description: string;
  type: string;
};

const Popup = ({ title, description, type }: PopupContentTypes) => (
  <div className="bg-neutral-300 rounded-md border-1 border-neutral-400 shadow-md shadow-slate-900 mt-3 w-52">
    <div className="absolute w-0 h-0 border-l-[5px] border-l-transparent border-r-transparent border-neutral-400 border-r-[5px] border-b-[5px] top-[11px] left-[5px]"></div>
    <div className="p-2 border-b border-neutral-400 flex gap-2 items-center">
      {type === "character" ? (
        <BsFileEarmarkPersonFill className="text-black" />
      ) : (
        <BsImageFill className="text-black" />
      )}
      <div className="font-medium truncate text-black">{title}</div>
    </div>
    <div className="p-2 border-t border-t-neutral-200">
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

export default Popup;
