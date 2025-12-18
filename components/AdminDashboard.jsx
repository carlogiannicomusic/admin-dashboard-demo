import React, { useState } from 'react';
import { Calendar, Users, GraduationCap, UserCog, Plus, Search, Filter, Edit, Trash2, Mail, Clock, MapPin, Bell, Settings, BarChart3, BookOpen, Award, X, LogOut } from 'lucide-react';
import { useAuth } from './auth/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showClassModal, setShowClassModal] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');

  // Sample data
  const stats = [
    { icon: Users, label: 'Total Users', value: '248', change: '+12%', color: '#4db8d3' }, // DR Blue
    { icon: GraduationCap, label: 'Students', value: '186', change: '+8%', color: '#f39a76' }, // DR Peach
    { icon: UserCog, label: 'Teachers', value: '42', change: '+3%', color: '#d384d2' }, // DR Purple
    { icon: BookOpen, label: 'Active Classes', value: '67', change: '+15%', color: '#22b573' } // DR Green
  ];

  const users = [
    { id: 1, name: 'Sofia Martinez', role: 'Student', email: 'sofia.m@drmi.edu', status: 'Active', courses: 4, lastActive: '2 hours ago' },
    { id: 2, name: 'Dr. Alessandro Rossi', role: 'Teacher', email: 'a.rossi@drmi.edu', status: 'Active', courses: 8, lastActive: '1 hour ago' },
    { id: 3, name: 'Emma Thompson', role: 'Student', email: 'emma.t@drmi.edu', status: 'Active', courses: 3, lastActive: '5 hours ago' },
    { id: 4, name: 'Prof. Marco Bellini', role: 'Teacher', email: 'm.bellini@drmi.edu', status: 'Active', courses: 6, lastActive: '30 min ago' },
    { id: 5, name: 'Lucas Chen', role: 'Admin', email: 'l.chen@drmi.edu', status: 'Active', courses: 0, lastActive: 'Just now' },
  ];

  const upcomingClasses = [
    { id: 1, title: 'Renaissance Counterpoint', teacher: 'Dr. Rossi', time: '09:00 AM', duration: '90 min', students: 24, room: 'Hall A' },
    { id: 2, title: 'Baroque Performance', teacher: 'Prof. Bellini', time: '11:00 AM', duration: '120 min', students: 18, room: 'Studio 2' },
    { id: 3, title: 'Medieval Theory', teacher: 'Dr. Rossi', time: '02:00 PM', duration: '60 min', students: 15, room: 'Hall B' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const classesOnDate = (day) => {
    return day === 18 ? 3 : day === 19 ? 2 : day === 20 ? 1 : 0;
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Proxima Nova", "Helvetica Neue", "Avenir", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header - Following Digital Renaissance brand guidelines */}
      <header className="bg-white border-b border-black/10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo following brand guidelines */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <span className="text-[#F2EC62] font-extrabold text-lg">DR</span>
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-black tracking-tight uppercase leading-tight">
                    Digital Renaissance
                  </h1>
                  <p className="text-xs font-semibold text-black/60 uppercase tracking-wide">Admin Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 hover:bg-black/5 transition-colors rounded">
                <Bell className="w-5 h-5 text-black" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#F2EC62] rounded-full"></span>
              </button>
              <button className="p-2.5 hover:bg-black/5 transition-colors rounded">
                <Settings className="w-5 h-5 text-black" />
              </button>
              <div className="flex items-center gap-3 pl-4 ml-2 border-l border-black/10">
                <div className="text-right">
                  <p className="text-sm font-bold text-black">{user?.name || 'Admin User'}</p>
                  <p className="text-xs font-semibold text-black/60">{user?.role || 'Administrator'}</p>
                </div>
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2EC62] font-bold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'AU'}
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2.5 hover:bg-red-50 hover:text-red-600 transition-colors rounded ml-2"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Monochromatic black design following brand */}
        <aside className="w-64 bg-black min-h-screen p-6">
          <nav className="space-y-1.5">
            {[
              { icon: Calendar, label: 'Calendar & Classes', id: 'calendar' },
              { icon: Users, label: 'User Management', id: 'users' },
              { icon: BarChart3, label: 'Analytics', id: 'analytics' },
              { icon: Award, label: 'Certifications', id: 'certs' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all text-sm font-bold uppercase tracking-wide ${
                  activeTab === item.id
                    ? 'bg-[#F2EC62] text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content - Following grid system and brand guidelines */}
        <main className="flex-1 p-8 bg-white">
          {/* Stats Overview - Using secondary palette colors */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 relative overflow-hidden group transition-all"
                style={{ backgroundColor: stat.color }}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-black/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-xs font-extrabold text-black bg-white/90 px-2.5 py-1 uppercase">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-4xl font-extrabold text-black mb-2">{stat.value}</h3>
                  <p className="text-sm text-black font-bold uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'calendar' && (
            <div className="grid grid-cols-3 gap-6">
              {/* Calendar - Following monochromatic principle */}
              <div className="col-span-2 bg-white border border-black/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => setShowClassModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#F2EC62] hover:text-black transition-all font-bold uppercase text-sm tracking-wide"
                  >
                    <Plus className="w-4 h-4" />
                    Create Class
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center font-bold text-black/60 text-xs uppercase tracking-wider py-3">
                      {day}
                    </div>
                  ))}

                  {[...Array(startingDayOfWeek)].map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square"></div>
                  ))}

                  {[...Array(daysInMonth)].map((_, idx) => {
                    const day = idx + 1;
                    const hasClasses = classesOnDate(day);
                    const isToday = day === 18;

                    return (
                      <div
                        key={day}
                        className={`aspect-square p-3 cursor-pointer transition-all ${
                          isToday
                            ? 'bg-[#F2EC62] text-black font-extrabold'
                            : hasClasses
                            ? 'bg-black/5 hover:bg-black/10'
                            : 'hover:bg-black/5'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <span className={`text-base font-semibold ${isToday ? 'text-black' : 'text-black/80'}`}>
                            {day}
                          </span>
                          {hasClasses > 0 && (
                            <div className="mt-auto">
                              <span className={`text-xs ${isToday ? 'text-black' : 'text-black/60'} font-bold`}>
                                {hasClasses} class{hasClasses > 1 ? 'es' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Today's Classes - Monochromatic colored background */}
              <div className="bg-[#4db8d3] p-6">
                <h3 className="text-xl font-extrabold text-black mb-4 uppercase tracking-tight">Today's Schedule</h3>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-extrabold text-black text-sm leading-tight uppercase">{cls.title}</h4>
                        <button className="text-black/60 hover:text-black">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1.5 text-xs text-black/80 font-semibold">
                        <div className="flex items-center gap-2">
                          <UserCog className="w-3.5 h-3.5" />
                          <span>{cls.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{cls.time} ({cls.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{cls.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>{cls.students} students</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white border border-black/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">User Management</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2.5 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-black/10 hover:bg-black/5 transition-all text-sm font-bold uppercase">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white hover:bg-[#F2EC62] hover:text-black transition-all font-bold uppercase text-sm">
                    <Plus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Name</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Role</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Email</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Courses</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Last Active</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-4 text-xs font-extrabold text-black uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={user.id} className={`border-b border-black/5 hover:bg-black/[0.02] transition-colors`}>
                        <td className="py-4 px-4">
                          <input type="checkbox" className="w-4 h-4" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2EC62] font-bold text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-bold text-black text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 bg-black/5 text-xs font-bold uppercase">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-black/60 text-sm font-semibold">{user.email}</td>
                        <td className="py-4 px-4 text-black text-sm font-bold">{user.courses}</td>
                        <td className="py-4 px-4 text-black/60 text-sm font-semibold">{user.lastActive}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#22b573] text-xs font-bold uppercase text-black">
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-black/5 transition-colors rounded">
                              <Edit className="w-4 h-4 text-black/60" />
                            </button>
                            <button className="p-2 hover:bg-black/5 transition-colors rounded">
                              <Trash2 className="w-4 h-4 text-black/60" />
                            </button>
                            <button className="p-2 hover:bg-black/5 transition-colors rounded">
                              <Mail className="w-4 h-4 text-black/60" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#F2EC62] px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-black uppercase tracking-tight">Create New Class</h3>
              <button
                onClick={() => setShowClassModal(false)}
                className="p-2 hover:bg-black/10 transition-colors rounded"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Class Title</label>
                <input
                  type="text"
                  placeholder="e.g., Renaissance Counterpoint"
                  className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Teacher</label>
                  <select className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold">
                    <option>Select teacher...</option>
                    <option>Dr. Alessandro Rossi</option>
                    <option>Prof. Marco Bellini</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Room</label>
                  <select className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold">
                    <option>Select room...</option>
                    <option>Hall A</option>
                    <option>Hall B</option>
                    <option>Studio 1</option>
                    <option>Studio 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Duration (min)</label>
                  <input
                    type="number"
                    placeholder="90"
                    className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Description</label>
                <textarea
                  rows="3"
                  placeholder="Enter class description..."
                  className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] resize-none text-sm font-semibold"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Max Students</label>
                <input
                  type="number"
                  placeholder="25"
                  className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowClassModal(false)}
                  className="flex-1 px-6 py-3 border border-black/20 hover:bg-black/5 transition-all font-bold text-black text-sm uppercase tracking-wide"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowClassModal(false)}
                  className="flex-1 px-6 py-3 bg-black text-white hover:bg-[#F2EC62] hover:text-black transition-all font-bold text-sm uppercase tracking-wide"
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
