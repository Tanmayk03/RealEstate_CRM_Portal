import { NavLink, Outlet } from "react-router-dom";

const tabClass = ({ isActive }) =>
  `text-sm px-3 py-1.5 rounded-lg transition-colors ${
    isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

const RealEstate = () => {
  return (
    <div className="space-y-4">
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <NavLink to="/real-estate/dashboard" className={tabClass}>
          Dashboard
        </NavLink>
        <NavLink to="/real-estate/properties" className={tabClass}>
          Properties
        </NavLink>
        <NavLink to="/real-estate/projects" className={tabClass}>
          Projects
        </NavLink>
        <NavLink to="/real-estate/property-owners" className={tabClass}>
          Owners
        </NavLink>
        <NavLink to="/real-estate/mystaffs" className={tabClass}>
          My Staffs
        </NavLink>
        <NavLink to="/real-estate/agents" className={tabClass}>
          Agents
        </NavLink>
        <NavLink to="/real-estate/business-brokers" className={tabClass}>
          Brokers
        </NavLink>
        <NavLink to="/real-estate/approvals" className={tabClass}>
          Approvals
        </NavLink>
        <NavLink to="/real-estate/buy-requests" className={tabClass}>
          Buy Requests
        </NavLink>
        <NavLink to="/real-estate/tenants" className={tabClass}>
          Tenants
        </NavLink>
        <NavLink to="/real-estate/reports" className={tabClass}>
          Reports
        </NavLink>
        <NavLink to="/real-estate/settings" className={tabClass}>
          Settings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default RealEstate;
