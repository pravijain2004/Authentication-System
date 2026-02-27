"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Card, CardContent, Typography, Avatar, Grid, Chip, Button, Divider, CircularProgress } from "@mui/material";
import { ArrowBack, Email, Phone, LocationOn, Business } from "@mui/icons-material";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { User } from "@/types";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box>
      <Button component={Link} href="/users" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Users
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
            <Avatar src={user.image} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>{user.firstName} {user.lastName}</Typography>
              <Chip label={user.gender} color={user.gender === "male" ? "primary" : "secondary"} size="small" sx={{ mt: 1 }} />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
    <Grid size={{ xs: 12, sm: 6 }}>
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
      <Email color="primary" />
      <Box>
        <Typography variant="caption" color="text.secondary">Email</Typography>
        <Typography>{user.email}</Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
      <Phone color="primary" />
      <Box>
        <Typography variant="caption" color="text.secondary">Phone</Typography>
        <Typography>{user.phone}</Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
      <LocationOn color="primary" />
      <Box>
        <Typography variant="caption" color="text.secondary">Location</Typography>
        <Typography>{user.address?.city}, {user.address?.state}, {user.address?.country}</Typography>
      </Box>
    </Box>
  </Grid>

  <Grid size={{ xs: 12, sm: 6 }}>
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
      <Business color="primary" />
      <Box>
        <Typography variant="caption" color="text.secondary">Company</Typography>
        <Typography>{user.company?.name}</Typography>
      </Box>
    </Box>
    <Box sx={{ ml: 4.5 }}>
      <Typography variant="caption" color="text.secondary">Department</Typography>
      <Typography>{user.company?.department}</Typography>
    </Box>
    <Box sx={{ ml: 4.5, mt: 1 }}>
      <Typography variant="caption" color="text.secondary">Title</Typography>
      <Typography>{user.company?.title}</Typography>
    </Box>
  </Grid>
</Grid>
        </CardContent>
      </Card>
    </Box>
  );
}