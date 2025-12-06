import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Receipt,
  Briefcase,
  CheckSquare,
  Settings,
  HelpCircle,
  Plus,
  FileText,
  BarChart3,
  MapPin,
  Clock,
  Plane,
  ShoppingBag,
  DollarSign,
  Menu,
  X,
  TrendingUp,
  Wallet,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pendingTasks = [
    { id: 1, name: 'Pending Approvals', count: 8, icon: Clock },
    { id: 2, name: 'New Trips Registered', count: 1, icon: Plane },
    { id: 3, name: 'Uninvoiced Expenses', count: 4, icon: FileText },
    { id: 4, name: 'Upcoming Expenses', count: 0, icon: ShoppingBag },
    { id: 5, name: 'Unreported Advances', amount: '₹0.00', icon: DollarSign }
  ];

  const recentExpenses = [
    { id: 1, subject: 'Office Supplies', employee: 'John Smith', team: 'Marketing', teamColor: 'blue', amount: '₹150.00' },
    { id: 2, subject: 'Business Lunch', employee: 'Sarah Johnson', team: 'Sales', teamColor: 'pink', amount: '₹75.50' },
    { id: 3, subject: 'Travel Expenses', employee: 'Mike Brown', team: 'Operations', teamColor: 'orange', amount: '₹450.25' },
    { id: 4, subject: 'Client Dinner', employee: 'Jennifer Lee', team: 'Marketing', teamColor: 'blue', amount: '₹120.00' },
    { id: 5, subject: 'Hotel', employee: 'David Wilson', team: 'Finance', teamColor: 'emerald', amount: '₹275.75' }
  ];

  const quickActions = [
    { id: 1, name: 'New expense', icon: Plus, path: '/add-expense' },
    { id: 2, name: 'Add receipt', icon: Receipt, path: '/add-expense' },
    { id: 3, name: 'Create report', icon: FileText, path: '/dashboard' },
    { id: 4, name: 'Create trip', icon: MapPin, path: '/dashboard' }
  ];

  const teamSpendingData = [
    { month: 'Jan', value: 60 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 70 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 40 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 90 }
  ];

  const dayToDayData = [
    { category: 'Accommodation', value: 70 },
    { category: 'Clothing', value: 30 },
    { category: 'Services', value: 95 },
    { category: 'Food', value: 100 },
    { category: 'Fuel', value: 85 }
  ];

  const navigationItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/dashboard' },
    { id: 'expenses', name: 'Expenses', icon: Receipt, path: '/add-expense' },
    { id: 'trips', name: 'Trips', icon: Briefcase, path: '/dashboard' },
    { id: 'approvals', name: 'Approvals', icon: CheckSquare, path: '/dashboard' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
    { id: 'support', name: 'Support', icon: HelpCircle, path: '/dashboard' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d]/80 backdrop-blur-xl border-r border-[#2a2a2a]/50 transition-transform duration-300 ease-in-out lg:block`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-10 p-3 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-[#2a2a2a]/50">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-500/20 ring-2 ring-emerald-500/10">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Janice Chandler</h3>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    navigate(item.path);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logo */}
          <div className="mt-12 flex items-center gap-2 opacity-80">
            <BarChart3 className="text-emerald-400" size={24} />
            <span className="text-white font-bold text-xl">
              Spendify
            </span>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Dashboard */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen flex flex-col relative">
          {/* Subtle background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Mobile Header */}
          <div className="lg:hidden p-4 flex items-center justify-between border-b border-[#2a2a2a]/50 bg-[#0d0d0d]/80 backdrop-blur-xl sticky top-0 z-30">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-white font-bold text-lg">Dashboard</span>
            <div className="w-10"></div>
          </div>

          <div className="flex-1 p-6 lg:p-10 relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">Welcome Back</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Track and manage your expenses efficiently</p>
            </div>

            {/* Pending Tasks */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30">
                  <Clock className="text-emerald-400" size={20} />
                </div>
                <h2 className="text-white text-lg font-semibold">Pending Tasks</h2>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-6 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                <div className="space-y-3">
                  {pendingTasks.map((task) => {
                    const Icon = task.icon;
                    return (
                      <div key={task.id} className="flex items-center justify-between bg-[#0a0a0a]/50 rounded-xl px-5 py-4 hover:bg-[#0a0a0a]/80 transition-all cursor-pointer border border-[#2a2a2a]">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                            <Icon size={18} className="text-emerald-400" />
                          </div>
                          <span className="text-gray-300 text-sm font-medium">{task.name}</span>
                        </div>
                        <span className="text-white font-semibold text-sm">{task.count ?? task.amount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Quick Access */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <TrendingUp className="text-blue-400" size={20} />
                </div>
                <h2 className="text-white text-lg font-semibold">Quick Actions</h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const colors = [
                    'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
                    'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
                    'from-purple-500/20 to-pink-500/20 border-purple-500/30',
                    'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
                  ];
                  return (
                    <button
                      key={action.id}
                      onClick={() => navigate(action.path)}
                      className="p-5 rounded-2xl border bg-gradient-to-br from-[#1a1a1a] to-[#151515] hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center gap-3 border-[#2a2a2a] hover:border-emerald-500/30"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${colors[index]}`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-white text-sm font-medium text-center">{action.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Recent Expenses */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                  <Wallet className="text-purple-400" size={20} />
                </div>
                <h2 className="text-white text-lg font-semibold">Recent Expenses</h2>
              </div>

              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-[#0a0a0a]/50">
                      <tr className="border-b border-[#2a2a2a]">
                        <th className="text-left text-gray-400 text-xs font-medium px-6 py-4 uppercase tracking-wider">Subject</th>
                        <th className="text-left text-gray-400 text-xs font-medium px-6 py-4 uppercase tracking-wider">Employee</th>
                        <th className="text-left text-gray-400 text-xs font-medium px-6 py-4 uppercase tracking-wider">Team</th>
                        <th className="text-right text-gray-400 text-xs font-medium px-6 py-4 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentExpenses.map((expense) => (
                        <tr key={expense.id} className="border-b border-[#2a2a2a]/30 hover:bg-[#0a0a0a]/50 transition-all">
                          <td className="px-6 py-4 text-gray-200 text-sm font-medium">{expense.subject}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{expense.employee}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${expense.teamColor === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : ''
                              } ${expense.teamColor === 'pink' ? 'bg-pink-500/10 text-pink-400 border-pink-500/30' : ''
                              } ${expense.teamColor === 'orange' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : ''
                              } ${expense.teamColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : ''
                              }`}>
                              {expense.team}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white font-semibold text-sm text-right">{expense.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Monthly Report */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
                  <BarChart3 className="text-teal-400" size={20} />
                </div>
                <h2 className="text-white text-lg font-semibold">Monthly Report</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Spending */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                  <h3 className="text-gray-300 text-sm font-semibold mb-6 flex items-center gap-2">
                    <Users size={16} className="text-emerald-400" />
                    Team Spending Trend
                  </h3>
                  <div className="flex items-end justify-between h-48 gap-2 sm:gap-3">
                    {teamSpendingData.map((x, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-[#0a0a0a]/50 rounded-t-xl relative h-full border border-[#2a2a2a]">
                          <div className={`absolute bottom-0 w-full rounded-t-xl transition-all ${i === 6 ? 'bg-gradient-to-t from-emerald-600 to-teal-500' : 'bg-gradient-to-t from-emerald-600/60 to-teal-500/60'
                            }`} style={{ height: `${x.value}%` }} />
                        </div>
                        <span className="text-gray-500 text-xs font-medium">{x.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day-to-Day Expenses */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                  <h3 className="text-gray-300 text-sm font-semibold mb-6 flex items-center gap-2">
                    <ShoppingBag size={16} className="text-purple-400" />
                    Day-to-Day Expenses
                  </h3>
                  <div className="flex items-end justify-between h-48 gap-2 sm:gap-3">
                    {dayToDayData.map((x, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-[#0a0a0a]/50 rounded-t-xl relative h-full border border-[#2a2a2a]">
                          <div className="absolute bottom-0 w-full rounded-t-xl bg-gradient-to-t from-purple-600 to-purple-400 transition-all" style={{ height: `${x.value}%` }} />
                        </div>
                        <span className="text-gray-500 text-xs font-medium truncate w-full text-center">{x.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
