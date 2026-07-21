import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, Download, Fullscreen, Play, Pause, RotateCcw, SkipForward, Settings, Lock, CirclePlay, MessageSquareText } from 'lucide-react';
import lessonsData from '../data/lessons.json';

function LessonPage() {
  const { id } = useParams();
  const lesson = lessonsData.find((item) => item.id === id) ?? lessonsData[0];
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(28);
  const [lessonStates, setLessonStates] = useState(() => {
    const initialState = {};
    lesson.modules.forEach((module) => {
      module.lessons.forEach((item) => {
        initialState[`${module.title}:${item.title}`] = item.state;
      });
    });
    return initialState;
  });

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => setProgress((value) => (value >= 100 ? 100 : value + 2)), 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const handleScrub = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setProgress(Math.round(ratio * 100));
  };

  const toggleLessonState = (moduleTitle, title) => {
    const key = `${moduleTitle}:${title}`;
    setLessonStates((current) => ({
      ...current,
      [key]: current[key] === 'complete' ? 'playing' : 'complete'
    }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div>
        <nav className="text-sm text-slate-500">
          <Link to="/courses" className="font-medium text-[#3B5CFF]">Courses</Link>
          <span className="mx-2">›</span>
          <span>{lesson.courseTitle}</span>
          <span className="mx-2">›</span>
          <span className="text-slate-700">{lesson.breadcrumb[2]}</span>
        </nav>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{lesson.lessonTitle}</h1>
            <p className="mt-2 text-sm text-slate-500">A focused lesson on visual rhythm, contrast, and interface confidence.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Resources</button>
            <button className="rounded-full bg-[#3B5CFF] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]">Next Lesson <ArrowRight className="ml-1 inline" size={16} /></button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#EAECF0] bg-slate-950 shadow-sm">
          <div className="relative h-[320px] bg-[radial-gradient(circle_at_top_left,_rgba(59,92,255,0.35),_transparent_42%),linear-gradient(135deg,_#111827_0%,_#0f172a_50%,_#1f2937_100%)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={() => setPlaying((value) => !value)} className="rounded-full bg-white/90 p-4 text-slate-900 transition hover:scale-105" aria-label="Toggle play">
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <button className="rounded-full bg-white/10 p-2" aria-label="Rewind"><RotateCcw size={16} /></button>
                <button onClick={() => setPlaying((value) => !value)} className="rounded-full bg-white/10 p-2" aria-label="Play or pause">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
                <button className="rounded-full bg-white/10 p-2" aria-label="Skip forward"><SkipForward size={16} /></button>
                <span className="ml-2 text-white">01:12</span>
                <span className="text-slate-400">/</span>
                <span>03:00</span>
                <div className="ml-auto flex items-center gap-2">
                  <button className="rounded-full bg-white/10 p-2" aria-label="Subtitles"><MessageSquareText size={16} /></button>
                  <button className="rounded-full bg-white/10 p-2" aria-label="Settings"><Settings size={16} /></button>
                  <button className="rounded-full bg-white/10 p-2" aria-label="Fullscreen"><Fullscreen size={16} /></button>
                </div>
              </div>
              <button onClick={handleScrub} className="mt-3 h-1.5 w-full rounded-full bg-white/20" aria-label="Scrub lesson progress">
                <div className="h-1.5 rounded-full bg-[#3B5CFF]" style={{ width: `${progress}%` }} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Lesson Overview</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F8F9FC] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Duration</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800"><Clock3 size={16} /> {lesson.duration}</p>
            </div>
            <div className="rounded-2xl bg-[#F8F9FC] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Level</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{lesson.level}</p>
            </div>
            <div className="rounded-2xl bg-[#F8F9FC] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{lesson.project}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#EAECF0] bg-[#F8F9FC] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Related resources</h3>
              <span className="rounded-full bg-[#3B5CFF]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#3B5CFF]">Explore more</span>
            </div>
            <div className="mt-4 space-y-3">
              {lesson.resources?.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[#EAECF0] bg-white px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{resource.title}</p>
                    <p className="text-xs text-slate-500">{resource.type}</p>
                  </div>
                  <span className="rounded-full bg-[#3B5CFF] px-3 py-1 text-xs font-semibold text-white">Open</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Course Content</h3>
            <div className="rounded-full bg-[#3B5CFF]/10 px-3 py-1 text-sm font-semibold text-[#3B5CFF]">76%</div>
          </div>
          <div className="mt-5 space-y-5">
            {lesson.modules.map((module) => (
              <div key={module.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">{module.title}</p>
                <div className="mt-3 space-y-2">
                  {module.lessons.map((item) => {
                    const state = lessonStates[`${module.title}:${item.title}`] ?? item.state;
                    const iconClass = state === 'complete' ? 'text-[#16A34A]' : state === 'playing' ? 'text-[#3B5CFF]' : 'text-slate-400';
                    const Icon = state === 'complete' ? CheckCircle2 : state === 'playing' ? CirclePlay : Lock;
                    return (
                      <button
                        key={item.title}
                        onClick={() => toggleLessonState(module.title, item.title)}
                        className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left ${state === 'playing' ? 'border-[#3B5CFF]/20 bg-blue-50' : 'border-[#EAECF0] bg-white'}`}
                      >
                        <Icon size={16} className={iconClass} />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.duration}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#CBD5E1] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <Download size={16} /> Download All Assets
          </button>
        </section>

        <section className="rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Lead Mentor</h3>
            <button className="rounded-full bg-[#3B5CFF] px-3 py-1.5 text-sm font-semibold text-white">+ Follow</button>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="relative">
              <img src={lesson.mentor.avatar} alt={lesson.mentor.name} className="h-14 w-14 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#16A34A]" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{lesson.mentor.name}</p>
              <p className="text-sm text-slate-500">{lesson.mentor.role}</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default LessonPage;
