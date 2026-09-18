import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { useScrollDirection } from "../../hooks/useScrollDirection";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const scrollDirection = useScrollDirection();

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          transform:
            scrollDirection === "down" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out",
          top: 0,
        }}
      >
        <Toolbar>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <HomeWorkOutlinedIcon
              sx={{ color: "primary.main", fontSize: 26 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              RoomMatch
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </Typography>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => scrollToSection("why-roommatch")}
            >
              Why RoomMatch
            </Typography>
          </Stack>

          <Button component={Link} to="/signin" color="inherit" sx={{ mr: 1 }}>
            Log In
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
