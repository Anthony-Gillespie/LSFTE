import {
  Typography,
  Box,
  Paper,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { FeatureToggle } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { TriSwitch } from "../tri-switch";

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

  const onToggle = (newState: boolean | null) => {
    onUpdate({
      ...featureToggle,
      state: newState,
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
        gridTemplateColumns="minmax(0, 1fr) auto"
        gap={1}
        alignItems="center"
      >
        <Box
          width="100%"
          gridColumn={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {editing ? (
            <TextField
              autoFocus
              defaultValue={featureToggle.name}
              variant="standard"
              onBlur={onBlurName}
              onKeyUp={onKeyUp}
              fullWidth
            />
          ) : (
            <Tooltip
              title={
                featureToggle.name
                  ? featureToggle.name
                  : "Click the edit button to name the toggle"
              }
            >
              <Typography
                color={featureToggle.name ? undefined : "GrayText"}
                noWrap={true}
              >
                {featureToggle.name ? featureToggle.name : <i>Un-Named</i>}
              </Typography>
            </Tooltip>
          )}
        </Box>
        <Box gridColumn={2}>
          <TriSwitch value={featureToggle.state} onChange={onToggle} />
        </Box>
        <Box gridColumn={3}>
          <Tooltip title="Edit the toggle name">
            <IconButton size="small" onClick={() => setEditing(true)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete the toggle">
            <IconButton size="small" color="error" onClick={onDelete}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};
