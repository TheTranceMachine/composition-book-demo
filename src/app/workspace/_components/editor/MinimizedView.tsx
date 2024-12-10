import { MdEdit } from "react-icons/md";

const MinimizedView = () => (
  <div className="minimized-view-editor flex bg-white rounded-md py-2 border-2 border-black w-full items-center justify-center h-44 gap-2" style={{
    writingMode: 'vertical-rl',
    textOrientation: 'mixed'
  }}>
    <MdEdit />
    Editor
  </div>
);

export default MinimizedView;