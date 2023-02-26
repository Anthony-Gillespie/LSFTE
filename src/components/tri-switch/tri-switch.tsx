import { Box, useTheme, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import CheckIcon from "@mui/icons-material/Check";

export type TriSwitchProps = {
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  disabled: boolean;
};

export const TriSwitch = ({ value, onChange, disabled }: TriSwitchProps) => {
  const theme = useTheme();

  const sFalse = value === false;
  const sNull = value === null;
  const sTrue = value === true;

  const cursor = disabled ? "not-allowed" : "pointer";
  const color = disabled ? "disabled" : "action";

  return (
    <Box
      display="flex"
      alignItems="center"
      border={`1px solid ${theme.palette.divider}`}
      borderRadius="5px"
      bgcolor={theme.palette.background.paper}
    >
      <Tooltip title={disabled ? "Add a name before setting state" : "FALSE"}>
        <Box
          sx={{ ":hover": { cursor } }}
          bgcolor={sFalse ? theme.palette.error.main : undefined}
          onClick={() => !disabled && onChange(false)}
          width="32px"
          height="20px"
          textAlign="center"
          borderRadius="5px 0px 0px 5px"
        >
          <CloseIcon fontSize="small" color={color} />
        </Box>
      </Tooltip>

      <Tooltip title={disabled ? "Add a name before setting state" : "UNSET"}>
        <Box
          sx={{ ":hover": { cursor } }}
          bgcolor={sNull ? theme.palette.grey[800] : undefined}
          onClick={() => !disabled && onChange(null)}
          width="32px"
          height="20px"
          textAlign="center"
        >
          <CodeOffIcon fontSize="small" color={color} />
        </Box>
      </Tooltip>

      <Tooltip title={disabled ? "Add a name before setting state" : "TRUE"}>
        <Box
          sx={{ ":hover": { cursor } }}
          bgcolor={sTrue ? theme.palette.primary.main : undefined}
          onClick={() => !disabled && onChange(true)}
          width="32px"
          height="20px"
          textAlign="center"
          borderRadius="0px 5px 5px 0px"
        >
          <CheckIcon fontSize="small" color={color} />
        </Box>
      </Tooltip>
    </Box>
  );
};
