import { TextField } from "@mui/material";

type AgeFieldProps = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export default function AgeField({ value, onChange, disabled }: AgeFieldProps) {
  return (
    <TextField
      label="Age"
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      required
      fullWidth
      disabled={disabled}
      slotProps={{ htmlInput: { min: 18, max: 100 } }}
    />
  );
}
