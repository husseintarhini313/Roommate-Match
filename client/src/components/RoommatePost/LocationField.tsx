import { TextField } from "@mui/material";

type LocationFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LocationField({ value, onChange }: LocationFieldProps) {
  return (
    <TextField
      label="Location"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      required
      fullWidth
    />
  );
}
