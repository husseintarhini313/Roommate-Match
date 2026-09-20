import { TextField } from "@mui/material";

type DescriptionFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionField({
  value,
  onChange,
}: DescriptionFieldProps) {
  return (
    <TextField
      label="Description"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      multiline
      minRows={3}
      required
      fullWidth
    />
  );
}
