import { useState, useEffect } from "react";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import { ToggleList } from "./components/toggle-list";
import { FeatureToggle } from "./types";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddIcon from "@mui/icons-material/Add";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import {
  saveFeatureToggles,
  writeFeatureToggles,
  loadFeatureToggles,
} from "./helper";

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
    writeFeatureToggles(updatedToggles);
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
    onUpdateToggles([...featureToggles, { name: "", state: null }]);
  };

  const onForceWrite = () => {
    if (featureToggles === null) return;
    writeFeatureToggles(featureToggles);
  };

  const onUnsetAll = () => {
    if (featureToggles === null) return;
    onUpdateToggles(
      featureToggles.map((featureToggle) => ({ ...featureToggle, state: null }))
    );
  };

  return (
    <Box
      width="450px"
      maxHeight="600px"
      display="grid"
      gridTemplateRows="auto auto minmax(0, 1fr) auto auto auto"
      gap={1}
      padding={1}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Tooltip title="Force writes the current state to the current tab">
          <Button
            color="warning"
            variant="outlined"
            startIcon={<SaveAsIcon />}
            onClick={onForceWrite}
          >
            Force Write
          </Button>
        </Tooltip>
        <Tooltip title="Moves all the overrides back to their unset state">
          <Button
            color="warning"
            variant="outlined"
            startIcon={<CodeOffIcon />}
            onClick={onUnsetAll}
          >
            Unset all
          </Button>
        </Tooltip>
      </Box>

      <Divider variant="middle" />

      {featureToggles && (
        <ToggleList
          featureToggles={featureToggles}
          onUpdateToggle={onUpdateToggle}
          onDeleteToggle={onDeleteToggle}
        />
      )}
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Tooltip title="Add a new feature toggle">
          <Button startIcon={<AddIcon />} onClick={onAddToggle}>
            New Toggle
          </Button>
        </Tooltip>
      </Box>
      <Divider variant="middle" />

      <Typography variant="overline" color="GrayText" align="right">
        Built by Anthony Gillespie
      </Typography>
    </Box>
  );
};
