import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { apiFetch } from "../../api/client";
import ProfileDetails from "../Profile/ProfileDetails";
import type { Profile } from "../../types/profile";

type HostProfileDialogProps = {
  open: boolean;
  userId: string | null;
  onClose: () => void;
};

export default function HostProfileDialog({
  open,
  userId,
  onClose,
}: HostProfileDialogProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !userId) return;

    async function fetchProfile() {
      setIsLoading(true);
      setError("");

      try {
        const result = await apiFetch<Profile>(`/profile/${userId}`);
        setProfile(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [open, userId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ pt: 4 }}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}
        {profile && !isLoading && <ProfileDetails profile={profile} />}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
