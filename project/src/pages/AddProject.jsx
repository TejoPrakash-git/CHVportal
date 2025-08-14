import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { dataAPI } from '../services/api';

const AddProject = () => {
  console.log('AddProject component rendered');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    progress: 0,
    startDate: '',
    endDate: '',
    team: []
  });

  const [teamMember, setTeamMember] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeamMember = () => {
    if (teamMember.trim()) {
      setFormData(prev => ({
        ...prev,
        team: [...prev.team, teamMember.trim()]
      }));
      setTeamMember('');
    }
  };

  const handleRemoveTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.description.trim() || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate dates
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert('End date cannot be earlier than start date');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Generate a unique ID for the new project
      const newProject = {
        ...formData,
        id: Date.now().toString(),
        // Ensure progress is a number
        progress: parseInt(formData.progress, 10) || 0
      };
      
      console.log('Submitting new project:', newProject);
      
      // Save the project using the API service
      await dataAPI.addProject(newProject);
      
      // Navigate back to projects page
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
        <Button variant="outline" onClick={() => navigate('/projects')}>
          Cancel
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Project Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'on-hold', label: 'On Hold' }
                ]}
              />
            </div>
            
            <div>
              <Input
                label="Progress (%)"
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
            <div className="flex">
              <div className="flex-1">
                <Input
                  type="text"
                  value={teamMember}
                  onChange={(e) => setTeamMember(e.target.value)}
                  placeholder="Add team member"
                  className="mb-0 rounded-r-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTeamMember}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
            
            {formData.team.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.team.map((member, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">{member}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeamMember(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;