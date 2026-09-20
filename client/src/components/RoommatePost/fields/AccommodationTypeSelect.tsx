import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type AccommodationType = "apartment" | "dorm" | "studio";

type AccommodationTypeSelectProps = {
  value: AccommodationType;
  onChange: (value: AccommodationType) => void;
};

export default function AccommodationTypeSelect({
  value,
  onChange,
}: AccommodationTypeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="accommodationType-label">Accommodation Type</InputLabel>
      <Select
        labelId="accommodationType-label"
        label="Accommodation Type"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as AccommodationType);
        }}
      >
        <MenuItem value="apartment">Apartment</MenuItem>
        <MenuItem value="dorm">Dorm</MenuItem>
        <MenuItem value="studio">Studio</MenuItem>
      </Select>
    </FormControl>
  );
}
