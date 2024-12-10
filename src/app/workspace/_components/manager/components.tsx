import { BsFileEarmarkPersonFill, BsImageFill, BsFileEarmarkFill } from "react-icons/bs";
import { VscListTree } from "react-icons/vsc";
import { FaMagic } from "react-icons/fa";
import { PaneChoicesTypes } from "@/types/types";

const components: PaneChoicesTypes[] = [{
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
{
  id: "3",
  name: "Characters",
  icon: <BsFileEarmarkPersonFill />,
  description: "View and manage your characters",
},
{
  id: "4",
  name: "Story Settings",
  icon: <BsImageFill />,
  description: "View and manage your story settings",
},
{
  id: "5",
  name: "AI Enhancements",
  icon: <FaMagic />,
  description: "View and manage your AI enhancements",
}
];

export default components;