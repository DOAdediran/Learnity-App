import { NavLink, Outlet } from 'react-router-dom';
import { Bell, BookOpen, ChevronRight, Flame, Mail, PanelLeftClose, Search, Settings, Sparkles, LogOut, Menu } from 'lucide-react';
import userData from '../data/user.json';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Sparkles },
  { to: '/inbox', label: 'Inbox', icon: Mail },
  { to: '/lesson/advanced-ui-principles', label: 'Lesson', icon: BookOpen },
  { to: '/tasks', label: 'Task', icon: PanelLeftClose },
  { to: '/courses', label: 'Group', icon: Settings }
];

const settingsItems = [
  { to: '/settings', label: 'Setting', icon: Settings },
  { to: '/logout', label: 'Logout', icon: LogOut }
];

function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="hidden w-64 flex-col border-r border-[#EAECF0] bg-white px-5 py-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3B5CFF] text-white shadow-sm">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Learnity</p>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Online learning</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">Overview</p>
            <nav className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[#3B5CFF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-8 rounded-2xl bg-[#EFF4FF] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Flame size={16} className="text-[#3B5CFF]" />
              Learning Streak
            </div>
            <p className="mt-2 text-sm text-slate-600">You&apos;re making great progress.</p>
            <div className="mt-4 h-2 rounded-full bg-white">
              <div className="h-2 w-[60%] rounded-full bg-[#3B5CFF]" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>18 Days</span>
              <span>60%</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">Settings</p>
            <div className="space-y-1">
              {settingsItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-100 hover:text-rose-600'}`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-[#EAECF0] bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <button className="rounded-full border border-[#EAECF0] p-2 text-slate-600 lg:hidden" onClick={() => setMobileNavOpen((prev) => !prev)}>
                <Menu size={18} />
              </button>
              <label className="flex flex-1 items-center gap-2 rounded-full border border-[#EAECF0] bg-[#F8F9FC] px-3 py-2.5 text-sm text-slate-500">
                <Search size={16} />
                <input className="w-full bg-transparent outline-none" placeholder="Search your course..." />
              </label>
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Messages">
                  <Mail size={16} />
                </button>
                <button className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Notifications">
                  <Bell size={16} />
                </button>
                <div className="flex items-center gap-2 rounded-full border border-[#EAECF0] px-2 py-1.5">
                  <img src={userData.avatar} alt={userData.name} className="h-8 w-8 rounded-full object-cover" />
                  <span className="hidden text-sm font-semibold text-slate-800 sm:inline">{userData.name}</span>
                </div>
              </div>
            </div>
          </header>

          {mobileNavOpen && (
            <div className="border-b border-[#EAECF0] bg-white p-4 lg:hidden">
              <nav className="space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[#3B5CFF] text-white' : 'text-slate-600 hover:bg-slate-100'}`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          <main className="h-[calc(100vh-73px)] overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
