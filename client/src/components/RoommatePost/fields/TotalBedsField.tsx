import { TextField } from "@mui/material";

type TotalBedsFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function TotalBedsField({
  value,
  onChange,
}: TotalBedsFieldProps) {
  return (
    <TextField
      label="Total Beds"
      type="number"
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
      required
      fullWidth
      slotProps={{ htmlInput: { min: 1 } }}
    />
  );
}
