import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls (mocked)
export const authAPI = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@company.com' && password === 'admin123') {
          resolve({
            user: {
              id: '1',
              email: 'admin@company.com',
              name: 'Admin User',
              role: 'admin',
            },
            token: 'mock-jwt-token',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  logout: async () => {
    localStorage.removeItem('authToken');
  },
};

// Data API calls (mocked)
export const dataAPI = {
  getProjects: async () => {
    try {
      const savedProjects = localStorage.getItem('projects');

      if (!savedProjects) {
        console.log('API: Initializing projects in localStorage');
        localStorage.setItem('projects', JSON.stringify(mockProjects));
        return mockProjects;
      }

      console.log('API: Retrieved projects from localStorage');
      return JSON.parse(savedProjects);
    } catch (error) {
      console.error('API: Error getting projects', error);
      return mockProjects;
    }
  },

  addProject: async (project) => {
    try {
      console.log('API: Adding project to localStorage', project);

      if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(mockProjects));
      }

      const savedProjects = localStorage.getItem('projects');
      const projects = savedProjects ? JSON.parse(savedProjects) : mockProjects;

      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));
      console.log('API: Project added successfully');

      return project;
    } catch (error) {
      console.error('API: Error adding project', error);
      throw error;
    }
  },

  getInterns: async () => {
    return mockInterns;
  },

  getDeadlines: async () => {
    return mockDeadlines;
  },

  getAnalytics: async () => {
    return mockAnalytics;
  },
};

// ----------------- Mock Data -----------------

const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with React and Node.js',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application using React Native',
    status: 'active',
    progress: 45,
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    team: ['Sarah Wilson', 'Tom Brown'],
  },
  {
    id: '3',
    name: 'AI Dashboard',
    description: 'Analytics dashboard with machine learning insights',
    status: 'completed',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-01-30',
    team: ['Alice Cooper', 'Bob Lee'],
  },
];

const mockInterns = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    email: 'alex@company.com',
    position: 'Frontend Developer Intern',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    status: 'active',
    projects: ['1', '2'],
  },
  {
    id: '2',
    name: 'Emma Thompson',
    email: 'emma@company.com',
    position: 'Backend Developer Intern',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    status: 'active',
    projects: ['1'],
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david@company.com',
    position: 'Data Science Intern',
    startDate: '2023-10-01',
    endDate: '2024-01-30',
    status: 'completed',
    projects: ['3'],
  },
];

const mockDeadlines = [
  {
    id: '1',
    title: 'Frontend MVP Release',
    description: 'Deploy the first version of the e-commerce frontend',
    dueDate: '2024-03-15',
    priority: 'high',
    projectId: '1',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Mobile App Beta',
    description: 'Release beta version for internal testing',
    dueDate: '2024-04-20',
    priority: 'medium',
    projectId: '2',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Final Documentation',
    description: 'Complete project documentation and handover',
    dueDate: '2024-02-28',
    priority: 'low',
    projectId: '3',
    status: 'overdue',
  },
];

const mockAnalytics = {
  projects: {
    total: 3,
    active: 2,
    completed: 1,
  },
  interns: {
    total: 3,
    active: 2,
    completed: 1,
  },
  deadlines: {
    upcoming: 2,
    overdue: 1,
  },
};

export default api;
