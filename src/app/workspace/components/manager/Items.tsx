import { memo, MouseEventHandler } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { VscChevronRight } from "react-icons/vsc";

// TODO: Move to global store
const items = ["File Explorer", "New File", "Characters", "Story Settings", "AI Enhancements"];

export const Items = memo(({ onClick }: { onClick: (val: string) => void }) =>
  items.map((item) => (
    <ListGroup.Item key={item} onClick={() => onClick(item)} className="cursor-pointer hover:bg-neutral-700">
      <div className="flex justify-between items-center">
        {item}
        {item === "New File" && <VscChevronRight className="w-5 h-5 text-white" />}
      </div>
    </ListGroup.Item>
  ))
);
