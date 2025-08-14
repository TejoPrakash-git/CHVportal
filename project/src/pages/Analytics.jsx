import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import StatsCard from '../components/dashboard/StatsCard';
import Card from '../components/ui/Card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Project Success Rate"
          value="94%"
          change="2%"
          changeType="increase"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Average Completion Time"
          value="4.2 months"
          change="0.3"
          changeType="decrease"
          icon={BarChart3}
          color="blue"
        />
        <StatsCard
          title="Intern Retention Rate"
          value="89%"
          change="5%"
          changeType="increase"
          icon={PieChart}
          color="green"
        />
        <StatsCard
          title="On-time Delivery"
          value="87%"
          change="3%"
          changeType="increase"
          icon={Activity}
          color="yellow"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Project Completion</h3>
          <div className="h-80">
            {/* Chart component would go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Chart visualization
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Allocation</h3>
          <div className="h-80">
            {/* Chart component would go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Chart visualization
            </div>
          </div>
        </Card>
      </div>
      
      {/* More detailed analytics */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <div className="h-80">
            {/* Chart component would go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Chart visualization
            </div>
          </div>
        </Card>
      </div>
      
      {/* Data tables */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Performance Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data rows */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Mobile App Development</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">100%</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap">Under</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;