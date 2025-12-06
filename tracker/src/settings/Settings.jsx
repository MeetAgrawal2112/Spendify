import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    Smartphone,
    ArrowLeft,
    AlertTriangle,
    Home,
    Receipt,
    Briefcase,
    CheckSquare,
    Settings as SettingsIcon,
    HelpCircle,
    BarChart3,
    Menu,
    X,
    User,
    Bell,
    Shield
} from 'lucide-react';
import axios from 'axios';

const Settings = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLogoutAllModal, setShowLogoutAllModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('settings');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'home', name: 'Home', icon: Home, path: '/dashboard' },
        { id: 'expenses', name: 'Expenses', icon: Receipt, path: '/add-expense' },
        { id: 'trips', name: 'Trips', icon: Briefcase, path: '/dashboard' },
        { id: 'approvals', name: 'Approvals', icon: CheckSquare, path: '/dashboard' },
        { id: 'settings', name: 'Settings', icon: SettingsIcon, path: '/settings' },
        { id: 'support', name: 'Support', icon: HelpCircle, path: '/dashboard' }
    ];

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:3000/api/v1/users/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutAllDevices = async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:3000/api/v1/users/logout-all", {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout all devices error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

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

            {/* Main Content */}
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
                        <span className="text-white font-bold text-lg">Settings</span>
                        <div className="w-10"></div>
                    </div>

                    <div className="flex-1 p-6 sm:p-8 lg:p-12 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full mb-4">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-emerald-400 text-sm font-medium">Account Management</span>
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                                <p className="text-gray-400">Manage your account and security preferences</p>
                            </div>

                            {/* Settings Sections */}
                            <div className="space-y-6">
                                {/* Account Security Section */}
                                <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
                                            <Shield className="text-emerald-400" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Security & Sessions</h2>
                                            <p className="text-gray-400 text-sm">Manage your login sessions</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Logout Button */}
                                        <button
                                            onClick={() => setShowLogoutModal(true)}
                                            className="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/80 border border-[#2a2a2a] hover:border-red-500/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform duration-300">
                                                    <LogOut size={20} className="text-red-400" />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-white font-semibold">Logout</h3>
                                                    <p className="text-gray-400 text-sm">Sign out from this device</p>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Logout All Devices Button */}
                                        <button
                                            onClick={() => setShowLogoutAllModal(true)}
                                            className="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/80 border border-[#2a2a2a] hover:border-orange-500/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                                                    <Smartphone size={20} className="text-orange-400" />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-white font-semibold">Logout All Devices</h3>
                                                    <p className="text-gray-400 text-sm">Sign out from all devices</p>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Section */}
                                <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                                            <User className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                                            <p className="text-gray-400 text-sm">Your account details</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-5 rounded-2xl bg-[#0a0a0a]/50 border border-[#2a2a2a]">
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Email</label>
                                            <p className="text-white">janice.chandler@example.com</p>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-[#0a0a0a]/50 border border-[#2a2a2a]">
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Account Type</label>
                                            <p className="text-white">Premium Account</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Notifications Section */}
                                <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                                            <Bell className="text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Notifications</h2>
                                            <p className="text-gray-400 text-sm">Manage your notification preferences</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a]/50 border border-[#2a2a2a]">
                                            <div>
                                                <h3 className="text-white font-medium">Email Notifications</h3>
                                                <p className="text-gray-400 text-sm">Receive updates via email</p>
                                            </div>
                                            <div className="w-12 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a]/50 border border-[#2a2a2a]">
                                            <div>
                                                <h3 className="text-white font-medium">Expense Alerts</h3>
                                                <p className="text-gray-400 text-sm">Get notified about expenses</p>
                                            </div>
                                            <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-8 max-w-md w-full border border-[#2a2a2a]/50 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
                                <AlertTriangle size={28} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Logout</h3>
                                <p className="text-gray-400 text-sm">Are you sure?</p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-8">
                            You will be signed out from this device. You can sign back in anytime.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                disabled={isLoading}
                                className="flex-1 py-3 px-6 rounded-xl bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/80 text-white font-medium transition-all border border-[#2a2a2a]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                            >
                                {isLoading ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout All Devices Modal */}
            {showLogoutAllModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-8 max-w-md w-full border border-[#2a2a2a]/50 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-500/30">
                                <AlertTriangle size={28} className="text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Logout All Devices</h3>
                                <p className="text-gray-400 text-sm">This is a security action</p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-8">
                            You will be signed out from <strong className="text-white">all devices</strong> including this one. This is useful if you think your account has been compromised.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutAllModal(false)}
                                disabled={isLoading}
                                className="flex-1 py-3 px-6 rounded-xl bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/80 text-white font-medium transition-all border border-[#2a2a2a]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutAllDevices}
                                disabled={isLoading}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                            >
                                {isLoading ? 'Logging out...' : 'Logout All'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
