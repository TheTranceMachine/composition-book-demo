import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { CharacterTypes } from "@/types/types";
import { FullCard, CollapsedCard } from "@components/CustomCardWithPopover/CustomCardWithPopover";

type CharactersPaneTypes = {
  characters: CharacterTypes[];
  removeCharacter: (val: { id: string, name: string }) => void;
  panelExpanded: boolean | 0 | undefined;
};

const CharactersPane = ({ characters, removeCharacter, panelExpanded }: CharactersPaneTypes) => (
  <div className="px-3 py-2">
    {characters.map(({ id, name, description }) =>
      panelExpanded ? (
        <FullCard
          key={id}
          id={id}
          title={name}
          description={description}
          icon={<BsFileEarmarkPersonFill />}
          deleteItem={() => removeCharacter({ id, name })}
        />
      ) : (
        <CollapsedCard key={id} id={id} title={name} description={description} icon={<BsFileEarmarkPersonFill />} />
      )
    )}
  </div>
);

export default CharactersPane;
