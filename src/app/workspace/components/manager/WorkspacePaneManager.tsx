import { useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { BackButton } from "./BackButton";
import { Items } from "./Items";
import { Input } from "./Input";

type WorkspacePaneManagerTypes = {
  handlePaneComponentChange: (val: { name: string; type?: string }) => void;
};

const WorkspacePaneManager = ({ handlePaneComponentChange }: WorkspacePaneManagerTypes) => {
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const paneComponentSelection = (val) => {
    return val === "New File" ? setPage(2) : handlePaneComponentChange({ name: val });
  };

  return page === 1 ? (
    <ListGroup className="m-3" data-bs-theme="dark">
      <Items onClick={(val) => paneComponentSelection(val)} />
    </ListGroup>
  ) : (
    <div className="flex flex-col m-3 gap-3">
      <BackButton onClick={() => setPage(1)} />
      <Input
        onClick={() => handlePaneComponentChange({ name: input, type: "file" })}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default WorkspacePaneManager;
