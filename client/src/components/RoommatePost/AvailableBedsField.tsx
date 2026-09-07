import { TextField } from "@mui/material";

type AvailableBedsFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function AvailableBedsField({
  value,
  onChange,
}: AvailableBedsFieldProps) {
  return (
    <TextField
      label="Available Beds"
      type="number"
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
      required
      fullWidth
      slotProps={{ htmlInput: { min: 0 } }}
    />
  );
}
