import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { RequestWithPost } from "../../types/request";

type ApplicationCardProps = {
  request: RequestWithPost;
  onWithdraw: (requestId: string) => void;
  onViewDetails: () => void;
};

const statusConfig = {
  PENDING: { label: "Pending", bg: "#FFF4E5", color: "#B26A00" },
  ACCEPTED: { label: "Accepted", bg: "#E6F4EA", color: "#1E4B4A" },
  REJECTED: { label: "Rejected", bg: "#FBEAEA", color: "#B23A3A" },
};

export default function ApplicationCard({
  request,
  onWithdraw,
  onViewDetails,
}: ApplicationCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const post = request.post;
  const status = statusConfig[request.status];

  if (!post) return null;

  const handleWithdraw = () => {
    setMenuAnchor(null);
    if (confirm("Withdraw this application")) onWithdraw(request._id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src={post.images[0]}
        alt={post.title}
        sx={{ width: 140, minWidth: 140, objectFit: "cover" }}
      />

      <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {post.title}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <Chip
              label={status.label}
              size="small"
              sx={{ bgcolor: status.bg, color: status.color, fontWeight: 700 }}
            />
            {request.status === "PENDING" && (
              <IconButton
                size="small"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <LocationOnIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {post.location}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}
        >
          <Chip
            label={post.accommodationType}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<BedIcon fontSize="small" />}
            label={`${post.availableBeds}/${post.totalBeds} beds`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{ mt: 1, fontWeight: 700, color: "primary.main" }}
        >
          ${post.monthlyRent}/month + ~${post.expenses} expenses
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Applied {new Date(request.createdAt).toLocaleDateString()}
        </Typography>

        {request.status === "PENDING" && request.message && (
          <Typography
            variant="body2"
            sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}
          >
            "{request.message}"
          </Typography>
        )}

        {request.status === "ACCEPTED" && (
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "success.main", fontWeight: 600 }}
          >
            Your application has been accepted!
          </Typography>
        )}

        {request.status === "REJECTED" && (
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            The host has chosen another applicant.
          </Typography>
        )}

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="outlined" size="small" onClick={onViewDetails}>
            View Details
          </Button>
        </Stack>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={handleWithdraw} sx={{ color: "error.main" }}>
          Withdraw Application
        </MenuItem>
      </Menu>
    </Box>
  );
}
