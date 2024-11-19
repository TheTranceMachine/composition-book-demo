import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { CharacterTypes } from "@/types/types";
import { FullCard, CollapsedCard } from "@components/CustomCardWithPopover/CustomCardWithPopover";

type CharactersPaneTypes = {
  characters: CharacterTypes[];
  removeCharacter: (val: { id: string, name: string }) => void;
  panelSize: number | undefined;
};

const CharactersPane = ({ characters, removeCharacter, panelSize }: CharactersPaneTypes) => (
  <div className="px-3 py-2">
    {characters.map(({ id, name, description }) =>
      panelSize && panelSize > 10 ? (
        <FullCard
          id={id}
          title={name}
          description={description}
          icon={<BsFileEarmarkPersonFill />}
          deleteItem={() => removeCharacter({ id, name })}
        />
      ) : (
        <CollapsedCard id={id} title={name} description={description} icon={<BsFileEarmarkPersonFill />} />
      )
    )}
  </div>
);

export default CharactersPane;
