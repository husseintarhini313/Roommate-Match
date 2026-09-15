import { Box, Avatar, Typography, Chip, Stack } from "@mui/material";
import type { RequestWithApplicant } from "../../types/request";

type ApplicantListItemProps = {
  request: RequestWithApplicant;
  selected: boolean;
  onSelect: () => void;
};

const statusColor = {
  PENDING: "warning",
  ACCEPTED: "success",
  REJECTED: "default",
} as const;

export default function ApplicantListItem({
  request,
  selected,
  onSelect,
}: ApplicantListItemProps) {
  const initials = request.applicantName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: selected ? "primary.main" : "transparent",
        color: selected ? "#FFFFFF" : "text.primary",
        "&:hover": { bgcolor: selected ? "primary.main" : "action.hover" },
      }}
    >
      <Avatar
        sx={{
          bgcolor: selected ? "#FFFFFF" : "primary.main",
          color: selected ? "primary.main" : "#FFFFFF",
        }}
      >
        {initials}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
          {request.applicantName}
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ mt: 0.5 }}
        >
          {request.compatibilityScore !== null && (
            <Typography
              variant="caption"
              sx={{
                color: selected ? "#FFFFFF" : "success.main",
                fontWeight: 700,
              }}
            >
              {request.compatibilityScore}% compatible
            </Typography>
          )}
        </Stack>
        <Chip
          label={request.status}
          size="small"
          color={statusColor[request.status]}
          sx={{ mt: 0.5, height: 20, fontSize: 11 }}
        />
      </Box>
    </Box>
  );
}
