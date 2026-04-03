import { NavLink } from "react-router";

function LinkItem({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <div className="flex items-center">
      {isActive && <div className="w-0.5 h-5.5 bg-[#B5E600]" />}
      <p className="p-2.5 font-roboto font-medium text-xs leading-none tracking-none uppercase whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

export function AppNavigation() {
  return (
    <nav>
      <NavLink to="/app-discovery" end>
        {({ isActive }) => (
          <LinkItem label="App Discovery" isActive={isActive} />
        )}
      </NavLink>
      <NavLink to="/apps-inventory" end>
        {({ isActive }) => (
          <LinkItem label="Apps Inventory" isActive={isActive} />
        )}
      </NavLink>
      <NavLink to="/settings" end>
        {({ isActive }) => <LinkItem label="Settings" isActive={isActive} />}
      </NavLink>
    </nav>
  );
}
