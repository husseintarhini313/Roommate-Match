import { TextField } from "@mui/material";

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

export default function NameField({
  value,
  onChange,
  disabled,
}: NameFieldProps) {
  return (
    <TextField
      label="Full Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      fullWidth
      disabled={disabled}
    />
  );
}
