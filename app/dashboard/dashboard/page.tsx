import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { People, ShoppingBag, TrendingUp, Star } from "@mui/icons-material";

const stats = [
  { label: "Total Users", value: "208", icon: <People />, color: "#1976d2" },
  { label: "Total Products", value: "194", icon: <ShoppingBag />, color: "#388e3c" },
  { label: "Categories", value: "30+", icon: <TrendingUp />, color: "#f57c00" },
  { label: "Avg Rating", value: "4.2", icon: <Star />, color: "#7b1fa2" },
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Dashboard Overview</Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color, color: "white", display: "flex" }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}