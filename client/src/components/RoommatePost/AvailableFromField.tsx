import { TextField } from "@mui/material";

type AvailableFromFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function AvailableFromField({
  value,
  onChange,
}: AvailableFromFieldProps) {
  return (
    <TextField
      label="Available From"
      type="date"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      required
      fullWidth
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
}
