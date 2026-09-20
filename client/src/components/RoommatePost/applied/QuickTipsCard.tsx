import { Box, Typography, Stack } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const tips = [
  "Keep an eye on your application status.",
  "You can withdraw an application while it is still pending.",
];

export default function QuickTipsCard() {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: "22px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        <LightbulbOutlinedIcon sx={{ color: "#F1664A" }} fontSize="small" />
        <Typography
          sx={{ fontWeight: 600, color: "#333333", fontSize: "1rem" }}
        >
          Quick Tips
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        {tips.map((tip) => (
          <Stack
            key={tip}
            direction="row"
            spacing={1}
            sx={{ alignItems: "flex-start" }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: "#F1664A",
                mt: "7px",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: "#666666",
                fontWeight: 400,
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              {tip}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
