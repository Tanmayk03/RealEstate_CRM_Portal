import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";
import { RequireAuth, GuestOnly } from "./components/AuthGate";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

// main pages
import DashboardPage from "./components/pages/DashboardPage";
import Customers from "./components/pages/Customers";
import Sales from "./components/pages/Sales/Sales";
import Subscriptions from "./components/pages/Subscriptions";
import Expenses from "./components/pages/Expenses";
import Contracts from "./components/pages/Contracts";
import Projects from "./components/pages/Projects";
import Tasks from "./components/pages/Tasks";
import Support from "./components/pages/Support";
import Leads from "./components/pages/Leads";
import EstimateRequest from "./components/pages/EstimateRequest";
import KnowledgeBase from "./components/pages/KnowledgeBase";
import Utilities from "./components/pages/Utilities/Utilities";
import Media from "./components/pages/Utilities/Media";
import BulkPDFExport from "./components/pages/Utilities/BulkPDFExport";
import Calendar from "./components/pages/Utilities/Calendar";
import Announcements from "./components/pages/Utilities/Announcements";
import ActivityLog from "./components/pages/Utilities/ActivityLog";
import TicketPipeLog from "./components/pages/Utilities/TicketPipeLog";

// reports pages (renamed to avoid conflict)
import Reports from "./components/pages/Reports/Reports";
import ReportExpensesVsIncome from "./components/pages/Reports/ExpensesVsIncome";
import ReportKbArticles from "./components/pages/Reports/KbArticles";
import ReportTimesheetOverview from "./components/pages/Reports/TimesheetOverview";
import ReportSales from "./components/pages/Reports/Sales";
import ReportExpenses from "./components/pages/Reports/Expenses";

import Setup from "./components/pages/Setup";

// sales subpages
import Proposals from "./components/pages/Sales/Proposals";
import CreditNotes from "./components/pages/Sales/CreditNotes";
import Estimate from "./components/pages/Sales/Estimate";
import Invoices from "./components/pages/Sales/Invoices";
import Items from "./components/pages/Sales/Items";
import Payments from "./components/pages/Sales/Payments";
import SalesOverview from "./components/pages/Sales/SalesOverview";

// real estate subpages
import RealEstate from "./components/pages/RealEstate/RealEstate";
import Dashboard from "./components/pages/RealEstate/Dashboard";
import PropertyOwners from "./components/pages/RealEstate/PropertyOwners";
import Mystaffs from "./components/pages/RealEstate/Mystaffs";
import Agents from "./components/pages/RealEstate/Agents";
import BusinessBrokers from "./components/pages/RealEstate/BusinessBrokers";
import Properties from "./components/pages/RealEstate/Properties";
import Approvals from "./components/pages/RealEstate/Approvals";
import BuyRequests from "./components/pages/RealEstate/BuyRequests";
import Tenants from "./components/pages/RealEstate/Tenants";
import Settings from "./components/pages/RealEstate/Settings";
import RealEstateReports from "./components/pages/RealEstate/RealEstateReports";
import RealEstateProjects from "./components/pages/RealEstate/Projects";
import UtilitiesUsers from "./components/pages/Utilities/Users";
import UtilitiesSettings from "./components/pages/Utilities/UtilitiesSettings";

function App() {
  return (
    <div className="h-full min-h-0">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestOnly>
                <Login />
              </GuestOnly>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestOnly>
                <Signup />
              </GuestOnly>
            }
          />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            {/* Main Dashboard */}
            <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="customers" element={<Customers />} />

          {/* Sales */}
          <Route path="sales" element={<Sales />}>
            <Route index element={<SalesOverview />} />
            <Route path="overview" element={<SalesOverview />} />
            <Route path="proposals" element={<Proposals />} />
            <Route path="credit-notes" element={<CreditNotes />} />
            <Route path="estimates" element={<Estimate />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="items" element={<Items />} />
            <Route path="payments" element={<Payments />} />
          </Route>

          {/* Real Estate */}
          <Route path="real-estate" element={<RealEstate />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="property-owners" element={<PropertyOwners />} />
            <Route path="mystaffs" element={<Mystaffs />} />
            <Route path="agents" element={<Agents />} />
            <Route path="business-brokers" element={<BusinessBrokers />} />
            <Route path="properties" element={<Properties />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="buy-requests" element={<BuyRequests />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="reports" element={<RealEstateReports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects" element={<RealEstateProjects />} />
          </Route>

          {/* Others */}
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="support" element={<Support />} />
          <Route path="leads" element={<Leads />} />
          <Route path="estimate-request" element={<EstimateRequest />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />

          {/* Utilities */}
          <Route path="utilities" element={<Utilities />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UtilitiesUsers />} />
            <Route path="settings" element={<UtilitiesSettings />} />
            <Route path="media" element={<Media />} />
            <Route path="bulk-pdf-export" element={<BulkPDFExport />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="activity-log" element={<ActivityLog />} />
            <Route path="ticket-pipe-log" element={<TicketPipeLog />} />
          </Route>

          {/* Reports */}
          <Route path="reports" element={<Reports />}>
            <Route index element={<Navigate to="sales" replace />} />
            <Route path="sales" element={<ReportSales />} />
            <Route path="expenses-vs-income" element={<ReportExpensesVsIncome />} />
            <Route path="expenses" element={<ReportExpenses />} />
            <Route path="kb-articles" element={<ReportKbArticles />} />
            <Route path="leads" element={<Leads />} />
            <Route path="timesheet-overview" element={<ReportTimesheetOverview />} />
          </Route>

            {/* Setup */}
            <Route path="setup" element={<Setup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
