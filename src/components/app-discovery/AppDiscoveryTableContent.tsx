import {
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Typography,
  Alert,
  Button,
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
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <Alert
              severity="error"
              action={<Button onClick={() => refetch()}>Retry</Button>}
            >
              Error fetching apps list
            </Alert>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: 15 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={3}>
              <Skeleton variant="rectangular" width="100%" height={53} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (!appsListQuery || appsListQuery.appRows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <Typography variant="h6">No apps found</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
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
