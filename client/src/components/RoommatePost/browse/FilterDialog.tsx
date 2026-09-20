import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Autocomplete,
  Stack,
  InputAdornment,
} from "@mui/material";
import { EMPTY_FILTERS } from "../../../types/browseFilters";
import type { BrowseFilters } from "../../../types/browseFilters";

type FilterDialogProps = {
  open: boolean;
  initialFilters: BrowseFilters;
  onClose: () => void;
  onApply: (filters: BrowseFilters) => void;
};

export default function FilterDialog({
  open,
  initialFilters,
  onClose,
  onApply,
}: FilterDialogProps) {
  const [draft, setDraft] = useState<BrowseFilters>(initialFilters);

  const handleClearAll = () => setDraft(EMPTY_FILTERS);

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Filters</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Location"
            value={draft.location}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="accType-label">Accommodation Type</InputLabel>
            <Select
              labelId="accType-label"
              label="Accommodation Type"
              value={draft.accommodationType}
              onChange={(e) =>
                setDraft({ ...draft, accommodationType: e.target.value })
              }
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="dorm">Dorm</MenuItem>
              <MenuItem value="studio">Studio</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Max Rent (optional)"
            type="number"
            value={draft.maxRent ?? ""}
            onChange={(e) =>
              setDraft({
                ...draft,
                maxRent: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
              htmlInput: { min: 0 },
            }}
          />

          <Stack spacing={0.5}>
            <Typography gutterBottom>
              Minimum Available Beds: {draft.minBeds}
            </Typography>
            <Slider
              value={draft.minBeds}
              min={1}
              max={8}
              step={1}
              marks
              onChange={(_, value) =>
                setDraft({ ...draft, minBeds: value as number })
              }
            />
          </Stack>

          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={draft.amenities}
            onChange={(_, newValue) =>
              setDraft({ ...draft, amenities: newValue as string[] })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Amenities"
                placeholder="Type and press Enter"
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClearAll}>Clear All</Button>
        <Button variant="contained" color="primary" onClick={handleApply}>
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
