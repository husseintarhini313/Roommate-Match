import { TextField, InputAdornment } from "@mui/material";

type BudgetFieldProps = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export default function BudgetField({
  value,
  onChange,
  disabled,
}: BudgetFieldProps) {
  return (
    <TextField
      label="Monthly Budget"
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      required
      fullWidth
      disabled={disabled}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        },
      }}
    />
  );
}
