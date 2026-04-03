import { Paper, TableRow, TableCell, TextField } from "@mui/material";
import { useAppsContext } from "../../stores/appStore";

export function AppDiscoveryFilters() {
  const { nameFilter, categoryFilter, setNameFilter, setCategoryFilter } =
    useAppsContext((state) => state);

  return (
    <Paper className="w-[330px]">
      <TableRow>
        <TableCell>Filters</TableCell>
      </TableRow>
      <TableRow>
        <TextField
          label="Name Filter"
          variant="outlined"
          onChange={(e) => setNameFilter(e.target.value)}
          value={nameFilter}
        />
      </TableRow>
      <TableRow>
        <TextField
          label="Category Filter"
          variant="outlined"
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
        />
      </TableRow>
    </Paper>
  );
}
