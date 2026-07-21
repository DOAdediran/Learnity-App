import { useState } from 'react';
import { Bell, Lock, ShieldCheck, UserCircle2 } from 'lucide-react';

function SettingsPage() {
  const [form, setForm] = useState({
    fullName: 'Daniel Oluwafikayo',
    email: 'daniel@learnity.app',
    timezone: 'WAT',
    notifications: true,
    darkMode: false
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Manage your profile, preferences, and account security.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#3B5CFF]/10 p-2 text-[#3B5CFF]">
              <UserCircle2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Profile details</h2>
              <p className="text-sm text-slate-500">Update the essentials so your account stays current.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
              <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} className="w-full rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-sm text-slate-700 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
              <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-sm text-slate-700 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Timezone</span>
              <select value={form.timezone} onChange={(event) => setForm({ ...form, timezone: event.target.value })} className="w-full rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-sm text-slate-700 outline-none">
                <option value="WAT">West Africa Time (WAT)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
              </select>
            </label>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#3B5CFF]/10 p-2 text-[#3B5CFF]">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
                <p className="text-sm text-slate-500">Tune how Learnity updates you.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Email notifications</span>
                <input type="checkbox" checked={form.notifications} onChange={() => setForm({ ...form, notifications: !form.notifications })} className="h-4 w-4 rounded border-slate-300 text-[#3B5CFF]" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Show learning tips</span>
                <input type="checkbox" checked={form.notifications} onChange={() => setForm({ ...form, notifications: !form.notifications })} className="h-4 w-4 rounded border-slate-300 text-[#3B5CFF]" />
              </label>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#3B5CFF]/10 p-2 text-[#3B5CFF]">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                <p className="text-sm text-slate-500">Keep your account secure and protected.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button className="flex w-full items-center justify-between rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-left text-sm font-medium text-slate-700">
                <span>Change password</span>
                <ShieldCheck size={16} className="text-[#3B5CFF]" />
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-left text-sm font-medium text-slate-700">
                <span>Enable two-factor authentication</span>
                <ShieldCheck size={16} className="text-[#3B5CFF]" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
