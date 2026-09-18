import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import {
  Box,
  Typography,
  Alert,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";

import NameField from "./NameField";
import AgeField from "./AgeField";
import BioField from "./BioField";
import SmokesToggle from "./SmokesToggle";
import PetsToggle from "./PetsToggle";
import SleepScheduleSelect from "./SleepScheduleSelect";
import NoisePreferenceSelect from "./NoisePreferenceSelect";
import GuestFrequencySelect from "./GuestFrequencySelect";
import CleanlinessSlider from "./CleanlinessSlider";
import SocialLevelSlider from "./SocialLevelSlider";
import BudgetField from "./BudgetField";
import ProfileActions from "./ProfileActions";

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

type ProfileFormPanelProps = {
  onCreated?: () => void;
};

export default function ProfileFormPanel({ onCreated }: ProfileFormPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
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
        onCreated?.();
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
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
          onChange={(value) => updateQuestionnaire("sleepSchedule", value)}
          disabled={isReadOnly}
        />
        <NoisePreferenceSelect
          value={formData.questionnaire.noisePreference}
          onChange={(value) => updateQuestionnaire("noisePreference", value)}
          disabled={isReadOnly}
        />
        <GuestFrequencySelect
          value={formData.questionnaire.guestFrequency}
          onChange={(value) => updateQuestionnaire("guestFrequency", value)}
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
  );
}
