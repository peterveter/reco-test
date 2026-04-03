import { Box } from "@mui/material";
import { AppDiscoveryTable, AppDiscoveryFilters } from "../components";

export function AppDiscoveryPage() {
  return (
    <Box className="flex gap-2.5">
      <AppDiscoveryTable />
      <AppDiscoveryFilters />
    </Box>
  );
}
