import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Tabs,
  Tab,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Snackbar,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiFetch } from "../api/client";
import PostCard from "../components/RoommatePost/PostCard";
import ApplyDialog from "../components/RoommatePost/ApplyDialog";
import type { Post } from "../types/post";
import HostProfileDialog from "../components/Profile/HostProfileDialog";
import ApplicantsDialog from "../components/RoommatePost/ApplicantDialog";
import type { RequestWithPost } from "../types/request";

type DashboardTab = "browse" | "mine" | "applied";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>("browse");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [locationFilter, setLocationFilter] = useState("");
  const [maxRentFilter, setMaxRentFilter] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [hostProfileOpen, setHostProfileOpen] = useState(false);
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);

  const [applicantsDialogOpen, setApplicantsDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [myRequests, setMyRequests] = useState<RequestWithPost[]>([]);

  const showSnackbar = (message: string) => {
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }, 150);
  };

  const refetchPosts = async () => {
    const result = await apiFetch<Post[]>("/posts/mine");
    setPosts(result);
  };

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError("");

      try {
        if (activeTab === "browse") {
          const params = new URLSearchParams();
          if (locationFilter) params.append("location", locationFilter);
          if (maxRentFilter) params.append("maxRent", maxRentFilter);

          const result = await apiFetch<Post[]>(`/posts?${params.toString()}`);
          setPosts(result);
        } else if (activeTab === "mine") {
          const result = await apiFetch<Post[]>("/posts/mine");
          setPosts(result);
        } else if (activeTab === "applied") {
          const result = await apiFetch<RequestWithPost[]>("/requests/mine");
          setMyRequests(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [activeTab, locationFilter, maxRentFilter]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await apiFetch(`/posts/${postId}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClosePost = async (postId: string) => {
    try {
      await apiFetch(`/posts/${postId}/close`, { method: "PATCH" });
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, status: "CLOSED" as const } : p,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to close post");
    }
  };

  const handleReopenPost = async (postId: string) => {
    try {
      const updated = await apiFetch<Post>(`/posts/${postId}/reopen`, {
        method: "PATCH",
      });

      setPosts((prev) => prev.map((p) => (p._id === postId ? updated : p)));
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to reopen post",
      );
    }
  };

  const handleApplyClick = (post: Post) => {
    setSelectedPost(post);
    setApplyDialogOpen(true);
  };

  const handleConfirmApply = async (message: string) => {
    if (!selectedPost) return;

    try {
      await apiFetch(`/requests/${selectedPost._id}`, {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      setApplyDialogOpen(false);
      showSnackbar("Application sent!");
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : "Failed to apply");
    }
  };

  function renderContent() {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      );
    }

    if (activeTab === "applied") {
      if (myRequests.length === 0) {
        return (
          <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
            You haven't applied to any posts yet.
          </Typography>
        );
      }

      return (
        <Grid container spacing={3}>
          {myRequests.map((request) => {
            if (!request.post) return null;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={request._id}>
                <PostCard
                  post={request.post}
                  actions={
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Chip
                        label={request.status}
                        color={
                          request.status === "ACCEPTED"
                            ? "success"
                            : request.status === "REJECTED"
                              ? "default"
                              : "warning"
                        }
                        sx={{ fontWeight: 700 }}
                      />
                    </Box>
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      );
    }

    if (posts.length === 0) {
      return (
        <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
          {activeTab === "browse"
            ? "No posts match your search."
            : "You haven't posted anything yet."}
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
            <PostCard
              post={post}
              actions={
                activeTab === "browse" ? (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleApplyClick(post)}
                  >
                    Apply
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                    >
                      Edit
                    </Button>
                    {post.status !== "CLOSED" && (
                      <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        onClick={() => handleClosePost(post._id)}
                      >
                        Close
                      </Button>
                    )}
                    {post.status === "CLOSED" && (
                      <Button
                        variant="outlined"
                        color="success"
                        fullWidth
                        onClick={() => handleReopenPost(post._id)}
                      >
                        Reopen
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setSelectedPostId(post._id);
                        setApplicantsDialogOpen(true);
                      }}
                    >
                      View Applicants
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5EFE7" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "primary.main", mr: 4 }}
            >
              RoomMatch
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/create-post")}
              sx={{ mr: 2 }}
            >
              Create Post
            </Button>

            <Tooltip title="My Profile">
              <IconButton onClick={() => navigate("/profile")}>
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ color: "text.primary" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Log Out">
              <IconButton onClick={handleLogout}>
                <LogoutIcon sx={{ color: "text.secondary" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Browse" value="browse" />
          <Tab label="My Posts" value="mine" />
          <Tab label="Applied To" value="applied" />
        </Tabs>

        {activeTab === "browse" && (
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <TextField
              placeholder="Search by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              sx={{ flex: 2, minWidth: 240 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              placeholder="Max rent ($)"
              type="number"
              value={maxRentFilter}
              onChange={(e) => setMaxRentFilter(e.target.value)}
              sx={{ flex: 1, minWidth: 160 }}
            />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {renderContent()}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <ApplyDialog
        open={applyDialogOpen}
        post={selectedPost}
        onClose={() => setApplyDialogOpen(false)}
        onConfirm={handleConfirmApply}
        onViewProfile={(userId) => {
          setSelectedHostId(userId);
          setHostProfileOpen(true);
        }}
      />

      <HostProfileDialog
        open={hostProfileOpen}
        userId={selectedHostId}
        onClose={() => setHostProfileOpen(false)}
      />

      <ApplicantsDialog
        open={applicantsDialogOpen}
        postId={selectedPostId}
        onClose={() => setApplicantsDialogOpen(false)}
        onActionComplete={refetchPosts}
      />
    </Box>
  );
}
