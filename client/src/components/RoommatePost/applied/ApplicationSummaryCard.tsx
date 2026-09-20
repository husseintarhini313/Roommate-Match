import { Box, Typography, Stack, Paper } from "@mui/material";

type ApplicationSummaryCardProps = {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
};

export default function ApplicationSummaryCard({
  total,
  pending,
  accepted,
  rejected,
}: ApplicationSummaryCardProps) {
  const stats = [
    { label: "Total", value: total, color: "#2B2B2B", bg: "#F0EFED" },
    { label: "Pending", value: pending, color: "#B26A00", bg: "#FFF4E5" },
    { label: "Accepted", value: accepted, color: "#1E4B4A", bg: "#E6F4EA" },
    { label: "Rejected", value: rejected, color: "#B23A3A", bg: "#FBEAEA" },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Application Summary
      </Typography>
      <Stack direction="row" spacing={1.5}>
        {stats.map((stat) => (
          <Box
            key={stat.label}
            sx={{
              flex: 1,
              textAlign: "center",
              bgcolor: stat.bg,
              borderRadius: 2,
              py: 1.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: stat.color, fontWeight: 700 }}
            >
              {stat.label}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: stat.color }}
            >
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
