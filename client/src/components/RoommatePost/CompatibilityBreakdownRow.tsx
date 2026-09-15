import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import type { ReactNode } from "react";

type CompatibilityBreakdownRowProps = {
  icon: ReactNode;
  label: string;
  value: number;
};

export default function CompatibilityBreakdownRow({
  icon,
  label,
  value,
}: CompatibilityBreakdownRowProps) {
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {value}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ height: 6, borderRadius: 3, bgcolor: "#F5EFE7" }}
      />
    </Box>
  );
}
