import { useState } from "react";
import { apiFetch } from "../api/client";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#F5EFE7",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: isSubmitted ? "center" : "left",
          }}
        >
          {isSubmitted ? (
            <>
              <MarkEmailReadOutlinedIcon
                sx={{ fontSize: 56, color: "success.main", mb: 2 }}
              />
              <Typography
                variant="h5"
                sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}
              >
                Check your inbox
              </Typography>
              <Typography variant="body1" color="text.secondary">
                If that email exists, a reset link has been sent.
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}
              >
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email and we'll send you a link to reset your
                password.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
