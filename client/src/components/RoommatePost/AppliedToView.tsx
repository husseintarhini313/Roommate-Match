import { useState, useMemo } from "react";
import { Typography, Chip, Stack, Grid } from "@mui/material";
import ApplicationCard from "./ApplicationCard";
import ApplicationSummaryCard from "./ApplicationSummaryCard";
import QuickTipsCard from "./QuickTipsCard";
import type { RequestWithPost, RequestStatus } from "../../types/request";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

type FilterValue = "ALL" | RequestStatus;

type AppliedToViewProps = {
  requests: RequestWithPost[];
  onWithdraw: (requestId: string) => void;
};

export default function AppliedToView({
  requests,
  onWithdraw,
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
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <AssignmentTurnedInOutlinedIcon
            sx={{ color: "#F1664A", fontSize: 32 }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "32px",
              color: "#2D2D2D",
              lineHeight: 1.2,
            }}
          >
            Track Your Applications
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#6B6B6B",
            lineHeight: 1.5,
            mt: "8px",
            mb: "30px",
          }}
        >
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
                <ApplicationCard request={request} onWithdraw={onWithdraw} />
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
        </Stack>
      </Grid>
    </Grid>
  );
}
