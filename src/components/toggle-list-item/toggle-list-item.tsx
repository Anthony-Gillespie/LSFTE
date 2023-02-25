import {
  Typography,
  Box,
  Paper,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { FeatureToggle } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export type ToggleListItemProps = {
  featureToggle: FeatureToggle;
  onUpdate: (updatedToggle: FeatureToggle) => void;
  onDelete: () => void;
};

export const ToggleListItem = ({
  featureToggle,
  onUpdate,
  onDelete,
}: ToggleListItemProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const onToggle = () => {
    onUpdate({
      ...featureToggle,
      state: !featureToggle.state,
    });
  };

  const saveName = (name: string) => {
    setEditing(false);
    onUpdate({
      ...featureToggle,
      name,
    });
  };

  const onBlurName = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    saveName(e.currentTarget.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") saveName((e.target as HTMLInputElement).value);
  };

  return (
    <Paper elevation={1}>
      <Box
        padding={1}
        display="grid"
        gridTemplateColumns="auto 1fr auto"
        gap={1}
        alignItems="center"
      >
        <Box
          gridColumn={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {editing ? (
            <TextField
              autoFocus
              variant="standard"
              onBlur={onBlurName}
              onKeyUp={onKeyUp}
            />
          ) : (
            <Typography color={featureToggle.name ? undefined : "GrayText"}>
              {featureToggle.name ? featureToggle.name : <i>Un-Named</i>}
            </Typography>
          )}
          <Switch
            checked={featureToggle.state}
            onChange={onToggle}
            size="small"
          />
        </Box>
        <Box gridColumn={3}>
          <IconButton size="small" onClick={() => setEditing(true)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
