import { Container, Typography, Box, Stack } from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.100", py: 4 }}>
      <Container maxWidth="xl">
        <Stack
          spacing={0.5}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            textAlign: { xs: "left", sm: "center" },
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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
        </Stack>
      </Container>
    </Box>
  );
}
