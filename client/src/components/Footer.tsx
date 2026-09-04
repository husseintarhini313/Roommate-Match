import { Container, Typography, Box, Stack } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.100", py: 4 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 0.5 }}
            >
              <HomeWorkOutlinedIcon
                sx={{ color: "primary.main", fontSize: 20 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                RoomMatch
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              © 2026 RoomMatch. All rights reserved.
            </Typography>
          </Box>

          <Stack direction="row" spacing={4}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "text.primary" } }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "text.primary" } }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "text.primary" } }}
            >
              Help Center
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer", "&:hover": { color: "text.primary" } }}
            >
              Contact Us
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
