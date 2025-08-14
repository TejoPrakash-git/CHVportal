import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../ui/Card';

const projectData = [
  { name: 'Jan', active: 12, completed: 8 },
  { name: 'Feb', active: 15, completed: 10 },
  { name: 'Mar', active: 18, completed: 12 },
  { name: 'Apr', active: 22, completed: 15 },
  { name: 'May', active: 19, completed: 18 },
  { name: 'Jun', active: 24, completed: 20 },
];

const statusData = [
  { name: 'Active', value: 65, color: '#3B82F6' },
  { name: 'Completed', value: 30, color: '#10B981' },
  { name: 'On Hold', value: 5, color: '#F59E0B' },
];

const AnalyticsChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#3B82F6" name="Active" />
            <Bar dataKey="completed" fill="#10B981" name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsChart;