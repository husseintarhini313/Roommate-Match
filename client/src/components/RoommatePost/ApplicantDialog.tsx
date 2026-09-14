import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Chip,
  Stack,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { apiFetch } from "../../api/client";
import type { RequestWithApplicant } from "../../types/request";

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
  const [requests, setRequests] = useState<RequestWithApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState<string | null>(null);

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

  const handleAccept = async (requestId: string) => {
    setActioningId(requestId);
    try {
      await apiFetch(`/requests/${requestId}/accept`, {
        method: "PATCH",
      });

      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: "ACCEPTED" } : req,
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
      await apiFetch(`/requests/${requestId}/reject`, {
        method: "PATCH",
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: "REJECTED" } : req,
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Applicants</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {!isLoading && requests.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 4 }} align="center">
            No applications yet.
          </Typography>
        )}

        <Stack spacing={2}>
          {requests.map((request, i) => (
            <Box key={request._id}>
              {i > 0 && <Divider sx={{ mb: 2 }} />}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {request.applicantName}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  {request.compatibilityScore !== null && (
                    <Chip
                      label={`${request.compatibilityScore}% match`}
                      size="small"
                      color="success"
                    />
                  )}
                  <Chip
                    label={request.status}
                    size="small"
                    color={
                      request.status === "ACCEPTED"
                        ? "success"
                        : request.status === "REJECTED"
                          ? "default"
                          : "warning"
                    }
                  />
                </Stack>
              </Stack>

              {request.message && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, fontStyle: "italic" }}
                >
                  "{request.message}"
                </Typography>
              )}

              {request.status === "PENDING" && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={actioningId === request._id}
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={actioningId === request._id}
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
