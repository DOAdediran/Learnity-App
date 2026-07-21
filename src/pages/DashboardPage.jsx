import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Play, Sparkles, Library, BookOpen, Clock3, Camera, FileText, Check, CircleDashed } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import userData from '../data/user.json';
import coursesData from '../data/courses.json';
import tasksData from '../data/tasks.json';
import activitiesData from '../data/activities.json';

const progressCards = [
  { title: 'UI/UX Design', icon: Sparkles, color: 'bg-pink-100 text-pink-600', lessons: '8/12', percent: 68 },
  { title: 'Development', icon: Library, color: 'bg-indigo-100 text-indigo-600', lessons: '10/16', percent: 63 },
  { title: 'Business', icon: BookOpen, color: 'bg-green-100 text-green-600', lessons: '14/14', percent: 100 }
];

const continueWatching = [
  { title: 'Design System Basics', category: 'UI/UX Design', time: '12 mins left', mentor: 'Lanre Felix', avatar: '/avatars/adrian.svg', progress: 70, badgeColor: 'bg-pink-500' },
  { title: 'React Patterns', category: 'Development', time: '20 mins left', mentor: 'Akinboye Festus', avatar: '/avatars/mina.svg', progress: 58, badgeColor: 'bg-indigo-500' },
  { title: 'Leadership Summit', category: 'Business', time: '8 mins left', mentor: 'Tunde Mutiu', avatar: '/avatars/tina.svg', progress: 82, badgeColor: 'bg-green-500' }
];

