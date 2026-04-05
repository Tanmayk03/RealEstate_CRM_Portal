import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Filter, 
  Search, 
  RefreshCw,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('25');

  const stats = [
    { label: 'Total Customers', count: 0, color: 'text-gray-800' },
    { label: 'Active Customers', count: 0, color: 'text-green-600' },
    { label: 'Inactive Customers', count: 0, color: 'text-red-500' },
    { label: 'Active Contacts', count: 0, color: 'text-blue-600' },
    { label: 'Inactive Contacts', count: 0, color: 'text-red-500' },
    { label: 'Contacts Logged In...', count: 0, color: 'text-gray-800' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Customers</h1>
        <div className="flex items-center text-sm">
          <span className="text-blue-600 hover:underline cursor-pointer">Contacts</span>
          <ChevronRight size={16} className="mx-1 text-gray-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className={`text-xl font-semibold ${stat.color} mb-1`}>
              {stat.count}
            </div>
            <div className="text-sm text-gray-600 leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center space-x-2 text-sm font-medium">
            <Plus size={16} />
            <span>New Customer</span>
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center space-x-2 text-sm">
            <Upload size={16} />
            <span>Import Customers</span>
          </button>
        </div>
        <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center space-x-2 text-sm">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Controls */}
        <div className="px-4 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              
              <button className="text-gray-700 hover:text-gray-900 text-sm">
                Export
              </button>
              
              <button className="text-gray-700 hover:text-gray-900 text-sm">
                Bulk Actions
              </button>
              
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <RefreshCw size={16} />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Company</span>
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Primary Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Primary Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Groups
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center text-gray-500 text-sm">
                  No entries found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;