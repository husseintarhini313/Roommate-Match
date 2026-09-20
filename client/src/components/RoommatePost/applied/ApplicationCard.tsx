import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { RequestWithPost } from "../../../types/request";

type ApplicationCardProps = {
  request: RequestWithPost;
  onWithdraw: (requestId: string) => void;
};

const statusConfig = {
  PENDING: { label: "Pending", bg: "#FFF4E5", color: "#B26A00" },
  ACCEPTED: { label: "Accepted", bg: "#E6F4EA", color: "#1E4B4A" },
  REJECTED: { label: "Rejected", bg: "#FBEAEA", color: "#B23A3A" },
};

const statusBoxConfig = {
  PENDING: { bg: "#F3F4F6", iconColor: "#6B7280", icon: ChatBubbleOutlineIcon },
  ACCEPTED: { bg: "#E6F4EA", iconColor: "#2E7D4F", icon: CheckCircleIcon },
  REJECTED: { bg: "#FBEAEA", iconColor: "#B23A3A", icon: CancelIcon },
};

export default function ApplicationCard({
  request,
  onWithdraw,
}: ApplicationCardProps) {
  const post = request.post;
  if (!post) return null;

  const status = statusConfig[request.status];
  const statusBox = statusBoxConfig[request.status];
  const StatusIcon = statusBox.icon;

  const handleWithdraw = () => {
    if (confirm("Withdraw this application?")) {
      onWithdraw(request._id);
    }
  };

  const statusHeadline =
    request.status === "PENDING"
      ? `You applied on ${new Date(request.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}`
      : request.status === "ACCEPTED"
        ? "Your application was accepted!"
        : "Application rejected";

  const statusDescription =
    request.status === "PENDING"
      ? request.message
      : request.status === "ACCEPTED"
        ? "The host has accepted your application. You can now contact them to finalize the details."
        : "The host has chosen another applicant.";

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 2,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          sx={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}
        >
          <Box
            component="img"
            src={post.images[0] ?? "/placeholder-room.png"}
            alt={post.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          {post.images.length > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: "center",
                position: "absolute",
                bottom: 6,
                left: 6,
                bgcolor: "rgba(0,0,0,0.65)",
                borderRadius: 999,
                px: 1,
                py: 0.25,
              }}
            >
              <PhotoCameraOutlinedIcon
                sx={{ fontSize: 12, color: "#FFFFFF" }}
              />
              <Typography sx={{ fontSize: 11, color: "#FFFFFF" }}>
                {post.images.length} photo{post.images.length === 1 ? "" : "s"}
              </Typography>
            </Stack>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
              {post.title}
            </Typography>
            <Chip
              label={status.label}
              size="small"
              sx={{ bgcolor: status.bg, color: status.color, fontWeight: 700 }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "center", mt: 0.5 }}
          >
            <LocationOnIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {post.location}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <BedIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {post.availableBeds} beds available
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <HomeOutlinedIcon
                sx={{ fontSize: 15, color: "text.secondary" }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {post.accommodationType}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            ${post.monthlyRent}
            <Typography component="span" variant="body2" color="text.secondary">
              {" "}
              /month + ~${post.expenses} expenses
            </Typography>
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: 1.25,
          alignItems: "flex-start",
          mt: 1.5,
          p: 1.5,
          borderRadius: 2,
          bgcolor: statusBox.bg,
        }}
      >
        <StatusIcon
          sx={{ color: statusBox.iconColor, fontSize: 20, mt: 0.25 }}
        />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {statusHeadline}
          </Typography>
          {statusDescription && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.25,
                fontStyle: request.status === "PENDING" ? "italic" : "normal",
              }}
            >
              {request.status === "PENDING"
                ? `"${statusDescription}"`
                : statusDescription}
            </Typography>
          )}
        </Box>
      </Box>

      {request.status === "PENDING" && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          sx={{ mt: 1.5 }}
          onClick={handleWithdraw}
        >
          Withdraw Application
        </Button>
      )}
    </Box>
  );
}
