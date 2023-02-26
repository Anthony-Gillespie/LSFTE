import { Box, useTheme, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import CheckIcon from "@mui/icons-material/Check";

export type TriSwitchProps = {
  value: boolean | null;
  onChange: (value: boolean | null) => void;
};

export const TriSwitch = ({ value, onChange }: TriSwitchProps) => {
  const theme = useTheme();

  const sFalse = value === false;
  const sNull = value === null;
  const sTrue = value === true;

  return (
    <Box
      display="flex"
      alignItems="center"
      border={`1px solid ${theme.palette.divider}`}
      borderRadius="5px"
      bgcolor={theme.palette.background.paper}
    >
      <Tooltip title="FALSE">
        <Box
          sx={{ ":hover": { cursor: "pointer" } }}
          bgcolor={sFalse ? theme.palette.error.main : undefined}
          onClick={() => onChange(false)}
          width="32px"
          height="20px"
          textAlign="center"
          borderRadius="5px 0px 0px 5px"
        >
          <CloseIcon fontSize="small" />
        </Box>
      </Tooltip>

      <Tooltip title="UNSET">
        <Box
          sx={{ ":hover": { cursor: "pointer" } }}
          bgcolor={sNull ? theme.palette.grey[800] : undefined}
          onClick={() => onChange(null)}
          width="32px"
          height="20px"
          textAlign="center"
        >
          <CodeOffIcon fontSize="small" />
        </Box>
      </Tooltip>

      <Tooltip title="TRUE">
        <Box
          sx={{ ":hover": { cursor: "pointer" } }}
          bgcolor={sTrue ? theme.palette.primary.main : undefined}
          onClick={() => onChange(true)}
          width="32px"
          height="20px"
          textAlign="center"
          borderRadius="0px 5px 5px 0px"
        >
          <CheckIcon fontSize="small" />
        </Box>
      </Tooltip>
    </Box>
  );
};
