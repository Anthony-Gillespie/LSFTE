import { FeatureToggle } from "../../types";
import { Box } from "@mui/material";
import { ToggleListItem } from "../toggle-list-item";

export type ToggleListProps = {
  featureToggles: Array<FeatureToggle>;
  onItemToggle: (index: number) => void;
};

export const ToggleList = ({
  featureToggles,
  onItemToggle,
}: ToggleListProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} overflow="auto">
      {featureToggles.map((featureToggle, index) => (
        <ToggleListItem
          key={index}
          featureToggle={featureToggle}
          onToggle={() => onItemToggle(index)}
        />
      ))}
    </Box>
  );
};
