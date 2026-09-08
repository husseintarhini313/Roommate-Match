import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

type AmenitiesInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export default function AmenitiesInput({
  value,
  onChange,
}: AmenitiesInputProps) {
  const [inputValue, setInputValue] = useState("");

  const commitPendingInput = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={value}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => onChange(newValue as string[])}
      onBlur={commitPendingInput}
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
