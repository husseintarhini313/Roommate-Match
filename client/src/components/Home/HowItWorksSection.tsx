import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const steps = [
  {
    number: 1,
    title: "Create your lifestyle profile",
    description: "Tell us about your habits, budget, and what makes you tick.",
  },
  {
    number: 2,
    title: "Browse or post a room",
    description:
      "List your available space or search for an open room in established households.",
  },
  {
    number: 3,
    title: "Match and connect",
    description:
      "Review your compatibility score, send an application with a message, and hear back from the post's creator.",
  },
];

export default function HowItWorksSection() {
  return (
    <Container maxWidth="xl" sx={{ py: 10 }} id="how-it-works">
      <Typography
        variant="h3"
        align="center"
        sx={{ mb: 1, color: "text.primary" }}
      >
        How RoomMatch Works?
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Three simple steps to finding your ideal living situation.
      </Typography>
      <Grid container spacing={4}>
        {steps.map((step) => (
          <Grid size={{ xs: 12, md: 4 }} key={step.number}>
            <Card
              elevation={0}
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "grey.200",
                p: 2,
                height: "100%",
                maxWidth: 360,
                mx: "auto",
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: "success.main", mb: 2, mx: "auto" }}>
                  {step.number}
                </Avatar>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
