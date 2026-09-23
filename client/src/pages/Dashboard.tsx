import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Snackbar,
  Stack,
  Drawer,
} from "@mui/material";
import AppliedToView from "../components/RoommatePost/applied/AppliedToView";
import BrowseView from "../components/RoommatePost/browse/BrowseView";
import ProfileFormPanel from "../components/Profile/ProfileFormPanel";
import Footer from "../components/Footer";
import type { BrowseFilters } from "../types/browseFilters";
import { EMPTY_FILTERS } from "../types/browseFilters";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiFetch } from "../api/client";
import PostCard from "../components/RoommatePost/PostCard";
import ApplyDialog from "../components/RoommatePost/browse/ApplyDialog";
import type { Post } from "../types/post";
import HostProfileDialog from "../components/Profile/HostProfileDialog";
import ApplicantsDialog from "../components/RoommatePost/applicants/ApplicantsDialog";
import type { RequestWithPost } from "../types/request";
import { useScrollDirection } from "../hooks/useScrollDirection";

type DashboardTab = "browse" | "mine" | "applied";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>("browse");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [browseFilters, setBrowseFilters] =
    useState<BrowseFilters>(EMPTY_FILTERS);
  const [appliedPostIds, setAppliedPostIds] = useState<Set<string>>(new Set());

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [hostProfileOpen, setHostProfileOpen] = useState(false);
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);

  const [applicantsDialogOpen, setApplicantsDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  const [myRequests, setMyRequests] = useState<RequestWithPost[]>([]);

  const scrollDirection = useScrollDirection();

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
    async function fetchAppliedIds() {
      const result = await apiFetch<{ postId: string }[]>("/requests/mine");
      setAppliedPostIds(new Set(result.map((r) => r.postId)));
    }
    fetchAppliedIds();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError("");

      try {
        if (activeTab === "browse") {
          const params = new URLSearchParams();
          if (browseFilters.location)
            params.append("location", browseFilters.location);
          if (browseFilters.accommodationType)
            params.append("accommodationType", browseFilters.accommodationType);
          if (browseFilters.maxRent !== null)
            params.append("maxRent", String(browseFilters.maxRent));
          if (browseFilters.minBeds > 1)
            params.append("minBeds", String(browseFilters.minBeds));
          browseFilters.amenities.forEach((a) => params.append("amenities", a));

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
  }, [activeTab, browseFilters]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await apiFetch(`/posts/${postId}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to delete post",
      );
    }
  };

  const handleWithdraw = async (requestId: string) => {
    try {
      await apiFetch(`/requests/${requestId}`, { method: "DELETE" });
      setMyRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to withdraw application",
      );
    }
  };

  const handleLogout = async () => {
    await apiFetch("/auth/logout", {
      method: "POST",
    });

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

      setAppliedPostIds((prev) => new Set(prev).add(selectedPost._id));
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

    if (activeTab === "browse") {
      return (
        <BrowseView
          posts={posts}
          isLoading={isLoading}
          appliedPostIds={appliedPostIds}
          filters={browseFilters}
          onFiltersChange={setBrowseFilters}
          onApplyClick={handleApplyClick}
        />
      );
    }

    if (activeTab === "applied") {
      return (
        <AppliedToView
          requests={myRequests}
          onWithdraw={handleWithdraw}
          onBrowseClick={() => setActiveTab("browse")}
        />
      );
    }

    if (posts.length === 0) {
      return (
        <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
          You haven't posted anything yet.
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
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5EFE7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          transform:
            scrollDirection === "down" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out",
          top: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
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

            <Stack direction="row" spacing={3} sx={{ ml: 5, flex: 1 }}>
              {[
                { value: "browse" as const, label: "Browse" },
                { value: "mine" as const, label: "My Posts" },
                { value: "applied" as const, label: "My Applications" },
              ].map((tab) => (
                <Typography
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: 600,
                    color:
                      activeTab === tab.value
                        ? "primary.main"
                        : "text.secondary",
                    borderBottom: "2px solid",
                    borderColor:
                      activeTab === tab.value ? "primary.main" : "transparent",
                    pb: 0.5,
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {tab.label}
                </Typography>
              ))}
            </Stack>

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
              <IconButton onClick={() => setProfileDrawerOpen(true)}>
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
      <Toolbar />

      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
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

      <Drawer
        anchor="right"
        open={profileDrawerOpen}
        onClose={() => setProfileDrawerOpen(false)}
      >
        <Box sx={{ width: 420, p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            My Profile
          </Typography>
          <ProfileFormPanel onCreated={() => setProfileDrawerOpen(false)} />
        </Box>
      </Drawer>

      <Footer />
    </Box>
  );
}
