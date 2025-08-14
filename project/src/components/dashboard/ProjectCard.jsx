import React from 'react';
import { Calendar, Users, Activity } from 'lucide-react';
import { formatDate, getStatusColor } from '../../utils/helpers';
import Card from '../ui/Card';

const ProjectCard = ({ project }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-2" />
          <span>{project.team.length} team members</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Activity size={16} className="mr-2" />
          <span>Last updated 2 hours ago</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;