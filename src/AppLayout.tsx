import { AppBar, Paper, Toolbar } from "@mui/material";
import { Outlet } from "react-router";
import reactLogo from "./assets/reco-logo.png";
import { AppNavigation } from "./components/AppNavigation";

export function AppLayout() {
  return (
    <>
      <AppBar className="w-40 h-full left-0 bg-[#393939]">
        <Toolbar className="w-40 h-full flex flex-col items-start py-3 gap-5">
          <img src={reactLogo} alt="logo" className="w-20" />
          <AppNavigation />
        </Toolbar>
      </AppBar>
      <div className="ml-40 p-4 bg-[#393939]">
        <Paper>
          <Outlet />
        </Paper>
      </div>
    </>
  );
}
