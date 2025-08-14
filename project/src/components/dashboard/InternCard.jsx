import React from 'react';
import { Mail, Calendar, Briefcase } from 'lucide-react';
import { formatDate, getStatusColor } from '../../utils/helpers';
import Card from '../ui/Card';

const InternCard = ({ intern }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {intern.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{intern.name}</h3>
            <p className="text-sm text-gray-600">{intern.position}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intern.status)}`}>
          {intern.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail size={16} className="mr-2" />
          <span>{intern.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(intern.startDate)} - {formatDate(intern.endDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase size={16} className="mr-2" />
          <span>{intern.projects.length} active projects</span>
        </div>
      </div>
    </Card>
  );
};

export default InternCard;