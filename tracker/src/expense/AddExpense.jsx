import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    Receipt,
    Briefcase,
    CheckSquare,
    Settings,
    HelpCircle,
    BarChart3,
    Menu,
    X,
    TrendingUp,
    Wallet,
    Calendar
} from 'lucide-react';

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        notes: '',
        paymentMethod: ''
    });

    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('expenses');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const paymentMethods = [
        { value: '', label: 'Select Payment Method' },
        { value: 'cash', label: '💵 Cash' },
        { value: 'credit card', label: '💳 Credit Card' },
        { value: 'debit card', label: '💳 Debit Card' },
        { value: 'upi', label: '📱 UPI' },
        { value: 'net banking', label: '🏦 Net Banking' },
        { value: 'other', label: '💰 Other' }
    ];

    const categories = [
        { value: 'Food & Dining', emoji: '🍽️', color: 'from-orange-500 to-red-500' },
        { value: 'Transportation', emoji: '🚗', color: 'from-blue-500 to-cyan-500' },
        { value: 'Shopping', emoji: '🛍️', color: 'from-pink-500 to-purple-500' },
        { value: 'Entertainment', emoji: '🎬', color: 'from-purple-500 to-indigo-500' },
        { value: 'Bills & Utilities', emoji: '📄', color: 'from-gray-500 to-slate-500' },
        { value: 'Healthcare', emoji: '⚕️', color: 'from-red-500 to-pink-500' },
        { value: 'Education', emoji: '📚', color: 'from-blue-500 to-indigo-500' },
        { value: 'Travel', emoji: '✈️', color: 'from-sky-500 to-blue-500' },
        { value: 'Groceries', emoji: '🛒', color: 'from-green-500 to-emerald-500' },
        { value: 'Other', emoji: '📦', color: 'from-gray-500 to-zinc-500' }
    ];

    const navigationItems = [
        { id: 'home', name: 'Home', icon: Home, path: '/dashboard' },
        { id: 'expenses', name: 'Expenses', icon: Receipt, path: '/add-expense' },
        { id: 'trips', name: 'Trips', icon: Briefcase, path: '/dashboard' },
        { id: 'approvals', name: 'Approvals', icon: CheckSquare, path: '/dashboard' },
        { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
        { id: 'support', name: 'Support', icon: HelpCircle, path: '/dashboard' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.date) newErrors.date = 'Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const expenseData = {
                ...formData,
                amount: parseFloat(formData.amount)
            };
            if (!expenseData.notes) delete expenseData.notes;
            if (!expenseData.paymentMethod) delete expenseData.paymentMethod;

            const response = await fetch('http://localhost:3000/api/v1/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData)
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message || 'Failed to add expense.');
            } else {
                alert('Expense added successfully!');
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Server error. Please try again.');
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
                        <span className="text-white font-bold text-lg">Add Expense</span>
                        <div className="w-10"></div>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10">
                        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                            {/* Left Side - Info Cards */}
                            <div className="flex-1 hidden lg:block space-y-8">
                                <div>
                                    <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
                                        Track Every
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                            Penny Spent
                                        </span>
                                    </h1>
                                    <p className="text-gray-400 text-lg">Stay in control of your finances with smart expense tracking</p>
                                </div>

                                {/* Feature Cards */}
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-emerald-500/30 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                                                <Wallet className="text-emerald-400" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold mb-1">Smart Categorization</h3>
                                                <p className="text-gray-400 text-sm">Organize expenses by categories for better insights</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-teal-500/30 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                                                <TrendingUp className="text-teal-400" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold mb-1">Track Your Growth</h3>
                                                <p className="text-gray-400 text-sm">Monitor spending patterns and save more</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-blue-500/30 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                                <Calendar className="text-blue-400" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold mb-1">Date-wise Records</h3>
                                                <p className="text-gray-400 text-sm">Keep detailed records with timestamps</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="w-full lg:flex-1 lg:max-w-lg">
                                <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                                    <div className="mb-8">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full mb-4">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                            <span className="text-emerald-400 text-sm font-medium">Add New Transaction</span>
                                        </div>
                                        <h2 className="text-4xl font-bold text-white mb-2">New Expense</h2>
                                        <p className="text-gray-400">Fill in the details below to track your spending</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Title Input */}
                                        <div>
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Expense Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="e.g., Grocery Shopping"
                                                className={`w-full px-5 py-3.5 bg-[#0a0a0a]/50 border ${errors.title ? 'border-red-500/50' : 'border-[#2a2a2a]'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
                                            />
                                            {errors.title && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.title}</p>}
                                        </div>

                                        {/* Amount Input */}
                                        <div>
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Amount</label>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    value={formData.amount}
                                                    onChange={handleChange}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    className={`w-full pl-10 pr-5 py-3.5 bg-[#0a0a0a]/50 border ${errors.amount ? 'border-red-500/50' : 'border-[#2a2a2a]'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
                                                />
                                            </div>
                                            {errors.amount && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.amount}</p>}
                                        </div>

                                        {/* Category & Date Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-gray-400 text-sm font-medium mb-2 block">Category</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 bg-[#0a0a0a]/50 border ${errors.category ? 'border-red-500/50' : 'border-[#2a2a2a]'} rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 appearance-none cursor-pointer`}
                                                >
                                                    <option value="">Select</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.value} value={cat.value}>
                                                            {cat.emoji} {cat.value}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.category}</p>}
                                            </div>

                                            <div>
                                                <label className="text-gray-400 text-sm font-medium mb-2 block">Date</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 bg-[#0a0a0a]/50 border ${errors.date ? 'border-red-500/50' : 'border-[#2a2a2a]'} rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 [color-scheme:dark]`}
                                                />
                                                {errors.date && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.date}</p>}
                                            </div>
                                        </div>

                                        {/* Payment Method */}
                                        <div>
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Payment Method (Optional)</label>
                                            <select
                                                name="paymentMethod"
                                                value={formData.paymentMethod}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 bg-[#0a0a0a]/50 border border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 appearance-none cursor-pointer"
                                            >
                                                {paymentMethods.map((method) => (
                                                    <option key={method.value} value={method.value}>
                                                        {method.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <label className="text-gray-400 text-sm font-medium mb-2 block">Notes (Optional)</label>
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                placeholder="Add any additional details..."
                                                rows="3"
                                                className="w-full px-5 py-3.5 bg-[#0a0a0a]/50 border border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 mt-2"
                                        >
                                            Save Expense
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddExpense;
