import { NavLink, Outlet } from "react-router-dom";

const tabClass = ({ isActive }) =>
  `text-sm px-3 py-1.5 rounded-lg transition-colors ${
    isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`;

const Reports = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <NavLink to="/reports/sales" className={tabClass}>
          Sales
        </NavLink>
        <NavLink to="/reports/expenses-vs-income" className={tabClass}>
          Expenses vs Income
        </NavLink>
        <NavLink to="/reports/expenses" className={tabClass}>
          Expenses
        </NavLink>
        <NavLink to="/reports/kb-articles" className={tabClass}>
          KB Articles
        </NavLink>
        <NavLink to="/reports/leads" className={tabClass}>
          Leads
        </NavLink>
        <NavLink to="/reports/timesheet-overview" className={tabClass}>
          Timesheet Overview
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Reports;
