import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Alert,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";

import NameField from "../components/Profile/NameField";
import AgeField from "../components/Profile/AgeField";
import BioField from "../components/Profile/BioField";
import SmokesToggle from "../components/Profile/SmokesToggle";
import PetsToggle from "../components/Profile/PetsToggle";
import SleepScheduleSelect from "../components/Profile/SleepScheduleSelect";
import NoisePreferenceSelect from "../components/Profile/NoisePreferenceSelect";
import GuestFrequencySelect from "../components/Profile/GuestFrequencySelect";
import CleanlinessSlider from "../components/Profile/CleanlinessSlider";
import SocialLevelSlider from "../components/Profile/SocialLevelSlider";
import BudgetField from "../components/Profile/BudgetField";
import ProfileActions from "../components/Profile/ProfileActions";

type Profile = {
  _id: string;
  userId: string;
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

type ProfileFormData = {
  name: string;
  age: number;
  bio: string;
  questionnaire: Profile["questionnaire"];
};

const emptyQuestionnaire: Profile["questionnaire"] = {
  smokes: false,
  pets: false,
  sleepSchedule: "flexible",
  noisePreference: "moderate",
  guestFrequency: "sometimes",
  cleanliness: 3,
  socialLevel: 3,
  budget: 0,
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    age: 0,
    bio: "",
    questionnaire: emptyQuestionnaire,
  });

  const isReadOnly = profile !== null && !isEditing;

  useEffect(() => {
    async function getProfile() {
      try {
        const result = await apiFetch<Profile>("/profile");
        setProfile(result);
        setFormData({
          name: result.name,
          age: result.age,
          bio: result.bio ?? "",
          questionnaire: result.questionnaire,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        if (message !== "Profile not found") {
          setError(message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getProfile();
  }, []);

  const updateQuestionnaire = <K extends keyof Profile["questionnaire"]>(
    key: K,
    value: Profile["questionnaire"][K],
  ) => {
    setFormData({
      ...formData,
      questionnaire: { ...formData.questionnaire, [key]: value },
    });
  };

  const handleCancel = () => {
    if (!profile) return;
    setFormData({
      name: profile.name,
      age: profile.age,
      bio: profile.bio ?? "",
      questionnaire: profile.questionnaire,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (profile && isEditing) {
        const updated = await apiFetch<Profile>("/profile", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });
        setProfile(updated);
        setIsEditing(false);
      } else {
        const created = await apiFetch<Profile>("/profile", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        setProfile(created);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "text.primary" }}
          >
            My Profile
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                ABOUT
              </Typography>

              <NameField
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                disabled={isReadOnly}
              />
              <AgeField
                value={formData.age}
                onChange={(value) => setFormData({ ...formData, age: value })}
                disabled={isReadOnly}
              />
              <BioField
                value={formData.bio}
                onChange={(value) => setFormData({ ...formData, bio: value })}
                disabled={isReadOnly}
              />

              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                LIFESTYLE
              </Typography>

              <SmokesToggle
                value={formData.questionnaire.smokes}
                onChange={(value) => updateQuestionnaire("smokes", value)}
                disabled={isReadOnly}
              />
              <PetsToggle
                value={formData.questionnaire.pets}
                onChange={(value) => updateQuestionnaire("pets", value)}
                disabled={isReadOnly}
              />
              <SleepScheduleSelect
                value={formData.questionnaire.sleepSchedule}
                onChange={(value) =>
                  updateQuestionnaire("sleepSchedule", value)
                }
                disabled={isReadOnly}
              />
              <NoisePreferenceSelect
                value={formData.questionnaire.noisePreference}
                onChange={(value) =>
                  updateQuestionnaire("noisePreference", value)
                }
                disabled={isReadOnly}
              />
              <GuestFrequencySelect
                value={formData.questionnaire.guestFrequency}
                onChange={(value) =>
                  updateQuestionnaire("guestFrequency", value)
                }
                disabled={isReadOnly}
              />
              <CleanlinessSlider
                value={formData.questionnaire.cleanliness}
                onChange={(value) => updateQuestionnaire("cleanliness", value)}
                disabled={isReadOnly}
              />
              <SocialLevelSlider
                value={formData.questionnaire.socialLevel}
                onChange={(value) => updateQuestionnaire("socialLevel", value)}
                disabled={isReadOnly}
              />
              <BudgetField
                value={formData.questionnaire.budget}
                onChange={(value) => updateQuestionnaire("budget", value)}
                disabled={isReadOnly}
              />

              {error && <Alert severity="error">{error}</Alert>}

              <ProfileActions
                hasProfile={profile !== null}
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
              />
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
