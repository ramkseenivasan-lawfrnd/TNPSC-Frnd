
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, ExternalLink, ShieldCheck, LogOut, Info, Edit3, Save, X, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';
import { AdminNotification } from '../types.ts';
import { DEFAULT_NOTIFICATIONS } from '../constants.ts';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('tnpsc_admin_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(DEFAULT_NOTIFICATIONS);
    }
  }, []);

  const saveNotifications = (updated: AdminNotification[]) => {
    setNotifications(updated);
    localStorage.setItem('tnpsc_admin_notifications', JSON.stringify(updated));
    localStorage.setItem('tnpsc_notification_update_ts', Date.now().toString());
  };

  const formatDateForDisplay = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setApplyLink('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsActive(true);
    setEditingId(null);
    setShowForm(false);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const displayDate = formatDateForDisplay(date);

    if (editingId) {
      const updated = notifications.map(n => 
        n.id === editingId 
          ? { ...n, title, description, applyLink, date: displayDate, isActive } 
          : n
      );
      saveNotifications(updated);
    } else {
      const newNode: AdminNotification = {
        id: Date.now().toString(),
        title,
        description,
        applyLink,
        date: displayDate,
        isActive: true
      };
      saveNotifications([newNode, ...notifications]);
    }
    resetForm();
  };

  const startEdit = (n: AdminNotification) => {
    setTitle(n.title);
    setDescription(n.description);
    setApplyLink(n.applyLink);
    setIsActive(n.isActive);
    
    // Try to parse the existing date string back into YYYY-MM-DD for the input
    try {
      const parsedDate = new Date(n.date);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate.toISOString().split('T')[0]);
      } else {
        setDate(new Date().toISOString().split('T')[0]);
      }
    } catch (e) {
      setDate(new Date().toISOString().split('T')[0]);
    }

    setEditingId(n.id);
    setShowForm(true);
  };

  const toggleStatus = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isActive: !n.isActive } : n
    );
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    if (window.confirm('Delete this official update?')) {
      saveNotifications(notifications.filter(n => n.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-[#003366]"><ShieldCheck size={32} /></div>
          <div>
            <h2 className="text-xl font-black text-[#003366] uppercase tracking-tight">Officer Dashboard</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Notification Management</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>

      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-[#003366] text-white p-6 rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-[#004080] transition-all group"
        >
          <div className="bg-[#FFD700] p-1 rounded-lg group-hover:rotate-90 transition-transform"><Plus size={20} className="text-[#003366]" /></div>
          Create New Official Exam Update
        </button>
      ) : (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-[#003366] flex items-center gap-2">
              {editingId ? <Edit3 className="text-[#FFD700]" /> : <Plus className="text-[#FFD700]" />}
              {editingId ? 'Edit Notification' : 'New Notification'}
            </h3>
            <button onClick={resetForm} className="p-2 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exam Title</label>
                <input 
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Group IV Hall Ticket 2025"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Apply/Info Link</label>
                <input 
                  value={applyLink} onChange={(e) => setApplyLink(e.target.value)}
                  placeholder="https://tnpsc.gov.in/..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
                    required
                  />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 h-[60px]">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Status:</span>
                  <button 
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    {isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Update Description</label>
              <textarea 
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about release dates, requirements etc."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 h-32 resize-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-[#003366] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#004080] flex items-center justify-center gap-2">
                <Save size={20} /> {editingId ? 'Update Notification' : 'Publish to All Users'}
              </button>
              <button type="button" onClick={resetForm} className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Active Notifications ({notifications.length})</h3>
        {notifications.map((n) => (
          <div key={n.id} className={`bg-white p-6 rounded-[2rem] border transition-all shadow-sm flex items-start justify-between group ${n.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl shadow-inner ${n.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                <Bell size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-black text-[#003366]">{n.title}</h4>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${n.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {n.isActive ? 'LIVE' : 'INACTIVE'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 max-w-xl leading-relaxed mb-3">{n.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1.5">
                    <Calendar size={12} /> {n.date}
                  </span>
                  <a href={n.applyLink} target="_blank" className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1 hover:underline">
                    Link <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => startEdit(n)}
                className="p-3 text-slate-400 hover:text-[#003366] hover:bg-blue-50 rounded-xl transition-all"
                title="Edit"
              >
                <Edit3 size={20} />
              </button>
              <button 
                onClick={() => toggleStatus(n.id)}
                className={`p-3 rounded-xl transition-all ${n.isActive ? 'text-green-500 hover:bg-green-50' : 'text-slate-300 hover:bg-slate-50'}`}
                title={n.isActive ? "Deactivate" : "Activate"}
              >
                {n.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </button>
              <button 
                onClick={() => deleteNotification(n.id)}
                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
            <Info className="mx-auto text-slate-300 mb-4" size={40} />
            <p className="text-slate-400 font-bold">No active notifications. Create one above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
