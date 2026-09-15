import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiFetch } from "../../api/client";
import type { RequestWithApplicant } from "../../types/request";
import ApplicantListItem from "./ApplicantListItem";
import ApplicantDetailPanel from "./ApplicantDetailPanel";
import HostProfileDialog from "../Profile/HostProfileDialog";

type ApplicantDialogProps = {
  open: boolean;
  postId: string | null;
  onClose: () => void;
  onActionComplete: () => void;
};

export default function ApplicantsDialog({
  open,
  postId,
  onClose,
  onActionComplete,
}: ApplicantDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [requests, setRequests] = useState<RequestWithApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  useEffect(() => {
    if (!open || !postId) return;

    async function fetchApplicants() {
      setIsLoading(true);
      setError("");
      try {
        const result = await apiFetch<RequestWithApplicant[]>(
          `/requests/post/${postId}`,
        );
        setRequests(result);
        setSelectedId(result[0]?._id ?? null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load applicants",
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchApplicants();
  }, [open, postId]);

  const sortedRequests = useMemo(
    () =>
      [...requests].sort(
        (a, b) => (b.compatibilityScore ?? 0) - (a.compatibilityScore ?? 0),
      ),
    [requests],
  );

  const selectedRequest =
    sortedRequests.find((r) => r._id === selectedId) ?? null;

  const handleAccept = async (requestId: string) => {
    setActioningId(requestId);
    try {
      await apiFetch(`/requests/${requestId}/accept`, { method: "PATCH" });
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "ACCEPTED" } : r,
        ),
      );
      onActionComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setActioningId(requestId);
    try {
      await apiFetch(`/requests/${requestId}/reject`, { method: "PATCH" });
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "REJECTED" } : r,
        ),
      );
      onActionComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Applicants
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage all applications for this post
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          )}
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}

          {!isLoading && sortedRequests.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
              No applications yet.
            </Typography>
          )}

          {!isLoading && sortedRequests.length > 0 && (
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ height: { md: "65vh" } }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: 300 },
                  borderRight: { md: "1px solid" },
                  borderBottom: { xs: "1px solid", md: "none" },
                  borderColor: "divider",
                  overflowY: "auto",
                  p: 1.5,
                  flexShrink: 0,
                }}
              >
                <Stack spacing={0.5}>
                  {sortedRequests.map((request) => (
                    <ApplicantListItem
                      key={request._id}
                      request={request}
                      selected={request._id === selectedId}
                      onSelect={() => setSelectedId(request._id)}
                    />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
                {selectedRequest && (
                  <ApplicantDetailPanel request={selectedRequest} />
                )}
              </Box>
            </Stack>
          )}
        </DialogContent>

        {selectedRequest && (
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setProfileDialogOpen(true)}>
              View Profile
            </Button>
            <Box sx={{ flex: 1 }} />
            {selectedRequest.status === "PENDING" ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={actioningId === selectedRequest._id}
                  onClick={() => handleReject(selectedRequest._id)}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={actioningId === selectedRequest._id}
                  onClick={() => handleAccept(selectedRequest._id)}
                >
                  Accept
                </Button>
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color:
                    selectedRequest.status === "ACCEPTED"
                      ? "success.main"
                      : "text.secondary",
                }}
              >
                {selectedRequest.status === "ACCEPTED"
                  ? "Accepted"
                  : "Rejected"}
              </Typography>
            )}
          </DialogActions>
        )}
      </Dialog>

      <HostProfileDialog
        open={profileDialogOpen}
        userId={selectedRequest?.applicantId ?? null}
        onClose={() => setProfileDialogOpen(false)}
      />
    </>
  );
}
