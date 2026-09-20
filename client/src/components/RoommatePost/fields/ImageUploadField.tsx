import { useMemo, useEffect } from "react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

type ImageUploadFieldProps = {
  value: File[];
  onChange: (value: File[]) => void;
};

export default function ImageUploadField({
  value,
  onChange,
}: ImageUploadFieldProps) {
  const previews = useMemo(
    () => value.map((file) => URL.createObjectURL(file)),
    [value],
  );

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        Upload Images
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files) {
              onChange(Array.from(e.target.files));
            }
          }}
        />
      </Button>

      {previews.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
          {previews.map((src, index) => (
            <Box key={src} sx={{ position: "relative" }}>
              <Box
                component="img"
                src={src}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
