import { Box, Typography, Slider } from "@mui/material";

type CleanlinessSliderProps = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export default function CleanlinessSlider({
  value,
  onChange,
  disabled,
}: CleanlinessSliderProps) {
  return (
    <Box>
      <Typography gutterBottom>Cleanliness: {value}</Typography>
      <Slider
        value={value}
        min={1}
        max={5}
        step={1}
        marks
        disabled={disabled}
        onChange={(_, newValue) => onChange(newValue as number)}
      />
    </Box>
  );
}
