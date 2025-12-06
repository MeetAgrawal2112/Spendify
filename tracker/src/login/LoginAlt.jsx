import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Sparkles, BarChart3 } from 'lucide-react';

const LoginAlt = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Login failed. Please check your credentials.');
                console.error('Login error:', data);
            } else {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

                alert(data.message || 'Login successful!');
                console.log('Login successful:', data);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Network or server error:', err);
            alert('Unable to reach the server. Make sure the backend is running.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
            {/* Subtle background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
                {/* Left Side - Branding & Stats */}
                {/* Mobile Logo */}
                <div className="lg:hidden w-full text-center mb-6">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Spendify</h1>
                    <p className="text-gray-400 mt-2">Welcome back to smart tracking</p>
                </div>

                {/* Desktop Branding & Stats */}
                <div className="flex-1 hidden lg:block space-y-8">
                    <div>
                        <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
                            Welcome Back to
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Spendify
                            </span>
                        </h1>
                        <p className="text-gray-400 text-xl">Continue your journey to financial freedom</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-emerald-500/30 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <Lock className="text-emerald-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Secure Login</h3>
                                    <p className="text-gray-400 text-sm">Your data is protected with bank-level encryption</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-teal-500/30 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <Sparkles className="text-teal-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Smart Features</h3>
                                    <p className="text-gray-400 text-sm">AI-powered insights to help you save more</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]/50 hover:border-blue-500/30 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <BarChart3 className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Detailed Reports</h3>
                                    <p className="text-gray-400 text-sm">Visualize your spending with beautiful charts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:flex-1 lg:max-w-lg">
                    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#2a2a2a]/50 backdrop-blur-xl">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full mb-4">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-400 text-sm font-medium">Secure Login</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">Log In</h2>
                            <p className="text-gray-400">Access your financial dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-gray-400 text-sm font-medium mb-2 block">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-5 py-3.5 bg-[#0a0a0a]/50 border border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-gray-400 text-sm font-medium">Password</label>
                                    <Link to="/forgot-password" className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-3.5 bg-[#0a0a0a]/50 border border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 mt-2"
                            >
                                Log In
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAlt;
