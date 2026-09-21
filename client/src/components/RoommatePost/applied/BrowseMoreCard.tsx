import { Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type BrowseMoreCardProps = {
  onBrowseClick: () => void;
};

export default function BrowseMoreCard({ onBrowseClick }: BrowseMoreCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        borderRadius: "16px",
        p: "22px",
        textAlign: "center",
      }}
    >
      <Typography sx={{ color: "#FFFFFF", fontWeight: 700, mb: 0.5 }}>
        Still looking?
      </Typography>
      <Typography sx={{ color: "#FDF8F3", fontSize: "0.875rem", mb: 2 }}>
        Browse more listings to find your perfect match.
      </Typography>
      <Button
        variant="contained"
        onClick={onBrowseClick}
        startIcon={<SearchIcon />}
        sx={{
          bgcolor: "#FFFFFF",
          color: "primary.main",
          "&:hover": { bgcolor: "#FDF8F3" },
        }}
      >
        Browse Listings
      </Button>
    </Box>
  );
}
