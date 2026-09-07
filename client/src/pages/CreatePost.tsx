import { useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Divider,
  Alert,
  Button,
} from "@mui/material";
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

export type Post = {
  _id: string;
  createdBy: string;
  title: string;
  description: string;
  location: string;
  accommodationType: "apartment" | "dorm" | "studio";
  totalBeds: number;
  availableBeds: number;
  monthlyRent: number;
  expenses: number;
  amenities: string[];
  rules: string;
  availableFrom: string;
  status: "ACTIVE" | "FULL" | "CLOSED";
  images: string[];
};

type PostFormData = {
  title: string;
  description: string;
  location: string;
  accommodationType: "apartment" | "dorm" | "studio";
  totalBeds: number;
  availableBeds: number;
  monthlyRent: number;
  expenses: number;
  amenities: string[];
  rules: string;
  availableFrom: string;
  images: File[];
};

export default function CreatePost() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
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

      await apiFetch<Post>("/posts", {
        method: "POST",
        body,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#F5EFE7" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "text.primary" }}
          >
            Create a Post
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
                  {isSubmitting ? "Creating..." : "Create Post"}
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
