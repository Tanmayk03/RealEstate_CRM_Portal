import { Home, Circle, Square, BarChart3, Table, Users, FileText, DollarSign } from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <nav className="mt-4">
      <SidebarItem icon={Home} label="Dashboard" to="/dashboard" />
      <SidebarItem icon={Circle} label="Customers" to="/customers" />

      {/* Sales Dropdown */}
      <SidebarItem icon={DollarSign} label="Sales" >
        <SidebarItem to="/Sales/Proposals" label="Proposals" />
        <SidebarItem to="/Sales/Estimates" label="Estimates" />
        <SidebarItem to="/Sales/Invoices" label="Invoices" />
        <SidebarItem to="/Sales/Payments" label="Payments" />
        <SidebarItem to="/Sales/Credit-Notes" label="Credit Notes" />
        <SidebarItem to="/Sales/Items" label="Items" />
      </SidebarItem>
      {/* Real Estate */}
      <SidebarItem icon={BarChart3} label="Real Estate" >
  <SidebarItem to="/real-estate/dashboard" label="Dashboard" />
  <SidebarItem to="/real-estate/property-owners" label="Property Owners" />
  <SidebarItem to="/real-estate/mystaffs" label="My Staffs" />
  <SidebarItem to="/real-estate/agents" label="Real Estate Agents" />
  <SidebarItem to="/real-estate/business-brokers" label="Business Brokers" />
  <SidebarItem to="/real-estate/properties" label="Properties" />
  <SidebarItem to="/real-estate/approvals" label="Approvals" />
  <SidebarItem to="/real-estate/buy-requests" label="Buy Requests" />
  <SidebarItem to="/real-estate/tenants" label="Tenants" />
  <SidebarItem to="/real-estate/reports" label="Reports" />
  <SidebarItem to="/real-estate/settings" label="Settings" />
</SidebarItem>
     
      <SidebarItem icon={Table} label="Subscriptions" to="/subscriptions" />
      <SidebarItem icon={Circle} label="Expenses" to="/expenses" />
      <SidebarItem icon={Users} label="Contracts" to="/contracts" />
      <SidebarItem icon={FileText} label="Projects" to="/projects" />
      <SidebarItem icon={FileText} label="Tasks" to="/tasks" />
      <SidebarItem icon={FileText} label="Support" to="/support" />
      <SidebarItem icon={FileText} label="Leads" to="/leads" />
      <SidebarItem icon={FileText} label="Estimate Request" to="/estimate-request" />
      <SidebarItem icon={FileText} label="Knowledge Base" to="/knowledge-base" />

      {/* Utilities */}
      <SidebarItem icon={DollarSign} label="Utilities" >
        <SidebarItem to="/Utilities/Media" label="Media" />
        <SidebarItem to="/Utilities/BulkPDFExport" label="Bulk PDF Export" />
        <SidebarItem to="/Utilities/Calendar" label="Calendar" />
        <SidebarItem to="/Utilities/Announcements" label="Announcements" />
        <SidebarItem to="/Utilities/ActivityLog" label="Activity Log" />
        <SidebarItem to="/Utilities/TicketPipeLog" label="Ticket Pipe Log" />
      </SidebarItem>

      {/* Reports */}
      <SidebarItem icon={DollarSign} label="Reports" >
        <SidebarItem to="/Reports/Sales" label="Sales" />
        <SidebarItem to="/Reports/ExpensesVsIncome" label="Expenses Vs Income" />
        <SidebarItem to="/Reports/Expenses" label="Expenses" />
        <SidebarItem to="/Reports/KbArticles" label="Knowledge Base Articles" />
        <SidebarItem to="/Reports/Leads" label="Leads" />
        <SidebarItem to="/Reports/TimesheetOverview" label="Timesheet Overview" />
      </SidebarItem>

      <SidebarItem icon={FileText} label="Setup" to="/setup" />
    </nav>
  );
};

export default Sidebar;
