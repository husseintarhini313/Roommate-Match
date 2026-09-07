import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import type { Post, PostFormData } from "../types/post";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Divider,
  Alert,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import TitleField from "../components/RoommatePost/TitleField";
import DescriptionField from "../components/RoommatePost/DescriptionField";
import LocationField from "../components/RoommatePost/LocationField";
import AccommodationTypeSelect from "../components/RoommatePost/AccommodationTypeSelect";
import TotalBedsField from "../components/RoommatePost/TotalBedsField";
import AvailableBedsField from "../components/RoommatePost/AvailableBedsField";
import MonthlyRentField from "../components/RoommatePost/MonthlyRentField";
import ExpensesField from "../components/RoommatePost/ExpensesField";
import AmenitiesInput from "../components/RoommatePost/AmenitiesInput";
import RulesField from "../components/RoommatePost/RulesField";
import AvailableFromField from "../components/RoommatePost/AvailableFromField";
import ImageUploadField from "../components/RoommatePost/ImageUploadField";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    location: "",
    accommodationType: "apartment",
    totalBeds: 0,
    availableBeds: 0,
    monthlyRent: 0,
    expenses: 0,
    amenities: [],
    rules: "",
    availableFrom: "",
    images: [],
  });

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const visibleExistingImages = existingImages.filter(
    (url) => !imagesToDelete.includes(url),
  );

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await apiFetch<Post>(`/posts/${id}`);

        setFormData({
          title: post.title,
          description: post.description,
          location: post.location,
          accommodationType: post.accommodationType,
          totalBeds: post.totalBeds,
          availableBeds: post.availableBeds,
          monthlyRent: post.monthlyRent,
          expenses: post.expenses,
          amenities: post.amenities,
          rules: post.rules,
          availableFrom: post.availableFrom.slice(0, 10),
          images: [],
        });

        setExistingImages(post.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleRemoveExistingImage = (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const remainingImageCount =
      visibleExistingImages.length + formData.images.length;
    if (remainingImageCount === 0) {
      setError("A post must have at least one photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      for (const imageUrl of imagesToDelete) {
        await apiFetch(`/posts/${id}/images`, {
          method: "DELETE",
          body: JSON.stringify({ imageUrl }),
        });
      }

      const body = new FormData();

      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("location", formData.location);
      body.append("accommodationType", formData.accommodationType);
      body.append("totalBeds", String(formData.totalBeds));
      body.append("availableBeds", String(formData.availableBeds));
      body.append("monthlyRent", String(formData.monthlyRent));
      body.append("expenses", String(formData.expenses));
      body.append("rules", formData.rules);
      body.append("availableFrom", formData.availableFrom);

      formData.amenities.forEach((a) => body.append("amenities", a));
      formData.images.forEach((file) => body.append("images", file));

      await apiFetch(`/posts/${id}`, {
        method: "PATCH",
        body,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "text.primary" }}
          >
            Edit Post
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                BASICS
              </Typography>

              <TitleField
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
              />
              <DescriptionField
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
              />
              <LocationField
                value={formData.location}
                onChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
              />
              <AccommodationTypeSelect
                value={formData.accommodationType}
                onChange={(value) =>
                  setFormData({ ...formData, accommodationType: value })
                }
              />

              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                SPACE
              </Typography>

              <TotalBedsField
                value={formData.totalBeds}
                onChange={(value) =>
                  setFormData({ ...formData, totalBeds: value })
                }
              />
              <AvailableBedsField
                value={formData.availableBeds}
                onChange={(value) =>
                  setFormData({ ...formData, availableBeds: value })
                }
              />

              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                COST
              </Typography>

              <MonthlyRentField
                value={formData.monthlyRent}
                onChange={(value) =>
                  setFormData({ ...formData, monthlyRent: value })
                }
              />
              <ExpensesField
                value={formData.expenses}
                onChange={(value) =>
                  setFormData({ ...formData, expenses: value })
                }
              />

              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                DETAILS
              </Typography>

              <AmenitiesInput
                value={formData.amenities}
                onChange={(value) =>
                  setFormData({ ...formData, amenities: value })
                }
              />
              <RulesField
                value={formData.rules}
                onChange={(value) => setFormData({ ...formData, rules: value })}
              />
              <AvailableFromField
                value={formData.availableFrom}
                onChange={(value) =>
                  setFormData({ ...formData, availableFrom: value })
                }
              />

              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                PHOTOS
              </Typography>

              {existingImages.length > 0 && (
                <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                  {visibleExistingImages.map((url) => (
                    <Box key={url} sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={url}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveExistingImage(url)}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          bgcolor: "background.paper",
                          boxShadow: 1,
                          "&:hover": { bgcolor: "grey.100" },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}

              <ImageUploadField
                value={formData.images}
                onChange={(value) =>
                  setFormData({ ...formData, images: value })
                }
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  fullWidth
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
