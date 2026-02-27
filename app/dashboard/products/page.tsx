"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useProductsStore } from "@/store/productStore";
import {
  Box, Typography, TextField, Card, CardContent, CardMedia, Chip,
  CircularProgress, TablePagination, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, Rating, Grid,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

const LIMIT = 12;

export default function ProductsPage() {
  const {
    products, total, loading, fetchProducts, fetchCategories,
    categories, searchQuery, setSearchQuery, selectedCategory,
    setSelectedCategory, currentPage, setCurrentPage,
  } = useProductsStore();

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
    setCurrentPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchProducts(currentPage, LIMIT, searchQuery, selectedCategory);
  }, [currentPage, searchQuery, selectedCategory]);

  const handlePageChange = useCallback((_: unknown, page: number) => setCurrentPage(page), []);

  const categoryItems = useMemo(() =>
    categories.map((cat) => (
      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
    )), [categories]
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Products</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
  placeholder="Search products..." variant="outlined" sx={{ flexGrow: 1, minWidth: 200 }}
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
    },
  }}
/>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory} label="Category"
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(0); }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categoryItems}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <Card
                  component={Link} href={`/products/${product.id}`}
                  sx={{
                    height: "100%", display: "flex", flexDirection: "column",
                    textDecoration: "none", borderRadius: 3, boxShadow: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img" image={product.thumbnail} alt={product.title}
                    sx={{ height: 200, objectFit: "contain", p: 1, bgcolor: "#f9f9f9" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={700} noWrap>{product.title}</Typography>
                    <Chip label={product.category} size="small" sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="caption">({product.rating})</Typography>
                    </Box>
                    <Typography variant="h6" color="primary.main" fontWeight={700} mt={1}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <TablePagination
              component="div" count={total} page={currentPage}
              rowsPerPage={LIMIT} rowsPerPageOptions={[LIMIT]}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
}