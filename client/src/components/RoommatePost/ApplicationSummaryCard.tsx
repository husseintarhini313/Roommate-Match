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
  const rows = [
    { label: "Total Applications", value: total, color: "text.primary" },
    { label: "Pending", value: pending, color: "#B26A00" },
    { label: "Accepted", value: accepted, color: "success.main" },
    { label: "Rejected", value: rejected, color: "#B23A3A" },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Application Summary
      </Typography>
      <Stack spacing={1.5}>
        {rows.map((row) => (
          <Box
            key={row.label}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body2" color="text.secondary">
              {row.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: row.color }}
            >
              {row.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
