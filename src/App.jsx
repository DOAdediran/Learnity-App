import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

function PlaceholderPage({ title }) {
  return (
    <div className="rounded-[24px] border border-[#EAECF0] bg-white p-8 text-slate-900 shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 text-sm text-slate-500">This section is ready for more learning content.</p>
    </div>
  );
}

function LogoutPage({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('learnity-auth');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    window.localStorage.setItem('learnity-auth', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" replace />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/inbox" element={<PlaceholderPage title="Inbox" />} />
          <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<LogoutPage onLogout={() => setIsLoggedIn(false)} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
