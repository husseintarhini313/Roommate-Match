import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await apiFetch<{ id: string; email: string }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      navigate("/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRules = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    {
      label: "One special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

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
            Sign Up
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

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  const passed = rule.test(password);
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
                isLoading || !passwordRules.every((rule) => rule.test(password))
              }
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{" "}
              <Link component={RouterLink} to="/signin">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
