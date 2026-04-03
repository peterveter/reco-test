import {
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Skeleton,
  Typography,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { useAppsContext } from "../../stores/appStore";
import { useGetAppsList } from "../../api/appsApi";
import { useDebounce } from "../../hooks";

function FormattedTableCell({ children }: { children: React.ReactNode }) {
  return (
    <TableCell
      component="th"
      scope="row"
      className="text-white font-roboto font-regular text-xs leading-none tracking-none"
    >
      {children}
    </TableCell>
  );
}

export function AppDiscoveryTableContent() {
  const { nameFilter, categoryFilter, pageNumber, pageSize } = useAppsContext(
    (state) => state,
  );

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
        className="w-full min-w-96 max-h-[calc(100%-3rem)] overflow-y-auto py-2"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={53}
          />
        ))}
      </Stack>
    );
  }

  if (!appsListQuery || appsListQuery.appRows.length === 0) {
    return <Typography variant="h6">No apps found</Typography>;
  }

  return (
    <TableBody>
      {appsListQuery.appRows.map((row) => (
        <TableRow
          key={row.appId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <FormattedTableCell>{row.appName}</FormattedTableCell>
          <FormattedTableCell>{row.appSources.join(", ")}</FormattedTableCell>
          <FormattedTableCell>{row.category}</FormattedTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
