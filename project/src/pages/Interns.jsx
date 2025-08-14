import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, UserPlus } from 'lucide-react';
import InternCard from '../components/dashboard/InternCard';
import Button from '../components/ui/Button';
import { dataAPI } from '../services/api';

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const data = await dataAPI.getInterns();
        setInterns(data);
        setFilteredInterns(data);
      } catch (error) {
        console.error('Error fetching interns:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInterns();
  }, []);
  
  useEffect(() => {
    let filtered = interns;
    
    if (searchTerm) {
      filtered = filtered.filter(intern =>
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(intern => intern.status === statusFilter);
    }
    
    setFilteredInterns(filtered);
  }, [interns, searchTerm, statusFilter]);
  
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
        <h1 className="text-2xl font-bold text-gray-900">Interns</h1>
        <Button>
          <UserPlus size={16} className="mr-2" />
          Add Intern
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search interns..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <select
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="completed">Completed</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterns.length > 0 ? (
          filteredInterns.map(intern => (
            <InternCard key={intern.id} intern={intern} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <UserPlus size={48} className="mb-4 text-gray-400" />
            <p className="text-lg font-medium">No interns found</p>
            <p>Try adjusting your filters or add a new intern</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interns;