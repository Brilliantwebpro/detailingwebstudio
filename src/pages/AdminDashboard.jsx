import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminAPI, leadsAPI, authAPI } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [dashboardData, leadsData, usersData] = await Promise.all([
        adminAPI.getDashboard(),
        leadsAPI.getAll(),
        adminAPI.getUsers()
      ]);
      setStats(dashboardData.stats);
      setLeads(leadsData.leads || dashboardData.recentLeads || []);
      setUsers(usersData.users || []);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleExport = async () => {
    try {
      const response = await adminAPI.exportLeads();
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await leadsAPI.updateStatus(leadId, newStatus);
      fetchDashboard();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const deleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsAPI.delete(leadId);
        fetchDashboard();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // User Management Functions
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!userForm.name || !userForm.email || !userForm.password) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }
    
    try {
      await adminAPI.createUser(userForm);
      setMessage({ type: 'success', text: 'User created successfully!' });
      setUserForm({ name: '', email: '', password: '', role: 'user' });
      setShowUserModal(false);
      fetchDashboard();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        setMessage({ type: 'success', text: 'User deleted successfully!' });
        fetchDashboard();
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
      }
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await adminAPI.toggleUserStatus(userId);
      setMessage({ type: 'success', text: 'User status updated!' });
      fetchDashboard();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setMessage({ type: 'success', text: 'User role updated!' });
      fetchDashboard();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }
    
    try {
      if (selectedUser) {
        await adminAPI.resetUserPassword(selectedUser.id, passwordForm.newPassword);
        setMessage({ type: 'success', text: 'Password reset successfully!' });
      } else {
        await adminAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
        setMessage({ type: 'success', text: 'Password changed successfully!' });
      }
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
      setSelectedUser(null);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate conversion rates
  const conversionRate = stats?.totalLeads > 0 
    ? Math.round(((stats.won || 0) / stats.totalLeads) * 100) 
    : 0;

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>Admin Dashboard</h1>
            <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage your leads, users, and settings</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={handleExport} className="btn btn-secondary">Export Leads</button>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div style={{ 
            padding: '12px 20px', 
            borderRadius: '12px', 
            marginBottom: '24px',
            background: message.type === 'error' ? 'rgba(255, 108, 140, 0.15)' : 'rgba(122, 231, 188, 0.15)',
            border: `1px solid ${message.type === 'error' ? 'var(--danger)' : 'var(--good)'}`,
            color: message.type === 'error' ? 'var(--danger)' : 'var(--good)'
          }}>
            {message.text}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(59, 169, 255, 0.15), rgba(127, 140, 255, 0.1))' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Total Leads</p>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--accent)' }}>{stats?.totalLeads || 0}</h2>
          </div>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(122, 231, 188, 0.15), rgba(59, 169, 255, 0.1))' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>New Leads</p>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--good)' }}>{stats?.newLeads || 0}</h2>
          </div>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(127, 140, 255, 0.15), rgba(59, 169, 255, 0.1))' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Total Users</p>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--accent-2)' }}>{stats?.totalUsers || 0}</h2>
          </div>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(255, 108, 140, 0.15), rgba(127, 140, 255, 0.1))' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Conversion</p>
            <h2 style={{ fontSize: '2.4rem' }}>{conversionRate}%</h2>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Leads' },
            { id: 'users', label: 'Users' },
            { id: 'settings', label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--accent)' : 'var(--surface)',
                color: activeTab === tab.id ? '#000' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab - Leads */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '12px 18px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', flex: '1', minWidth: '200px' }}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '12px 18px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <h2 style={{ marginBottom: '20px' }}>Leads ({filteredLeads.length})</h2>
            
            {filteredLeads.length === 0 ? (
              <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)' }}>No leads found</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Business</th>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Response</th>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(lead => (
                      <tr key={lead._id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '16px' }}>
                          <strong>{lead.name}</strong>
                          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>{lead.email}</p>
                        </td>
                        <td style={{ padding: '16px' }}>{lead.businessName || '-'}</td>
                        <td style={{ padding: '16px' }}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)', cursor: 'pointer' }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px', maxWidth: '260px' }}>
                          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {lead.goal || lead.services || '-'}
                          </p>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button onClick={() => { setSelectedLead(lead); setShowLeadModal(true); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer' }}>View</button>
                            <button onClick={() => deleteLead(lead._id)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--danger)', background: 'rgba(255, 108, 140, 0.1)', color: 'var(--danger)', cursor: 'pointer' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Lead Details Modal */}
        {showLeadModal && selectedLead && (
          <div className="modal open" onClick={() => setShowLeadModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
              <div className="modal-top">
                <h3>Lead Response</h3>
                <button onClick={() => setShowLeadModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ padding: '24px', display: 'grid', gap: '12px' }}>
                <p><strong>Name:</strong> {selectedLead.name || '-'}</p>
                <p><strong>Business:</strong> {selectedLead.businessName || '-'}</p>
                <p><strong>Email:</strong> {selectedLead.email || '-'}</p>
                <p><strong>Phone:</strong> {selectedLead.phone || '-'}</p>
                <p><strong>Website:</strong> {selectedLead.website || '-'}</p>
                <p><strong>Services Offered:</strong> {selectedLead.services || '-'}</p>
                <p><strong>Preferred Package:</strong> {selectedLead.preferredPackage || selectedLead.preferred_package || '-'}</p>
                <p><strong>Revenue Range:</strong> {selectedLead.revenue || '-'}</p>
                <p><strong>Budget:</strong> {selectedLead.budget || '-'}</p>
                <p><strong>Primary Goal:</strong> {selectedLead.goal || '-'}</p>
                <p><strong>Status:</strong> {selectedLead.status || '-'}</p>
                <p><strong>Source:</strong> {selectedLead.source || '-'}</p>
                <p><strong>Created:</strong> {new Date(selectedLead.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>User Management</h2>
              <button onClick={() => setShowUserModal(true)} className="btn btn-primary">+ Add User</button>
            </div>

            {/* Users Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)' }}>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Role</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Created</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: 'var(--muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '16px' }}><strong>{user.name}</strong></td>
                      <td style={{ padding: '16px' }}>{user.email}</td>
                      <td style={{ padding: '16px' }}>
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)', cursor: 'pointer' }}
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '999px', fontSize: '0.85rem', background: user.isActive ? 'rgba(122, 231, 188, 0.2)' : 'rgba(255, 108, 140, 0.2)', color: user.isActive ? 'var(--good)' : 'var(--danger)' }}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button onClick={() => { setSelectedUser(user); setShowPasswordModal(true); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>Reset PW</button>
                          <button onClick={() => handleToggleUserStatus(user.id)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>{user.isActive ? 'Deactivate' : 'Activate'}</button>
                          <button onClick={() => handleDeleteUser(user.id)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--danger)', background: 'rgba(255, 108, 140, 0.1)', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>Settings</h2>
            
            <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
              {/* Change Password */}
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ marginBottom: '8px' }}>Change Your Password</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Update your account password</p>
                <button onClick={() => { setSelectedUser(null); setShowPasswordModal(true); }} className="btn btn-primary">Change Password</button>
              </div>

              {/* Account Info */}
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ marginBottom: '8px' }}>Account Information</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Your admin account details</p>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                  <input type="email" value="admin@detailingwebstudio.com" disabled style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--muted)', opacity: 0.7 }} />
                </div>
              </div>

              {/* Danger Zone */}
              <div className="card" style={{ padding: '32px', border: '1px solid var(--danger)', background: 'rgba(255, 108, 140, 0.05)' }}>
                <h3 style={{ marginBottom: '8px', color: 'var(--danger)' }}>Danger Zone</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Irreversible actions</p>
                <button className="btn btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Delete All Leads</button>
              </div>
            </div>
          </div>
        )}

        {/* Create User Modal */}
        {showUserModal && (
          <div className="modal open" onClick={() => setShowUserModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
              <div className="modal-top">
                <h3>Create New User</h3>
                <button onClick={() => setShowUserModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ padding: '24px' }}>
                <form onSubmit={handleCreateUser}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Name</label>
                    <input type="text" value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                    <input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                    <input type="password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required minLength="6" />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Role</label>
                    <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create User</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="modal open" onClick={() => setShowPasswordModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <div className="modal-top">
                <h3>{selectedUser ? `Reset Password for ${selectedUser.name}` : 'Change Your Password'}</h3>
                <button onClick={() => setShowPasswordModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ padding: '24px' }}>
                <form onSubmit={handleResetPassword}>
                  {!selectedUser && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Current Password</label>
                      <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required />
                    </div>
                  )}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>New Password</label>
                    <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required minLength="6" />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Confirm New Password</label>
                    <input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{selectedUser ? 'Reset Password' : 'Change Password'}</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
