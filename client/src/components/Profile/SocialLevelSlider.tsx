import { Box, Typography, Slider } from "@mui/material";

type SocialLevelSliderProps = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export default function SocialLevelSlider({
  value,
  onChange,
  disabled,
}: SocialLevelSliderProps) {
  return (
    <Box>
      <Typography gutterBottom>Social Level: {value}</Typography>
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
