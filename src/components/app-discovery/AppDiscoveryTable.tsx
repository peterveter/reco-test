import {
  Paper,
  TableRow,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TablePagination,
} from "@mui/material";
import type { PAGE_SIZE } from "../../stores/appStore";
import { useAppsContext } from "../../stores/appStore";
import { AppDiscoveryTableContent } from "./AppDiscoveryTableContent";

export function AppDiscoveryTable() {
  const { pageNumber, pageSize, setPageNumber, setPageSize } = useAppsContext(
    (state) => state,
  );

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 3rem)" }}>
      <Table stickyHeader aria-label="simple table" className="bg-[#393939]">
        <TableHead>
          <TableRow className="border-b border-[#5B5B5B]">
            <TableCell className="text-white bg-[#B5E600]/10">Name</TableCell>
            <TableCell className="text-white bg-[#B5E600]/10">
              Category
            </TableCell>
            <TableCell className="text-white bg-[#B5E600]/10">
              Connection
            </TableCell>
          </TableRow>
        </TableHead>
        <AppDiscoveryTableContent />
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
