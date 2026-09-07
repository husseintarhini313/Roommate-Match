import { TextField, InputAdornment } from "@mui/material";

type MonthlyRentFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function MonthlyRentField({
  value,
  onChange,
}: MonthlyRentFieldProps) {
  return (
    <TextField
      label="Monthly Rent"
      type="number"
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        },
      }}
    />
  );
}
