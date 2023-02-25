import { useState } from "react";
import { Box, Button } from "@mui/material";
import { ToggleList } from "./components/toggle-list";
import { FeatureToggle } from "./types";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddIcon from "@mui/icons-material/Add";

const featureToggles: Array<FeatureToggle> = [
  {
    uiName: "Test",
    type: "Lauch Darkly",
    state: true,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
  {
    uiName: "Test 2",
    type: "Lauch Darkly",
    state: false,
  },
];

export const Extension = () => {
  const [liveFeatureToggles, setLiveToggleList] =
    useState<Array<FeatureToggle>>(featureToggles);

  const onItemToggle = (updateIndex: number) => {
    setLiveToggleList(
      liveFeatureToggles.map((liveFeatureToggle, index) => ({
        ...liveFeatureToggle,
        state:
          updateIndex === index
            ? !liveFeatureToggle.state
            : liveFeatureToggle.state,
      }))
    );
  };

  return (
    <Box
      width="350px"
      maxHeight="600px"
      display="grid"
      gridTemplateRows="minmax(0, 1fr) auto"
      gap={1}
      padding={1}
    >
      <ToggleList
        featureToggles={liveFeatureToggles}
        onItemToggle={onItemToggle}
      />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Button color="warning" variant="outlined" startIcon={<SaveAsIcon />}>
          Write
        </Button>
        <Button startIcon={<AddIcon />} variant="contained">
          New Toggle
        </Button>
      </Box>
    </Box>
  );
};
