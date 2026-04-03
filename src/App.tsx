import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";
import { AppDiscoveryPage } from "./pages/AppDiscoveryPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/">
        <Route path="/" element={<Navigate to="/app-discovery" />} />
        <Route path="/app-discovery" element={<AppDiscoveryPage />} />
        <Route path="/apps-inventory" element={<div>Apps Inventory</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  );
}

export default App;
