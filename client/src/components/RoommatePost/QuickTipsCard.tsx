import { Paper, Typography, Stack, Box } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const tips = [
  "Keep an eye on your application status.",
  "You can withdraw an application while it's still pending.",
];

export default function QuickTipsCard() {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: "#F5EFE7" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
        <LightbulbOutlinedIcon
          sx={{ color: "primary.main" }}
          fontSize="small"
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Quick Tips
        </Typography>
      </Stack>
      <Stack spacing={1}>
        {tips.map((tip) => (
          <Box key={tip} sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tip}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
