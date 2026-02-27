"use client";
import { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton,  // ← Add this
  ListItemIcon, ListItemText, IconButton, Avatar, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Dashboard, People, ShoppingBag, Logout } from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
  { label: "Users", href: "/dashboard/users", icon: <People /> },
  { label: "Products", href: "/dashboard/products", icon: <ShoppingBag /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <Box>
      <Toolbar sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6" fontWeight={700}>AdminPanel</Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
  <ListItem key={item.href} disablePadding>
    <ListItemButton
      component={Link}
      href={item.href}
      selected={pathname === item.href}
      sx={{
        "&.Mui-selected": {
          bgcolor: "primary.light",
          color: "primary.contrastText",
        },
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  </ListItem>
))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => signOut({ callbackUrl: "/login" })} sx={{ cursor: "pointer" }}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <Avatar src={session?.user?.image || ""} sx={{ width: 36, height: 36 }} />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{ width: DRAWER_WIDTH, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" } }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: `${DRAWER_WIDTH}px` }, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}