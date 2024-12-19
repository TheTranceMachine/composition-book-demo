import { BsFileEarmarkFill } from "react-icons/bs";
import { VscListTree } from "react-icons/vsc";
import { PaneChoicesTypes } from "@/types/types";

const components: PaneChoicesTypes[] = [
  {
    id: "1",
    name: "File Explorer",
    icon: <VscListTree />,
    description: "View and manage your files",
  },
  {
    id: "2",
    name: "New File",
    icon: <BsFileEarmarkFill />,
    description: "Create a new file",
  },
];

export default components;
