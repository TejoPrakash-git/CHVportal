import React, { useEffect, useState } from 'react';
import { Calendar, Plus, Search, Filter } from 'lucide-react';
import DeadlineCard from '../components/dashboard/DeadlineCard';
import Button from '../components/ui/Button';
import { dataAPI } from '../services/api';

const Deadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const data = await dataAPI.getDeadlines();
        setDeadlines(data);
        setFilteredDeadlines(data);
      } catch (error) {
        console.error('Error fetching deadlines:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeadlines();
  }, []);
  
  useEffect(() => {
    let filtered = deadlines;
    
    if (searchTerm) {
      filtered = filtered.filter(deadline =>
        deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deadline.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(deadline => deadline.priority === priorityFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(deadline => deadline.status === statusFilter);
    }
    
    setFilteredDeadlines(filtered);
  }, [deadlines, searchTerm, priorityFilter, statusFilter]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Deadlines</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Deadline
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search deadlines..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeadlines.length > 0 ? (
          filteredDeadlines.map(deadline => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <Calendar size={48} className="mb-4 text-gray-400" />
            <p className="text-lg font-medium">No deadlines found</p>
            <p>Try adjusting your filters or create a new deadline</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deadlines;