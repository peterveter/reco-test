import { AppDiscoveryTable } from "./AppDiscoveryTable";
import { AppDiscoveryFilters } from "./AppDiscoveryFilters";
import { Box } from "@mui/material";

export function AppDiscoveryPage() {
  return (
    <Box className="flex gap-2.5">
      <AppDiscoveryTable />
      <AppDiscoveryFilters />
    </Box>
  );
}
