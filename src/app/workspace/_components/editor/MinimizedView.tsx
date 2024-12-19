import { MdEdit } from "react-icons/md";

const MinimizedView = () => (
  <div
    className="minimized-view-editor flex bg-gray-950 py-6 border-2 border-black w-full items-center h-full gap-2 text-white"
    style={{
      writingMode: "vertical-rl",
      textOrientation: "mixed",
    }}
  >
    <MdEdit />
    Editor
  </div>
);

export default MinimizedView;
