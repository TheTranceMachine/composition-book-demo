import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "@/types/types";
import { FullCard, CollapsedCard } from "@components/CustomCardWithPopover/CustomCardWithPopover";

type StorySettingsPaneTypes = {
  storySettings: StorySettingTypes[];
  removeStorySetting: (val: { id: string, title: string }) => void;
  panelSize: number | undefined;
};

const StorySettingsPane = ({ storySettings, removeStorySetting, panelSize }: StorySettingsPaneTypes) => (
  <div className="px-3 py-2">
    {storySettings.map(({ id, title, description }) =>
      panelSize && panelSize > 10 ? (
        <FullCard
          key={id}
          id={id}
          title={title}
          description={description}
          icon={<BsImageFill />}
          deleteItem={() => removeStorySetting({ id, title })}
        />
      ) : (
        <CollapsedCard key={id} id={id} title={title} description={description} icon={<BsImageFill />} />
      )
    )}
  </div>
);

export default StorySettingsPane;
