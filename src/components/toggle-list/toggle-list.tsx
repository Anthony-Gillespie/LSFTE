import { FeatureToggle } from "../../types";
import { Box, Typography } from "@mui/material";
import { ToggleListItem } from "../toggle-list-item";

export type ToggleListProps = {
  featureToggles: Array<FeatureToggle>;
  onUpdateToggle: (index: number, updatedToggle: FeatureToggle) => void;
  onDeleteToggle: (index: number) => void;
};

export const ToggleList = ({
  featureToggles,
  onUpdateToggle,
  onDeleteToggle,
}: ToggleListProps) => {
  if (featureToggles.length === 0)
    return (
      <Box width="100%" display="flex" justifyContent="center" padding={1}>
        <Typography variant="button">No toggles added yet</Typography>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="column" gap={1} overflow="auto">
      {featureToggles.map((featureToggle, index) => (
        <ToggleListItem
          key={index}
          featureToggle={featureToggle}
          onUpdate={(updatedToggle: FeatureToggle) =>
            onUpdateToggle(index, updatedToggle)
          }
          onDelete={() => onDeleteToggle(index)}
        />
      ))}
    </Box>
  );
};
