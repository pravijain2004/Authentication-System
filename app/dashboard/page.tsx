"use client";
import { useEffect, useState, useCallback } from "react";
import { useUsersStore } from "@/store/usersStore";
import { useRouter } from "next/navigation";
import {
  Box, Typography, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Chip, CircularProgress, TablePagination,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDebounce } from "@/hooks/useDebounce";

const LIMIT = 10;

export default function UsersPage() {
  const router = useRouter();
  const { users, total, loading, fetchUsers, searchQuery, setSearchQuery, currentPage, setCurrentPage } = useUsersStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
    setCurrentPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchUsers(currentPage, LIMIT, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Users</Typography>

      <TextField
        fullWidth placeholder="Search users..." variant="outlined" sx={{ mb: 3 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          },
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  {["User", "Email", "Phone", "Gender", "Company"].map((h) => (
                    <TableCell key={h} sx={{ color: "white", fontWeight: 700 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() => router.push(`/dashboard/users/${user.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar src={user.image} sx={{ width: 36, height: 36 }} />
                        <Typography fontWeight={600}>{user.firstName} {user.lastName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.gender} size="small"
                        color={user.gender === "male" ? "primary" : "secondary"}
                      />
                    </TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div" count={total} page={currentPage}
            rowsPerPage={LIMIT} rowsPerPageOptions={[LIMIT]}
            onPageChange={handlePageChange}
          />
        </Paper>
      )}
    </Box>
  );
}