import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Badge,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import HomeIcon from "@mui/icons-material/Home";
import PostCard from "./PostCard";
import FilterDialog from "./FilterDialog";
import { EMPTY_FILTERS } from "../../types/browseFilters";
import type { BrowseFilters } from "../../types/browseFilters";
import ActiveFilterChips from "./ActiveFilterChips";
import type { Post } from "../../types/post";

type BrowseViewProps = {
  posts: Post[];
  isLoading: boolean;
  appliedPostIds: Set<string>;
  filters: BrowseFilters;
  onFiltersChange: (filters: BrowseFilters) => void;
  onApplyClick: (post: Post) => void;
};

export default function BrowseView({
  posts,
  isLoading,
  appliedPostIds,
  filters,
  onFiltersChange,
  onApplyClick,
}: BrowseViewProps) {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.accommodationType) count++;
    if (filters.maxRent !== null) count++;
    if (filters.minBeds > 1) count++;
    count += filters.amenities.length;
    return count;
  }, [filters]);

  const handleRemoveFilter = (key: keyof BrowseFilters) => {
    if (key === "amenities") {
      onFiltersChange({ ...filters, amenities: [] });
    } else {
      onFiltersChange({ ...filters, [key]: EMPTY_FILTERS[key] });
    }
  };

  function renderListings() {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      );
    }

    if (posts.length === 0) {
      return (
        <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
          No posts match your filters.
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
            <PostCard
              post={post}
              actions={
                appliedPostIds.has(post._id) ? (
                  <Button variant="contained" fullWidth disabled>
                    Applied
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => onApplyClick(post)}
                  >
                    Apply
                  </Button>
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <HomeIcon sx={{ color: "primary.main" }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Find Your Perfect Roommate
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Discover compatible roommates and find the right place to call
              home.
            </Typography>
          </Box>

          <Badge badgeContent={activeFilterCount} color="primary">
            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={() => setFilterDialogOpen(true)}
              sx={{ whiteSpace: "nowrap" }}
            >
              Filters
            </Button>
          </Badge>
        </Stack>

        <ActiveFilterChips filters={filters} onRemove={handleRemoveFilter} />

        {renderListings()}
      </Grid>

      <FilterDialog
        open={filterDialogOpen}
        initialFilters={filters}
        onClose={() => setFilterDialogOpen(false)}
        onApply={onFiltersChange}
      />
    </Grid>
  );
}
