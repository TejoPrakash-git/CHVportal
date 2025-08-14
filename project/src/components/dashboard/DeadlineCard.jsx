import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatDate, getStatusColor, getPriorityIcon } from '../../utils/helpers';
import Card from '../ui/Card';

const DeadlineCard = ({ deadline }) => {
  const isOverdue = deadline.status === 'overdue';
  const daysUntilDue = Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <span className="text-lg mr-2">{getPriorityIcon(deadline.priority)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{deadline.title}</h3>
            <p className="text-sm text-gray-600">{deadline.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deadline.status)}`}>
          {deadline.status}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2" />
          <span>{formatDate(deadline.dueDate)}</span>
        </div>
        
        {daysUntilDue < 0 ? (
          <div className="flex items-center text-red-600 text-sm font-medium">
            <AlertTriangle size={16} className="mr-1" />
            <span>{Math.abs(daysUntilDue)} days overdue</span>
          </div>
        ) : daysUntilDue <= 7 ? (
          <div className="flex items-center text-yellow-600 text-sm font-medium">
            <AlertTriangle size={16} className="mr-1" />
            <span>{daysUntilDue} days left</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">{daysUntilDue} days left</span>
        )}
      </div>
    </Card>
  );
};

export default DeadlineCard;