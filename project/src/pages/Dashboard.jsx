import React, { useEffect, useState } from 'react';
import { FolderOpen, Users, Calendar, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import InternCard from '../components/dashboard/InternCard';
import DeadlineCard from '../components/dashboard/DeadlineCard';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import { dataAPI } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [interns, setInterns] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, internsData, deadlinesData, analyticsData] = await Promise.all([
          dataAPI.getProjects(),
          dataAPI.getInterns(),
          dataAPI.getDeadlines(),
          dataAPI.getAnalytics(),
        ]);
        
        setProjects(projectsData);
        setInterns(internsData);
        setDeadlines(deadlinesData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Projects" 
          value={projects.length} 
          change="12%" 
          changeType="increase" 
          icon={FolderOpen} 
          color="blue" 
        />
        <StatsCard 
          title="Active Interns" 
          value={interns.filter(intern => intern.status === 'active').length} 
          change="5%" 
          changeType="increase" 
          icon={Users} 
          color="green" 
        />
        <StatsCard 
          title="Upcoming Deadlines" 
          value={deadlines.filter(d => d.status === 'pending').length} 
          change="3" 
          changeType="increase" 
          icon={Calendar} 
          color="yellow" 
        />
        <StatsCard 
          title="Monthly Growth" 
          value="24%" 
          change="8%" 
          changeType="increase" 
          icon={TrendingUp} 
          color="blue" 
        />
      </div>
      
      <AnalyticsChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {projects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Interns</h2>
          <div className="space-y-4">
            {interns.slice(0, 3).map(intern => (
              <InternCard key={intern.id} intern={intern} />
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Deadlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deadlines.slice(0, 6).map(deadline => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;