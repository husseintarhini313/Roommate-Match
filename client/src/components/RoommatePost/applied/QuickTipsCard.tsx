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
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}
      >
        <LightbulbOutlinedIcon sx={{ color: "#F1664A" }} fontSize="small" />
        <Typography
          sx={{ fontWeight: 600, color: "#333333", fontSize: "1rem" }}
        >
          Quick Tips
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        {tips.map((tip) => (
          <Typography
            key={tip}
            sx={{
              color: "#666666",
              fontWeight: 400,
              fontSize: "0.875rem",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            {tip}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
