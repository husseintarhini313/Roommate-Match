import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #E8664A 0%, #1E4B4A 100%)",
          borderRadius: 2,
          py: 8,
          px: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#FFFFFF", mb: 2 }}>
          Ready to find your match?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#FFFFFF",
            opacity: 0.9,
            mb: 4,
            maxWidth: 480,
            mx: "auto",
          }}
        >
          Create your lifestyle profile and start browsing compatible roommates
          and rooms — it takes less than 5 minutes.
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#FFFFFF",
            color: "primary.main",
            borderRadius: 8,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          Sign Up Free
        </Button>
      </Box>
    </Container>
  );
}
