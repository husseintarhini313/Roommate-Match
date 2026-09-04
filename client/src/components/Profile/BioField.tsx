import { TextField } from "@mui/material";

type BioFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

export default function BioField({ value, onChange, disabled }: BioFieldProps) {
  return (
    <TextField
      label="Bio"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline
      minRows={3}
      fullWidth
      disabled={disabled}
      placeholder="Tell us a little about yourself"
    />
  );
}
