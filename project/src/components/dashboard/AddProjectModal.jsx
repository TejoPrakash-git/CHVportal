import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const AddProjectModal = ({ isOpen, onClose, onAddProject }) => {
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

  const handleSubmit = (e) => {
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
    
    // Generate a unique ID for the new project
    const newProject = {
      ...formData,
      id: Date.now().toString(),
      // Ensure progress is a number
      progress: parseInt(formData.progress, 10) || 0
    };
    
    console.log('Submitting new project:', newProject);
    onAddProject(newProject);
    // Don't call onClose() here as it's now handled in the parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Add New Project</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
            
            <div className="grid grid-cols-2 gap-4">
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
                <div className="mt-2 space-y-2">
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
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;