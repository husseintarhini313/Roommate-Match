import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import ProfileFormPanel from "../components/Profile/ProfileFormPanel";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "text.primary" }}
          >
            My Profile
          </Typography>
          <ProfileFormPanel onCreated={() => navigate("/dashboard")} />
        </Paper>
      </Container>
    </Box>
  );
}
