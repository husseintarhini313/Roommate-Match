import { TextField, InputAdornment } from "@mui/material";

type ExpensesFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function ExpensesField({ value, onChange }: ExpensesFieldProps) {
  return (
    <TextField
      label="Estimated Monthly Expenses"
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
