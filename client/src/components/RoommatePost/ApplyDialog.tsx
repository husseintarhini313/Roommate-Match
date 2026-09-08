import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import type { Post } from "../../types/post";

type ApplyDialogProps = {
  open: boolean;
  post: Post | null;
  onClose: () => void;
  onConfirm: (message: string) => Promise<void>;
  onViewProfile: (userId: string) => void;
};

export default function ApplyDialog({
  open,
  post,
  onClose,
  onConfirm,
  onViewProfile,
}: ApplyDialogProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onConfirm(message);
    setIsSubmitting(false);
    setMessage("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Apply for this room?</DialogTitle>

      <DialogContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {post.title}
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {post.location}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          <Chip label={`$${post.monthlyRent}/month`} size="small" />
          <Chip
            icon={<BedIcon fontSize="small" />}
            label={`${post.availableBeds} bed(s) available`}
            size="small"
          />
        </Stack>

        {post.compatibilityScore !== undefined &&
          post.compatibilityScore !== null && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your compatibility:{" "}
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {post.compatibilityScore}%
              </Box>
            </Typography>
          )}

        <Box sx={{ mb: 2, p: 2, bgcolor: "#F5EFE7", borderRadius: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            About the host
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">{post.creatorName}</Typography>
            <Button size="small" onClick={() => onViewProfile(post.createdBy)}>
              View Profile
            </Button>
          </Stack>
        </Box>

        <TextField
          label="Message to host (optional)"
          placeholder="Tell them a little about yourself..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Application"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
