"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box, Card, CardContent, Typography, Chip, Button,
  CircularProgress, Rating, Divider, MobileStepper,
} from "@mui/material";
import { Grid } from "@mui/material";
import { ArrowBack, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  if (!product) return <Typography>Product not found</Typography>;

  const maxSteps = product.images?.length || 1;

  return (
    <Box>
      <Button component={Link} href="/products" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Products
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>

            {/* Image Carousel */}
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ size prop, no item prop */}
              <Box sx={{ position: "relative", bgcolor: "#f9f9f9", borderRadius: 2, overflow: "hidden" }}>
                <Box
                  component="img"
                  src={product.images?.[activeStep] || product.thumbnail}
                  alt={product.title}
                  sx={{ width: "100%", height: 350, objectFit: "contain" }}
                />
                {maxSteps > 1 && (
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={() => setActiveStep((s) => s + 1)}
                        disabled={activeStep === maxSteps - 1}
                      >
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={() => setActiveStep((s) => s - 1)}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    }
                  />
                )}
              </Box>
            </Grid>

            {/* Details */}
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ size prop, no item prop */}
              <Chip label={product.category} size="small" sx={{ mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>{product.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {product.brand}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2">({product.rating})</Typography>
              </Box>

              <Typography variant="h4" color="primary.main" fontWeight={700} sx={{ mt: 2 }}>
                ${product.price}
                {product.discountPercentage > 0 && (
                  <Chip
                    label={`-${product.discountPercentage}%`}
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">{product.description}</Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Stock: <strong>{product.stock} units</strong>
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}