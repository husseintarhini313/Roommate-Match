import { Container, Grid, Typography, Button, Box, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage1 from "../../assets/hero/photo-2-keys-moving-boxes.png";
import heroImage2 from "../../assets/hero/photo-4-friends-sunset-skyline.png";
import heroImage3 from "../../assets/hero/photo-5-highfive-moving-boxes.png";
import heroImage4 from "../../assets/hero/photo-3-home-quote-plant.png";

const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ bgcolor: "#F5EFE7" }}>
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2" sx={{ mb: 2, color: "text.primary" }}>
              Find your people,{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                find your place
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, fontSize: "1.1rem" }}
            >
              Post your spare room or find one — matched by lifestyle
              compatibility, not just price and location.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
              size="large"
            >
              Get Started
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Fade in key={currentImage} timeout={800}>
              <Box
                component="img"
                src={heroImages[currentImage]}
                alt="RoomMatch — finding compatible roommates"
                sx={{
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
