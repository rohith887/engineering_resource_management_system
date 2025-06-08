import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ENGINEER: 'engineer'
};

function App() {
  const [user, setUser] = useState({ role: ROLES.ENGINEER, name: 'Guest' });
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:3000/api/engineers').then(res => setEngineers(res.data));
    axios.get('http://localhost:3000/api/projects').then(res => setProjects(res.data));
    axios.get('http://localhost:3000/api/assignments').then(res => setAssignments(res.data));
  }, []);

  const getCapacityUtilization = (engineer) => {
    return ((engineer.assignedHours / engineer.capacity) * 100).toFixed(2);
  };

  const canManage = (role) => [ROLES.ADMIN, ROLES.MANAGER].includes(role);
  const canViewDashboard = (role) => Object.values(ROLES).includes(role);

  const handleAssign = async (engineerId, projectId, hours) => {
    const assignment = { engineerId, projectId, hours };
    const res = await axios.post('http://localhost:3001/api/assignments', assignment);
    setAssignments([...assignments, res.data]);
    setEngineers(engineers.map(e => 
      e._id === engineerId ? { ...e, assignedHours: e.assignedHours + hours } : e
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <RoleSwitcher user={user} setUser={setUser} />
      {canViewDashboard(user.role) ? (
        <Dashboard engineers={engineers} projects={projects} getCapacityUtilization={getCapacityUtilization} />
      ) : (
        <div className="text-red-500">Access Denied</div>
      )}
      {canManage(user.role) && (
        <AssignmentManager engineers={engineers} projects={projects} handleAssign={handleAssign} />
      )}
    </div>
  );
}

function RoleSwitcher({ user, setUser }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg">Switch Role (Demo):</h3>
      <select 
        className="border p-2"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value={ROLES.ENGINEER}>Engineer</option>
        <option value={ROLES.MANAGER}>Manager</option>
        <option value={ROLES.ADMIN}>Admin</option>
      </select>
    </div>
  );
}

function Dashboard({ engineers, projects, getCapacityUtilization }) {
  const chartData = {
    labels: engineers.map(e => e.name),
    datasets: [
      {
        label: 'Capacity Utilization (%)',
        data: engineers.map(e => getCapacityUtilization(e)),
        backgroundColor: ['#3b82f6', '#10b981'],
        borderColor: ['#1d4ed8', '#059669'],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Engineer Capacity Utilization'
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resource Management Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Capacity Utilization</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Engineers</h2>
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Skills</th>
                <th>Capacity Utilization</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map(engineer => (
                <tr key={engineer._id}>
                  <td>{engineer.name}</td>
                  <td>{engineer.skills.join(', ')}</td>
                  <td>{getCapacityUtilization(engineer)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Projects</h2>
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Required Skills</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.status}</td>
                  <td>{project.requiredSkills.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssignmentManager({ engineers, projects, handleAssign }) {
  const [engineerId, setEngineerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [hours, setHours] = useState('');

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Assign Engineers</h2>
      <div className="bg-white p-4 rounded shadow">
        <select 
          className="border p-2 mr-2"
          value={engineerId}
          onChange={(e) => setEngineerId(e.target.value)}
        >
          <option value="">Select Engineer</option>
          {engineers.map(e => (
            <option key={e._id} value={e._id}>{e.name}</option>
          ))}
        </select>
        <select 
          className="border p-2 mr-2"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Hours" 
          className="border p-2 mr-2"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => handleAssign(engineerId, projectId, parseInt(hours))}
        >
          Assign
        </button>
      </div>
    </div>
  );
}

export default App;