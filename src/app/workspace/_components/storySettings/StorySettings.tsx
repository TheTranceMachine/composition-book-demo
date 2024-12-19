import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "@/types/types";
import { FullCard, CollapsedCard } from "@components/CustomCardWithPopover/CustomCardWithPopover";

type StorySettingsPaneTypes = {
  storySettings: StorySettingTypes[];
  removeStorySetting: (val: { id: string; title: string }) => void;
  panelExpanded: boolean | 0 | undefined;
};

const StorySettingsPane = ({ storySettings, removeStorySetting, panelExpanded }: StorySettingsPaneTypes) => (
  <div className="px-3 py-2">
    {storySettings.map(({ id, title, description }) =>
      panelExpanded ? (
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
