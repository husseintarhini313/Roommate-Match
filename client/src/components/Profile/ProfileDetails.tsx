import {
  Box,
  Typography,
  Stack,
  Divider,
  Avatar,
  LinearProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HomeIcon from "@mui/icons-material/Home";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import PetsIcon from "@mui/icons-material/Pets";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import GroupsIcon from "@mui/icons-material/Groups";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import type { Profile } from "../../types/profile";

type ProfileDetailsProps = {
  profile: Profile;
};

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  const lifestyleRows = [
    {
      icon: profile.questionnaire.smokes ? (
        <SmokingRoomsIcon />
      ) : (
        <SmokeFreeIcon />
      ),
      label: "Smoking",
      value: profile.questionnaire.smokes ? "Smoker" : "Non-smoker",
    },
    {
      icon: <PetsIcon />,
      label: "Pets",
      value: profile.questionnaire.pets ? "Has pets" : "No pets",
    },
    {
      icon: <BedtimeIcon />,
      label: "Sleep Schedule",
      value:
        profile.questionnaire.sleepSchedule === "early"
          ? "Early bird"
          : profile.questionnaire.sleepSchedule === "late"
            ? "Night owl"
            : "Flexible",
    },
    {
      icon: <VolumeUpIcon />,
      label: "Noise Preference",
      value: profile.questionnaire.noisePreference,
    },
    {
      icon: <GroupsIcon />,
      label: "Guests",
      value: profile.questionnaire.guestFrequency,
    },
  ];

  return (
    <>
      <Stack spacing={1} sx={{ alignItems: "center", mb: 4 }}>
        <Avatar sx={{ width: 88, height: 88, bgcolor: "primary.main" }}>
          <PersonIcon sx={{ fontSize: 48 }} />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {profile.name}, {profile.age}
        </Typography>
      </Stack>

      {profile.bio && (
        <>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            ABOUT ME
          </Typography>
          <Box
            sx={{
              position: "relative",
              p: 3,
              mb: 3,
              bgcolor: "#F5EFE7",
              borderRadius: 3,
            }}
          >
            <FormatQuoteIcon
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                color: "primary.main",
                opacity: 0.2,
                fontSize: 40,
              }}
            />
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", pl: 3, position: "relative" }}
            >
              {profile.bio}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </>
      )}

      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <HomeIcon sx={{ color: "#FFFFFF", fontSize: 18 }} />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          Lifestyle
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {lifestyleRows.map((row) => (
          <Stack
            key={row.label}
            direction="row"
            sx={{ alignItems: "center" }}
            spacing={2}
          >
            <Box sx={{ color: "primary.main", display: "flex" }}>
              {row.icon}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {row.label}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textTransform: "capitalize" }}
            >
              {row.value}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" spacing={1} sx={{alignItems:"center", mb: 1 }}>
        <CleaningServicesIcon sx={{ color: "primary.main" }} fontSize="small" />
        <Typography variant="subtitle2" color="text.secondary">
          CLEANLINESS
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={(profile.questionnaire.cleanliness / 5) * 100}
          sx={{ flex: 1, height: 10, borderRadius: 5, bgcolor: "#F5EFE7" }}
        />
        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 32 }}>
          {profile.questionnaire.cleanliness}/5
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{alignItems:"center", mb: 1 }}>
        <GroupsIcon sx={{ color: "secondary.main" }} fontSize="small" />
        <Typography variant="subtitle2" color="text.secondary">
          SOCIAL LEVEL
        </Typography>
      </Stack>
      <Stack direction="row" sx={{alignItems:"center"}} spacing={2}>
        <LinearProgress
          variant="determinate"
          value={(profile.questionnaire.socialLevel / 5) * 100}
          color="secondary"
          sx={{ flex: 1, height: 10, borderRadius: 5, bgcolor: "#F5EFE7" }}
        />
        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 32 }}>
          {profile.questionnaire.socialLevel}/5
        </Typography>
      </Stack>
    </>
  );
}
