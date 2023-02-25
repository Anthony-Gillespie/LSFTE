import { useState, useEffect } from "react";
import { Box, Button, Divider } from "@mui/material";
import { ToggleList } from "./components/toggle-list";
import { FeatureToggle } from "./types";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddIcon from "@mui/icons-material/Add";

const saveFeatureToggles = async (featureToggles: Array<FeatureToggle>) => {
  try {
    await chrome.storage.local.set({ featureToggles });
  } catch (e) {
    console.error(e);
  }
};

const loadFeatureToggles = async (): Promise<Array<FeatureToggle>> => {
  try {
    const { featureToggles } = await chrome.storage.local.get([
      "featureToggles",
    ]);
    if (Array.isArray(featureToggles)) return featureToggles;
    saveFeatureToggles([]);
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const Extension = () => {
  const [featureToggles, setFeatureToggles] =
    useState<Array<FeatureToggle> | null>(null);

  const loadInitialToggleState = async () => {
    const initialFeatureToggles = await loadFeatureToggles();
    setFeatureToggles(initialFeatureToggles);
  };

  useEffect(() => {
    loadInitialToggleState();
  }, []);

  const onUpdateToggles = (updatedToggles: Array<FeatureToggle>) => {
    setFeatureToggles(updatedToggles);
    saveFeatureToggles(updatedToggles);
  };

  const onUpdateToggle = (index: number, updatedToggle: FeatureToggle) => {
    if (featureToggles === null) return;
    const updatedToggles = featureToggles.map((featureToggle, i) => {
      if (i === index) return updatedToggle;
      return featureToggle;
    });
    onUpdateToggles(updatedToggles);
  };

  const onDeleteToggle = (index: number) => {
    if (featureToggles === null) return;
    onUpdateToggles(featureToggles.filter((_, i) => i !== index));
  };

  const onAddToggle = () => {
    if (featureToggles === null) return;
    onUpdateToggles([...featureToggles, { name: "", state: false }]);
  };

  return (
    <Box
      width="350px"
      maxHeight="600px"
      display="grid"
      gridTemplateRows="minmax(0, 1fr) auto auto"
      gap={1}
      padding={1}
    >
      {featureToggles && (
        <ToggleList
          featureToggles={featureToggles}
          onUpdateToggle={onUpdateToggle}
          onDeleteToggle={onDeleteToggle}
        />
      )}
      <Divider variant="middle" />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Button color="warning" variant="outlined" startIcon={<SaveAsIcon />}>
          Write
        </Button>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={onAddToggle}
        >
          New Toggle
        </Button>
      </Box>
    </Box>
  );
};
