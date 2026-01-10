
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../constants.ts';
import { AppView } from '../types.ts';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  setView: (view: AppView) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLoginSuccess();
    } else {
      setError('Invalid officer credentials. Please check and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#003366] p-8 text-center">
          <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-[#003366]">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Officer Portal</h2>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-pulse">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Officer Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@tnpsc_frnd.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/30 outline-none transition-all font-medium text-slate-700"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/30 outline-none transition-all font-medium text-slate-700"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#004080] transition-all shadow-xl active:scale-95"
          >
            <LogIn size={20} /> Login as Officer
          </button>

          <button
            type="button"
            onClick={() => setView('dashboard')}
            className="w-full flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:text-[#003366] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
