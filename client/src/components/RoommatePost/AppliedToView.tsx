import { useState, useMemo } from "react";
import { Typography, Chip, Stack, Grid, Paper } from "@mui/material";
import ApplicationCard from "./ApplicationCard";
import ApplicationSummaryCard from "./ApplicationSummaryCard";
import QuickTipsCard from "./QuickTipsCard";
import type { RequestWithPost, RequestStatus } from "../../types/request";

type FilterValue = "ALL" | RequestStatus;

type AppliedToViewProps = {
  requests: RequestWithPost[];
  onWithdraw: (requestId: string) => void;
  onViewDetails: (request: RequestWithPost) => void;
};

export default function AppliedToView({
  requests,
  onWithdraw,
  onViewDetails,
}: AppliedToViewProps) {
  const [filter, setFilter] = useState<FilterValue>("ALL");

  const counts = useMemo(
    () => ({
      ALL: requests.length,
      PENDING: requests.filter((r) => r.status === "PENDING").length,
      ACCEPTED: requests.filter((r) => r.status === "ACCEPTED").length,
      REJECTED: requests.filter((r) => r.status === "REJECTED").length,
    }),
    [requests],
  );

  const filteredRequests =
    filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

  const filters: { value: FilterValue; label: string }[] = [
    { value: "ALL", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Applications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Here are all the listings you've applied to. Track your status and
          manage your applications.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
        >
          {filters.map((f) => (
            <Chip
              key={f.value}
              label={`${f.label} (${counts[f.value]})`}
              onClick={() => setFilter(f.value)}
              sx={{
                bgcolor:
                  filter === f.value ? "primary.main" : "background.paper",
                color: filter === f.value ? "#FFFFFF" : "text.primary",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: filter === f.value ? "primary.main" : "action.hover",
                },
              }}
            />
          ))}
        </Stack>

        {filteredRequests.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
            No applications in this category.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredRequests.map((request) => (
              <Grid size={{ xs: 12, md: 6 }} key={request._id}>
                <ApplicationCard
                  request={request}
                  onWithdraw={onWithdraw}
                  onViewDetails={() => onViewDetails(request)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <ApplicationSummaryCard
            total={counts.ALL}
            pending={counts.PENDING}
            accepted={counts.ACCEPTED}
            rejected={counts.REJECTED}
          />
          <QuickTipsCard />
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              bgcolor: "primary.main",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#FFFFFF", fontWeight: 700, mb: 0.5 }}
            >
              Good luck finding your perfect match!
            </Typography>
            <Typography variant="body2" sx={{ color: "#FDF8F3" }}>
              The right roommate is out there.
            </Typography>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}
