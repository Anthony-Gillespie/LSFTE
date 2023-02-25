import { Typography, Box, Paper, IconButton, Switch } from "@mui/material";
import { FeatureToggle } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export type ToggleListItemProps = {
  featureToggle: FeatureToggle;
  onToggle: () => void;
};

export const ToggleListItem = ({
  featureToggle,
  onToggle,
}: ToggleListItemProps) => {
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
          <Typography>{featureToggle.uiName}</Typography>
          <Switch
            checked={featureToggle.state}
            onChange={onToggle}
            size="small"
          />
        </Box>
        <Box gridColumn={3}>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
