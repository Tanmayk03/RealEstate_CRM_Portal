import { NavLink, Outlet } from "react-router-dom";

const tabClass = ({ isActive }) =>
  `text-sm px-3 py-1.5 rounded-lg transition-colors ${
    isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

const Sales = () => {
  return (
    <div className="space-y-4">
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <NavLink to="/sales/overview" className={tabClass}>
          Overview
        </NavLink>
        <NavLink to="/sales/invoices" className={tabClass}>
          Invoices
        </NavLink>
        <NavLink to="/sales/proposals" className={tabClass}>
          Proposals
        </NavLink>
        <NavLink to="/sales/estimates" className={tabClass}>
          Estimates
        </NavLink>
        <NavLink to="/sales/payments" className={tabClass}>
          Payments
        </NavLink>
        <NavLink to="/sales/credit-notes" className={tabClass}>
          Credit Notes
        </NavLink>
        <NavLink to="/sales/items" className={tabClass}>
          Items
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Sales;
