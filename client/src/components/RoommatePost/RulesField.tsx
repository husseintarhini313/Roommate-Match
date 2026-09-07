import { TextField } from "@mui/material";

type RulesFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RulesField({ value, onChange }: RulesFieldProps) {
  return (
    <TextField
      label="House Rules"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      multiline
      minRows={2}
      fullWidth
      required
    />
  );
}
