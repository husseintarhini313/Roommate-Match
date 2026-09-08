import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api/client";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

type Profile = {
  name: string;
  age: number;
  bio?: string;
  questionnaire: {
    smokes: boolean;
    pets: boolean;
    sleepSchedule: "early" | "late" | "flexible";
    noisePreference: "quiet" | "moderate" | "loud";
    guestFrequency: "rarely" | "sometimes" | "often";
    cleanliness: number;
    socialLevel: number;
    budget: number;
  };
};

export default function ViewProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
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
  }, [userId]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
        <Container maxWidth="sm">
          <Alert severity="error">{error || "Profile not found"}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {profile.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {profile.age} years old
          </Typography>

          {profile.bio && (
            <Typography variant="body1" sx={{ mb: 3 }}>
              {profile.bio}
            </Typography>
          )}

          <Divider sx={{ mb: 3 }} />

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            <Chip
              label={profile.questionnaire.smokes ? "Smokes" : "Non-smoker"}
            />
            <Chip label={profile.questionnaire.pets ? "Has pets" : "No pets"} />
            <Chip label={`Sleep: ${profile.questionnaire.sleepSchedule}`} />
            <Chip label={`Noise: ${profile.questionnaire.noisePreference}`} />
            <Chip label={`Guests: ${profile.questionnaire.guestFrequency}`} />
            <Chip
              label={`Cleanliness: ${profile.questionnaire.cleanliness}/5`}
            />
            <Chip label={`Social: ${profile.questionnaire.socialLevel}/5`} />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
