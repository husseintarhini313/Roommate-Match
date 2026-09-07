import { TextField } from "@mui/material";

type TitleFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TitleField({ value, onChange }: TitleFieldProps) {
  return (
    <TextField
      label="Title"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      required
      fullWidth
    />
  );
}
