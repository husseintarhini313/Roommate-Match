import { Autocomplete, TextField } from "@mui/material";

type AmenitiesInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export default function AmenitiesInput({
  value,
  onChange,
}: AmenitiesInputProps) {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue as string[]);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Amenities"
          placeholder="Type and press Enter"
        />
      )}
    />
  );
}
