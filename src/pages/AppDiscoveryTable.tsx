import {
  Paper,
  TableRow,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Stack,
  Skeleton,
  Typography,
  TablePagination,
  Alert,
  Button,
  Box,
} from "@mui/material";
import type { PAGE_SIZE } from "../stores/appStore";
import { useAppsContext } from "../stores/appStore";
import { useGetAppsList } from "../api/appsApi";
import { useDebounce } from "../hooks";

export function AppDiscoveryTable() {
  const {
    nameFilter,
    categoryFilter,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
  } = useAppsContext((state) => state);

  const debouncedNameFilter = useDebounce(nameFilter, 400);
  const debouncedCategoryFilter = useDebounce(categoryFilter, 400);

  const {
    data: appsListQuery,
    isLoading,
    isError,
    refetch,
  } = useGetAppsList({
    appName: debouncedNameFilter,
    category: debouncedCategoryFilter,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  console.log({ isError, isLoading, appsListQuery });
  if (isError) {
    return (
      <Box className="w-full">
        <Alert
          severity="error"
          action={<Button onClick={() => refetch()}>Retry</Button>}
        >
          Error fetching apps list
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Stack
        spacing={2}
        className="w-full max-h-[calc(100vh-3rem)] overflow-y-auto"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={53} />
        ))}
      </Stack>
    );
  }

  if (!appsListQuery || appsListQuery.appRows.length === 0) {
    return <Typography variant="h6">No apps found</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 3rem)" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-[#B5E600] border-b border-[#5B5B5B]">
            <TableCell>Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Connection</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appsListQuery.appRows.map((row) => (
            <TableRow
              key={row.appId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.appName}
              </TableCell>
              <TableCell align="right">{row.appSources.join(", ")}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{
          bottom: "0",
          position: "sticky",
          width: "100%",
          backgroundColor: "#393939",
          color: "#fff",
        }}
        component="div"
        count={100}
        page={pageNumber}
        rowsPerPageOptions={[25, 50]}
        onPageChange={(_, page) => setPageNumber(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value) as PAGE_SIZE);
          setPageNumber(0);
        }}
      />
    </TableContainer>
  );
}
