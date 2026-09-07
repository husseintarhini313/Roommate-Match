import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Fade,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import type { Post } from "../../types/post";

type PostCardProps = {
  post: Post;
  actions: ReactNode;
};

export default function PostCard({ post, actions }: PostCardProps) {
  const images =
    post.images.length > 0 ? post.images : ["/placeholder-room.png"];
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider" }}
    >
      <Box sx={{ position: "relative", height: 220 }}>
        <Fade in key={currentImage} timeout={500}>
          <Box
            component="img"
            src={images[currentImage]}
            alt={post.title}
            sx={{ width: "100%", height: 220, objectFit: "cover" }}
          />
        </Fade>

        {images.length > 1 && (
          <>
            <IconButton
              onClick={goToPrevious}
              size="small"
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              onClick={goToNext}
              size="small"
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor:
                      index === currentImage
                        ? "primary.main"
                        : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>
          </>
        )}
      </Box>

      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {post.title}
          </Typography>
          <Chip
            label={post.status}
            size="small"
            color={post.status === "ACTIVE" ? "success" : "default"}
            sx={{ ml: "auto" }}
          />
        </Box>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {post.location}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}
        >
          <Chip label={post.accommodationType} size="small" />
          <Chip
            icon={<BedIcon fontSize="small" />}
            label={`${post.availableBeds}/${post.totalBeds} beds available`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Stack>

        {post.amenities.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}
          >
            {(showAllAmenities
              ? post.amenities
              : post.amenities.slice(0, 3)
            ).map((amenity) => (
              <Chip
                key={amenity}
                icon={<CheckCircleOutlinedIcon fontSize="small" />}
                label={amenity}
                size="small"
                sx={{ bgcolor: "success.light", color: "success.dark" }}
              />
            ))}
            {post.amenities.length > 3 && (
              <Chip
                label={
                  showAllAmenities
                    ? "Show less"
                    : `+${post.amenities.length - 3} more`
                }
                size="small"
                variant="outlined"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Stack>
        )}

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          ${post.monthlyRent}
          <Typography component="span" variant="body2" color="text.secondary">
            {" "}
            /month + ~${post.expenses} expenses
          </Typography>
        </Typography>

        <Box sx={{ mt: 2 }}>{actions}</Box>
      </CardContent>
    </Card>
  );
}
