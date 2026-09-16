import { Box, Typography, Stack, Chip, Divider, Grid } from "@mui/material";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import PetsIcon from "@mui/icons-material/Pets";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import GroupsIcon from "@mui/icons-material/Groups";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CompatibilityBreakdownRow from "./CompatibilityBreakdownRow";
import type { RequestWithApplicant } from "../../types/request";

type ApplicantDetailPanelProps = {
  request: RequestWithApplicant;
};

export default function ApplicantDetailPanel({
  request,
}: ApplicantDetailPanelProps) {
  const q = request.applicantQuestionnaire;
  const breakdown = request.compatibilityBreakdown;

  const sleepLabel =
    q?.sleepSchedule === "early"
      ? "Early sleeper"
      : q?.sleepSchedule === "late"
        ? "Night owl"
        : "Flexible schedule";

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {request.applicantName}
          </Typography>
          {request.applicantAge !== null && (
            <Typography variant="body2" color="text.secondary">
              {request.applicantAge} years old
            </Typography>
          )}
        </Box>
        {request.compatibilityScore !== null && (
          <Chip
            label={`${request.compatibilityScore}% Compatible`}
            sx={{
              bgcolor: "success.light",
              color: "success.dark",
              fontWeight: 700,
            }}
          />
        )}
      </Stack>

      {q && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
        >
          <Chip
            icon={q.smokes ? <SmokingRoomsIcon /> : <SmokeFreeIcon />}
            label={q.smokes ? "Smoker" : "Non-smoker"}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<PetsIcon />}
            label={q.pets ? "Has pets" : "No pets"}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<BedtimeIcon />}
            label={sleepLabel}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<VolumeUpIcon />}
            label={q.noisePreference}
            size="small"
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
          />
        </Stack>
      )}

      {q && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          <PaidOutlinedIcon
            fontSize="small"
            sx={{ verticalAlign: "-5px", mr: 0.5, color: "primary.main" }}
          />
          Budget: <strong>${q.budget}/month</strong>
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      {breakdown && (
        <>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1.5 }}
          >
            COMPATIBILITY BREAKDOWN
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1.5}>
                <CompatibilityBreakdownRow
                  icon={<BedtimeIcon fontSize="small" />}
                  label="Sleep Schedule"
                  value={breakdown.sleepSchedule}
                />
                <CompatibilityBreakdownRow
                  icon={<VolumeUpIcon fontSize="small" />}
                  label="Noise Preference"
                  value={breakdown.noisePreference}
                />
                <CompatibilityBreakdownRow
                  icon={<GroupsIcon fontSize="small" />}
                  label="Guest Frequency"
                  value={breakdown.guestFrequency}
                />
                <CompatibilityBreakdownRow
                  icon={<SmokeFreeIcon fontSize="small" />}
                  label="Smoking"
                  value={breakdown.smokes}
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1.5}>
                <CompatibilityBreakdownRow
                  icon={<CleaningServicesIcon fontSize="small" />}
                  label="Cleanliness"
                  value={breakdown.cleanliness}
                />
                <CompatibilityBreakdownRow
                  icon={<GroupsIcon fontSize="small" />}
                  label="Social Level"
                  value={breakdown.socialLevel}
                />
                <CompatibilityBreakdownRow
                  icon={<PetsIcon fontSize="small" />}
                  label="Pets"
                  value={breakdown.pets}
                />
                <CompatibilityBreakdownRow
                  icon={<PaidOutlinedIcon fontSize="small" />}
                  label="Budget"
                  value={breakdown.budget}
                />
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
        </>
      )}

      {request.message && (
        <Box sx={{ mb: 2, p: 2, bgcolor: "#F5EFE7", borderRadius: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            APPLICATION MESSAGE
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            "{request.message}"
          </Typography>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        Applied {new Date(request.createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
