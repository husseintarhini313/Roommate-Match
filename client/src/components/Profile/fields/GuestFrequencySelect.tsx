import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type GuestFrequency = "rarely" | "sometimes" | "often";

type GuestFrequencySelectProps = {
  value: GuestFrequency;
  onChange: (value: GuestFrequency) => void;
  disabled: boolean;
};

export default function GuestFrequencySelect({
  value,
  onChange,
  disabled,
}: GuestFrequencySelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="guestFrequency-label">
        How Often Do You Have Guests?
      </InputLabel>
      <Select
        labelId="guestFrequency-label"
        label="How Often Do You Have Guests?"
        value={value}
        onChange={(e) => onChange(e.target.value as GuestFrequency)}
      >
        <MenuItem value="rarely">Rarely</MenuItem>
        <MenuItem value="sometimes">Sometimes</MenuItem>
        <MenuItem value="often">Often</MenuItem>
      </Select>
    </FormControl>
  );
}
