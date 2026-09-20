import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type NoisePreference = "quiet" | "moderate" | "loud";

type NoisePreferenceSelectProps = {
  value: NoisePreference;
  onChange: (value: NoisePreference) => void;
  disabled: boolean;
};

export default function NoisePreferenceSelect({
  value,
  onChange,
  disabled,
}: NoisePreferenceSelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="noisePreference-label">Preferred Noise Level</InputLabel>
      <Select
        labelId="noisePreference-label"
        label="Preferred Noise Level"
        value={value}
        onChange={(e) => onChange(e.target.value as NoisePreference)}
      >
        <MenuItem value="quiet">Quiet</MenuItem>
        <MenuItem value="moderate">Moderate</MenuItem>
        <MenuItem value="loud">Loud</MenuItem>
      </Select>
    </FormControl>
  );
}
