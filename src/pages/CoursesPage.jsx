import { useMemo, useState } from 'react';
import { Plus, Search, Heart, ChevronRight } from 'lucide-react';
import coursesData from '../data/courses.json';

const tabs = ['All', 'In Progress', 'Completed'];

const categoryClasses = {
  'UI/UX Design': 'bg-pink-100 text-pink-600',
  Development: 'bg-indigo-100 text-indigo-600',
  Business: 'bg-green-100 text-green-600',
  'Data Science': 'bg-cyan-100 text-cyan-600',
  'Cyber-security': 'bg-amber-100 text-amber-600'
};

function CoursesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedIds, setSavedIds] = useState(['ui-design-mastery']);

  const filteredCourses = useMemo(() => {
    let nextCourses = coursesData;
    if (activeTab === 'Completed') {
      nextCourses = nextCourses.filter((course) => course.status === 'completed');
    } else if (activeTab === 'In Progress') {
      nextCourses = nextCourses.filter((course) => course.status === 'in-progress');
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      nextCourses = nextCourses.filter((course) => [course.title, course.category, course.instructor.name].some((value) => value.toLowerCase().includes(query)));
    }

    return nextCourses;
  }, [activeTab, searchTerm]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">My Courses</h1>
          <p className="mt-2 text-sm text-slate-500">Continue where you left off and revisit completed topics whenever you need them.</p>
        </div>
        <div className="flex rounded-full border border-[#EAECF0] bg-white p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-[#3B5CFF] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-[24px] border border-[#EAECF0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-[#EAECF0] bg-[#F8F9FC] px-3 py-2.5 text-sm text-slate-500">
          <Search size={16} />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search by course or mentor" />
        </label>
        <p className="text-sm text-slate-500">{filteredCourses.length} results</p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <article key={course.id} className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-40 bg-slate-100">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryClasses[course.category]}`}>{course.category}</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                <button
                  onClick={() => setSavedIds((current) => current.includes(course.id) ? current.filter((id) => id !== course.id) : [...current, course.id])}
                  className={`rounded-full p-2 ${savedIds.includes(course.id) ? 'bg-[#3B5CFF] text-white' : 'bg-[#F8F9FC] text-slate-500'}`}
                  aria-label="Save course"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{course.instructor.name}</p>
                  <p className="text-xs text-slate-500">Instructor</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#F1F5F9]">
                <div className="h-2 rounded-full bg-[#3B5CFF]" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{course.progress}% Complete</span>
                <span>{course.lessonsCompleted}/{course.lessonsTotal} Lessons</span>
              </div>
              <div className="mt-4 rounded-2xl border border-[#EAECF0] bg-[#F8F9FC] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Related resources</p>
                <div className="mt-2 space-y-2">
                  {course.resources?.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[#EAECF0] bg-white px-2.5 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <span>{resource.title}</span>
                      <span className="rounded-full bg-[#3B5CFF]/10 px-2 py-1 text-[11px] font-semibold text-[#3B5CFF]">{resource.type}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="flex min-h-[320px] items-center justify-center rounded-[24px] border border-dashed border-[#CBD5E1] bg-white/70 p-5 text-center shadow-sm">
          <div className="w-full">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3B5CFF]/10 text-[#3B5CFF]"><Plus size={20} /></div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Browse New Courses</h3>
            <p className="mt-2 text-sm text-slate-500">Search for fresh lessons in design, business, and data using the platforms you already use.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <a href="https://www.google.com/search?q=online+courses+for+ux+design" target="_blank" rel="noreferrer" className="rounded-full border border-[#EAECF0] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Google</a>
              <a href="https://www.youtube.com/results?search_query=online+courses+for+design" target="_blank" rel="noreferrer" className="rounded-full border border-[#EAECF0] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">YouTube</a>
              <a href="https://www.coursera.org/search?query=online%20courses" target="_blank" rel="noreferrer" className="rounded-full border border-[#EAECF0] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Coursera</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