function DashboardPage() {
  const [tasks, setTasks] = useState(tasksData);
  const [selectedDay, setSelectedDay] = useState('All');
  const [joined, setJoined] = useState(false);
  const [taskView, setTaskView] = useState('All');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', dueDate: '', description: '' });
  const [selectedActivity, setSelectedActivity] = useState(activitiesData.labels[activitiesData.labels.length - 1]);
  const progressRowRef = useRef(null);
  const continueRowRef = useRef(null);

  const activityData = useMemo(() => activitiesData.labels.map((label, index) => ({ label, value: activitiesData.values[index] })), []);
  const selectedActivityDetail = useMemo(() => activityData.find((item) => item.label === selectedActivity) || activityData[activityData.length - 1], [activityData, selectedActivity]);
  const visibleTasks = useMemo(() => {
    if (taskView === 'Today') {
      return tasks.filter((task) => task.type === 'note' || task.type === 'task');
    }
    if (taskView === 'Upcoming') {
      return tasks.filter((task) => task.type === 'check' || task.type === 'task');
    }
    return tasks;
  }, [taskView, tasks]);

  const pendingTasks = tasks.filter((task) => !task.done).length;
  const completedTasks = tasks.filter((task) => task.done).length;

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!newTask.title.trim()) {
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      title: newTask.title.trim(),
      type: 'task',
      action: 'Start',
      done: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      description: newTask.description.trim()
    };

    setTasks((current) => [taskToAdd, ...current]);
    setNewTask({ title: '', priority: 'Medium', dueDate: '', description: '' });
    setShowTaskForm(false);
  };

  const scrollRow = (ref, direction) => {
    ref.current?.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back, Daniel</h1>
          <p className="mt-2 text-sm text-slate-500">Stay focused, keep learning!</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm text-slate-600">Total Courses <span className="ml-1 font-semibold text-slate-900">{userData.stats.totalCourses}</span></div>
          <div className="rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm text-slate-600">Completion Rate <span className="ml-1 font-semibold text-slate-900">{userData.stats.completionRate}%</span></div>
          <div className="rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm text-slate-600">Avg Test Score <span className="ml-1 font-semibold text-slate-900">{userData.stats.avgTestScore}/100</span></div>
          <div className="rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm text-slate-600">Total Certs <span className="ml-1 font-semibold text-slate-900">{userData.stats.totalCerts}</span></div>
        </div>
      </div>

      <section className="overflow-hidden rounded-[28px] bg-[#3B5CFF] p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Online Course</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Improve Your Skills with Experts Online Courses</h2>
            <button
              onClick={() => setJoined((value) => !value)}
              className="mt-6 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#3B5CFF] transition hover:scale-[1.02]"
            >
              {joined ? 'Enrolled ✓' : 'Join Now'} <span className="ml-2">→</span>
            </button>
          </div>
          <div className="flex h-44 w-full max-w-[260px] items-center justify-center rounded-[24px] border border-white/20 bg-white/10 p-4">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[24px] bg-white/95">
              <BookOpen size={40} className="text-[#3B5CFF]" />
              <div className="absolute -right-2 -top-2 rounded-full bg-[#16A34A] p-2 text-white"><Check size={16} /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Courses Progress</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollRow(progressRowRef, 'left')} className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Scroll left"><ArrowLeft size={16} /></button>
                <button onClick={() => scrollRow(progressRowRef, 'right')} className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Scroll right"><ArrowRight size={16} /></button>
              </div>
            </div>
            <div ref={progressRowRef} className="flex gap-4 overflow-x-auto pb-2">
              {progressCards.map(({ title, icon: Icon, color, lessons, percent }) => (
                <div key={title} className="min-w-[220px] flex-1 rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm">
                  <div className={`inline-flex rounded-full p-2 ${color}`}><Icon size={16} /></div>
                  <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                  <div className="mt-4 h-2 rounded-full bg-[#F1F5F9]">
                    <div className="h-2 rounded-full bg-[#3B5CFF]" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500"><span>{lessons} lessons</span><span>{percent}%</span></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Continue Watching</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollRow(continueRowRef, 'left')} className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Scroll left"><ArrowLeft size={16} /></button>
                <button onClick={() => scrollRow(continueRowRef, 'right')} className="rounded-full border border-[#EAECF0] p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Scroll right"><ArrowRight size={16} /></button>
              </div>
            </div>
            <div ref={continueRowRef} className="flex gap-4 overflow-x-auto pb-2">
              {continueWatching.map((item) => (
                <div key={item.title} className="min-w-[240px] flex-1 rounded-2xl border border-[#EAECF0] bg-white p-3 shadow-sm">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-4">
                    <div className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${item.badgeColor}`}>{item.category}</div>
                    <div className="flex h-28 items-center justify-center">
                      <div className="rounded-full bg-white/80 p-3 text-slate-900"><Play size={18} /></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                    <div className="mt-3 h-2 rounded-full bg-[#F1F5F9]">
                      <div className="h-2 rounded-full bg-[#3B5CFF]" style={{ width: `${item.progress}%` }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                      <span>{item.time}</span>
                      <div className="flex items-center gap-2">
                        <img src={item.avatar} alt={item.mentor} className="h-7 w-7 rounded-full object-cover" />
                        <span className="text-sm text-slate-600">{item.mentor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={userData.avatar} alt={userData.name} className="h-14 w-14 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{userData.name}</h3>
                <p className="text-sm text-slate-500">Weekly Focus</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-[#3B5CFF]/20">
                <div className="absolute inset-0 rounded-full border-[10px] border-[#3B5CFF] border-t-transparent" style={{ transform: 'rotate(60deg)' }} />
                <span className="text-lg font-semibold text-slate-900">92%</span>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Activities</h3>
              <button className="flex items-center gap-2 rounded-full border border-[#EAECF0] px-3 py-1.5 text-sm text-slate-500">
                This Week <ChevronDown size={16} />
              </button>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis hide domain={[0, 80]} />
                  <Tooltip
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: 16, borderColor: '#E2E8F0', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)' }}
                    formatter={(value) => [`${value} mins`, 'Activity']}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Bar dataKey="value" radius={[8, 8, 4, 4]} fill="#3B5CFF">
                    {activityData.map((entry) => (
                      <Cell
                        key={entry.label}
                        fill={selectedActivity === entry.label ? '#2563EB' : '#3B5CFF'}
                        opacity={selectedActivity === entry.label ? 1 : 0.8}
                        cursor="pointer"
                        onClick={() => setSelectedActivity(entry.label)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected day</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{selectedActivityDetail?.label}</p>
                  <p className="text-sm text-slate-500">{selectedActivityDetail?.value} minutes of focused study</p>
                </div>
                <span className="rounded-full bg-[#3B5CFF]/10 px-3 py-1 text-sm font-semibold text-[#3B5CFF]">
                  {selectedActivityDetail?.value >= 60 ? 'Strong focus' : 'Steady pace'}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Tasks</h3>
                <p className="mt-1 text-sm text-slate-500">{pendingTasks} pending · {completedTasks} done</p>
              </div>
              <div className="flex gap-2 rounded-full border border-[#EAECF0] p-1">
                {['All', 'Today', 'Upcoming'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setTaskView(option)}
                    className={`rounded-full px-3 py-1.5 text-sm ${taskView === option ? 'bg-[#3B5CFF] text-white' : 'text-slate-500'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              {!showTaskForm ? (
                <button onClick={() => setShowTaskForm(true)} className="mb-4 inline-flex items-center rounded-full border border-[#EAECF0] px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  + Add Task
                </button>
              ) : (
                <form onSubmit={handleAddTask} className="mb-4 space-y-3 rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] p-3">
                  <input
                    value={newTask.title}
                    onChange={(event) => setNewTask((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Task title"
                    className="w-full rounded-xl border border-[#EAECF0] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                  />
                  <textarea
                    value={newTask.description}
                    onChange={(event) => setNewTask((current) => ({ ...current, description: event.target.value }))}
                    placeholder="Add a short note"
                    rows="2"
                    className="w-full rounded-xl border border-[#EAECF0] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                      value={newTask.priority}
                      onChange={(event) => setNewTask((current) => ({ ...current, priority: event.target.value }))}
                      className="rounded-xl border border-[#EAECF0] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(event) => setNewTask((current) => ({ ...current, dueDate: event.target.value }))}
                      className="rounded-xl border border-[#EAECF0] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-full bg-[#3B5CFF] px-3 py-1.5 text-sm font-semibold text-white">Save Task</button>
                    <button type="button" onClick={() => setShowTaskForm(false)} className="rounded-full border border-[#EAECF0] px-3 py-1.5 text-sm font-semibold text-slate-700">Cancel</button>
                  </div>
                </form>
              )}
            </div>

            <div className="space-y-3">
              {visibleTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {task.done ? <CheckCircle2 className="text-[#3B5CFF]" size={18} /> : <CircleDashed className="text-slate-400" size={18} />}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-slate-700">{task.title}</span>
                          <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${task.priority === 'High' ? 'bg-rose-100 text-rose-600' : task.priority === 'Low' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {task.priority || 'Medium'}
                          </span>
                        </div>
                        {task.description ? <p className="mt-1 text-xs text-slate-500">{task.description}</p> : null}
                        {task.dueDate ? <p className="mt-1 text-xs text-slate-400">Due {task.dueDate}</p> : null}
                      </div>
                    </div>
                    <button onClick={() => toggleTask(task.id)} className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${task.done ? 'bg-[#3B5CFF] text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}>
                      {task.done ? 'Done' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default DashboardPage;
