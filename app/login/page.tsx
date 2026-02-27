"use client";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, CircularProgress, InputAdornment, IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, AdminPanelSettings } from "@mui/icons-material";

function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid username or password. Try: emilys / emilyspass");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%", borderRadius: 3, boxShadow: 10 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <AdminPanelSettings sx={{ fontSize: 56, color: "primary.main" }} />
            <Typography variant="h5" fontWeight={700} mt={1}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Username" margin="normal" required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="emilys"
            />
            <TextField
              fullWidth label="Password" margin="normal" required
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit" fullWidth variant="contained" size="large"
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </form>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block", textAlign: "center" }}>
            Demo credentials: <strong>emilys</strong> / <strong>emilyspass</strong>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}