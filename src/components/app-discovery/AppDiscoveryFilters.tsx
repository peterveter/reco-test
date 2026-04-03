import { Box, Paper, TextField } from "@mui/material";
import { useAppsContext } from "../../stores/appStore";

export function AppDiscoveryFilters() {
  const { nameFilter, categoryFilter, setNameFilter, setCategoryFilter } =
    useAppsContext((state) => state);

  return (
    <Paper
      className="w-[330px]"
      sx={{ backgroundColor: "#393939", color: "#fff" }}
    >
      <Box sx={{ backgroundColor: "#454A33", color: "#fff", p: 2 }}>
        Filters
      </Box>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Name Filter"
          variant="outlined"
          onChange={(e) => setNameFilter(e.target.value)}
          value={nameFilter}
          sx={{
            "& .MuiOutlinedInput-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#5B5B5B" },
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Category Filter"
          variant="outlined"
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
          sx={{
            "& .MuiOutlinedInput-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#5B5B5B" },
          }}
        />
      </Box>
    </Paper>
  );
}
