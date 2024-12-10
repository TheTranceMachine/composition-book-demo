import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { FaFile, FaFolder } from "react-icons/fa6"

const InputToggleGroup = ({ setType, type }: { setType: (val: string) => void; type: string; }) => (
  <ToggleGroup type="single" defaultValue={type} onValueChange={(val) => setType(val)}>
    <ToggleGroupItem value="file" aria-label="Toggle File">
      <FaFile />
    </ToggleGroupItem>
    <ToggleGroupItem value="dir" aria-label="Toggle Folder">
      <FaFolder />
    </ToggleGroupItem>
  </ToggleGroup>
);

export default InputToggleGroup;