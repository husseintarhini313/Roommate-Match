import { Container, Grid, Typography, Box, Stack } from "@mui/material";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const features = [
  {
    icon: (
      <PersonSearchOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />
    ),
    title: "Lifestyle-based matching",
    description:
      "Our algorithm prioritizes schedule compatibility, cleanliness standards, and social habits over everything else.",
  },
  {
    icon: <PaidOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Fair rent split",
    description:
      "Every post shows the full monthly cost upfront — rent and estimated expenses like utilities — so there are no surprises later.",
  },
  {
    icon: <ForumOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Real applications, not just contact info",
    description:
      "See a compatibility score and a real message before you decide — not just a name and a phone number.",
  },
];

export default function WhyRoomMatchSection() {
  return (
    <Box sx={{ bgcolor: "#F5EFE7" }} id="why-roommatch">
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 1, color: "text.primary" }}
        >
          Why RoomMatch?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Designed for peace of mind and peaceful living.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  py: 6,
                  px: 4,
                  height: "100%",
                  maxWidth: 360,
                  mx: "auto",
                }}
              >
                <Stack
                  spacing={2}
                  sx={{ alignItems: "center", textAlign: "center" }}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
