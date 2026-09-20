import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type PetsToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
};

export default function PetsToggle({
  value,
  onChange,
  disabled,
}: PetsToggleProps) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Do you have any pets?
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
