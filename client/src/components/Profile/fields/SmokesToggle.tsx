import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type SmokesToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
};

export default function SmokesToggle({
  value,
  onChange,
  disabled,
}: SmokesToggleProps) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Do you smoke?
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={value}
        disabled={disabled}
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
      >
        <ToggleButton value={true}>Yes</ToggleButton>
        <ToggleButton value={false}>No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
