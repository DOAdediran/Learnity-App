import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'daniel@learnity.app', password: 'learnity2026' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin?.();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#EAECF0] bg-white shadow-sm lg:flex">
        <div className="flex flex-1 flex-col justify-between bg-[#3B5CFF] p-8 text-white">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <BookOpen size={24} />
            </div>
            <h1 className="mt-8 text-3xl font-semibold">Welcome back to Learnity</h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-blue-100">Sign in to unlock your learning dashboard, continue your courses, and track your progress with ease.</p>
          </div>
          <div className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-sm text-blue-50">
            <p className="font-semibold">Why learners love Learnity</p>
            <p className="mt-2">Structured lessons, focused progress tracking, and curated resources in one place.</p>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3B5CFF]">Sign in</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Access your dashboard</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3 text-sm text-slate-700 outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <div className="flex items-center rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-4 py-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  required
                />
                <button type="button" className="ml-2 text-slate-500" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <button type="submit" className="w-full rounded-full bg-[#3B5CFF] px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">Need a quick demo? Use email <span className="font-semibold text-slate-700">daniel@learnity.app</span> and password <span className="font-semibold text-slate-700">learnity2026</span>.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
