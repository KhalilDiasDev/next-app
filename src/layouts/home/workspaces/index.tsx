import TopbarComponent from "@/components/ui/topbar";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function MyWorkspacesLayout() {
  const [stats, setStats] = useState({
    threatsBlocked: 3560,
    dataBlocked: "1.2 TB",
    maliciousIPs: 128,
    cpuUsage: 35,
    memoryUsage: 72,
    systemStatus: "Secure",
  });
  const [users, setUsers] = useState<any[]>([]);

  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleAddUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
        }),
      });
  
      if (res.ok) {
        setNewUser({ username: '', email: '' });
        await fetchUsers(); // Recarrega lista
      } else {
        console.error('Erro ao adicionar usuário');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
  
      if (res.ok) {
        await fetchUsers(); 
        console.log('Usuário deletado com sucesso');
      } else {
        const errorText = await res.text();
        console.error('Erro ao excluir usuário:', res.status, errorText);
      }
    } catch (error) {
      console.error('Erro no handleDeleteUser:', error);
    }
  };
  


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      
      setUsers(data.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  fetchUsers();
}, []);



  const trafficData = [
    { time: '10:00', threats: 5 },
    { time: '11:00', threats: 9 },
    { time: '12:00', threats: 6 },
    { time: '13:00', threats: 14 },
    { time: '14:00', threats: 8 },
  ];

  const systemIntegration = [
    { system: 'Firewall', status: 'Active' },
    { system: 'SIEM', status: 'Synchronized' },
    { system: 'Endpoint Protection', status: 'Running' },
    { system: 'IDS/IPS', status: 'Monitoring' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 10),
        maliciousIPs: prev.maliciousIPs + Math.floor(Math.random() * 2),
        cpuUsage: Math.floor(Math.random() * 50) + 20,
        memoryUsage: Math.floor(Math.random() * 50) + 50,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TopbarComponent />
      

      <main className="p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white space-y-12">
        <h1 className="text-3xl font-bold mb-6">Cybersecurity Dashboard</h1>

        {/* Estatísticas rápidas */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm">Threats Blocked</div>
            <div className="text-3xl font-bold">{stats.threatsBlocked}</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm">Data Blocked</div>
            <div className="text-3xl font-bold">{stats.dataBlocked}</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm">Malicious IPs Detected</div>
            <div className="text-3xl font-bold">{stats.maliciousIPs}</div>
          </div>
        </div>

{/* Formulário de criação de usuário */}
<section className="mb-8">
  <h2 className="text-xl font-semibold mb-4">Add New User</h2>
  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Username"
      value={newUser.username}
      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      className="p-2 rounded bg-gray-700 text-white"
    />
    <input
      type="email"
      placeholder="Email"
      value={newUser.email}
      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      className="p-2 rounded bg-gray-700 text-white"
    />
    <button
      onClick={handleAddUser}
      className="px-4 py-2 bg-green-500 rounded text-white"
    >
      Add
    </button>
  </div>
</section>

{/* Lista de usuários */}
<section>
  <h2 className="text-xl font-semibold mb-4">Users from Keycloak</h2>
  <div className="grid gap-4 md:grid-cols-2">
    {Array.isArray(users) && users.map((user, idx) => (
      <div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <div className="text-gray-400">Username: {user.username}</div>
        <div className="text-green-400">Email: {user.email}</div>
        <button
  onClick={() => handleDeleteUser(user.id)}
  className="mt-2 px-3 py-1 bg-red-500 rounded text-white"
>
  Delete
</button>

      </div>
    ))}
  </div>
</section>


        {/* Gráfico de uso de sistema */}
        <section>
          <h2 className="text-xl font-semibold mb-4">System Resource Usage</h2>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: 'CPU', usage: stats.cpuUsage },
                { name: 'Memory', usage: stats.memoryUsage },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Sistemas integrados */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Integrated Systems</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {systemIntegration.map((sys, idx) => (
              <div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-gray-400">{sys.system}</div>
                <div className="text-green-400 font-semibold">{sys.status}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Status geral */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overall Security Status</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex items-center justify-between">
            <div>
              <div className="text-gray-400">System Status</div>
              <div className={`text-3xl font-bold ${stats.systemStatus === 'Secure' ? 'text-green-400' : 'text-red-400'}`}>
                {stats.systemStatus}
              </div>
            </div>
            <div className="animate-ping w-4 h-4 bg-green-400 rounded-full"></div>
          </div>
        </section>
      </main>
    </>
  );
}
