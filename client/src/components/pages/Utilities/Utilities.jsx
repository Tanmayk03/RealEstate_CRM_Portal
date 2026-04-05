import { NavLink, Outlet } from "react-router-dom";

const tabClass = ({ isActive }) =>
  `text-sm px-3 py-1.5 rounded-lg transition-colors ${
    isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

const Utilities = () => {
  return (
    <div className="space-y-4">
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <NavLink to="/utilities/users" className={tabClass}>
          Users
        </NavLink>
        <NavLink to="/utilities/settings" className={tabClass}>
          Settings
        </NavLink>
        <NavLink to="/utilities/media" className={tabClass}>
          Media
        </NavLink>
        <NavLink to="/utilities/bulk-pdf-export" className={tabClass}>
          Bulk PDF Export
        </NavLink>
        <NavLink to="/utilities/calendar" className={tabClass}>
          Calendar
        </NavLink>
        <NavLink to="/utilities/announcements" className={tabClass}>
          Announcements
        </NavLink>
        <NavLink to="/utilities/activity-log" className={tabClass}>
          Activity Log
        </NavLink>
        <NavLink to="/utilities/ticket-pipe-log" className={tabClass}>
          Ticket Pipe Log
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Utilities;
