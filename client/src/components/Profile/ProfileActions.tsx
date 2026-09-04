import { Button, Stack } from "@mui/material";

type ProfileActionsProps = {
  hasProfile: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

export default function ProfileActions({
  hasProfile,
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
}: ProfileActionsProps) {
  if (!hasProfile) {
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Create Profile"}
      </Button>
    );
  }

  if (!isEditing) {
    return (
      <Button variant="contained" color="primary" size="large" onClick={onEdit}>
        Edit
      </Button>
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
      <Button variant="outlined" size="large" onClick={onCancel} fullWidth>
        Cancel
      </Button>
    </Stack>
  );
}
