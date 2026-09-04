import { useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { apiFetch } from "../api/client";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const passwordRules = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    {
      label: "One special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
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
            sx={{ p: 5, borderRadius: 4, textAlign: "center" }}
          >
            <Typography variant="body1" color="text.secondary">
              This reset link is invalid or missing a token.
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (isSuccess) {
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
            sx={{ p: 5, borderRadius: 4, textAlign: "center" }}
          >
            <CheckCircleIcon
              sx={{ fontSize: 56, color: "success.main", mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}
            >
              Password reset
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Your password has been updated.
            </Typography>
            <Link component={RouterLink} to="/signin">
              Sign In
            </Link>
          </Paper>
        </Container>
      </Box>
    );
  }

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
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: 700, color: "text.primary" }}
          >
            Reset Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="New password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Collapse in={isPasswordFocused}>
              <List dense sx={{ mt: 1 }}>
                {passwordRules.map((rule) => {
                  const passed = rule.test(newPassword);
                  return (
                    <ListItem key={rule.label} disablePadding>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {passed ? (
                          <CheckCircleIcon
                            fontSize="small"
                            sx={{ color: "success.main" }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            fontSize="small"
                            sx={{ color: "text.secondary" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={rule.label}
                        slotProps={{
                          primary: {
                            color: passed ? "text.primary" : "text.secondary",
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={
                isLoading ||
                !passwordRules.every((rule) => rule.test(newPassword))
              }
              sx={{ mt: 3 }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
