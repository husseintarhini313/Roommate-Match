import { Stack, Chip } from "@mui/material";
import { EMPTY_FILTERS } from "../../types/browseFilters";
import type { BrowseFilters } from "../../types/browseFilters";

type ActiveFilterChipsProps = {
  filters: BrowseFilters;
  onRemove: (key: keyof BrowseFilters) => void;
};

export default function ActiveFilterChips({
  filters,
  onRemove,
}: ActiveFilterChipsProps) {
  const chips: { key: keyof BrowseFilters; label: string }[] = [];

  if (filters.location)
    chips.push({ key: "location", label: filters.location });
  if (filters.accommodationType)
    chips.push({ key: "accommodationType", label: filters.accommodationType });
  if (filters.maxRent !== EMPTY_FILTERS.maxRent)
    chips.push({ key: "maxRent", label: `Max $${filters.maxRent}` });
  if (filters.minBeds > 1)
    chips.push({ key: "minBeds", label: `${filters.minBeds}+ beds` });

  filters.amenities.forEach((a) => chips.push({ key: "amenities", label: a }));

  if (chips.length === 0) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
      {chips.map((chip, i) => (
        <Chip
          key={`${chip.key}-${i}`}
          label={chip.label}
          onDelete={() => onRemove(chip.key)}
          size="small"
        />
      ))}
    </Stack>
  );
}
