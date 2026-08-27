import { useState } from 'react'

export default function STCDashboardMockup() {
  const [activeNav, setActiveNav] = useState('overview')
  const [selectedDept, setSelectedDept] = useState('all')

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'participants', label: 'Participants', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'programs', label: 'Programs', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'roles', label: 'Roles & Depts', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'alignment', label: 'Alignment', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zM17 14v5m-4 0h8' },
    { id: 'heatmap', label: 'Capability Heat Map', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
    { id: 'reports', label: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ]

  const capabilities = [
    { name: 'Problem Solving & Critical Analysis', score: 88, band: 'Optimal', count: '1,098 verified' },
    { name: 'Communication & Interpersonal Influence', score: 79, band: 'High', count: '942 verified' },
    { name: 'Adaptability & Resilience Under Change', score: 84, band: 'Optimal', count: '1,048 verified' },
    { name: 'Cross-Functional Team Collaboration', score: 72, band: 'Balanced', count: '876 verified' },
    { name: 'Applied Technical & Workflow Literacy', score: 65, band: 'Growth Area', count: '740 verified' },
  ]

  const heatMapGrid = [
    { skill: 'Critical Thinking', deptA: 92, deptB: 85, deptC: 78, deptD: 88 },
    { skill: 'Complex Problem Solving', deptA: 86, deptB: 79, deptC: 71, deptD: 84 },
    { skill: 'Adaptive Communication', deptA: 81, deptB: 90, deptC: 84, deptD: 76 },
    { skill: 'Empathy & Mentorship', deptA: 74, deptB: 88, deptC: 92, deptD: 79 },
    { skill: 'Operational Execution', deptA: 89, deptB: 82, deptC: 76, deptD: 91 },
  ]

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl shadow-blue-950/40 overflow-hidden font-stc-body text-slate-100 transition-all duration-300">
      {/* Chrome Browser Window Header */}
      <div className="bg-[#1E293B] px-4 py-3 border-b border-slate-700/70 flex items-center justify-between gap-2 select-none">
        {/* Window Dots */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
        </div>

        {/* Browser URL Bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-2 bg-[#0F172A]/80 border border-slate-700 rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
          <svg className="w-3 h-3 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="truncate text-slate-300">app.eleviq.io/org/enterprise-alignment</span>
        </div>

        {/* Live System Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline text-[10px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">
            Live CAS™
          </span>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] min-h-[460px] sm:min-h-[520px]">
        {/* Dark Sidebar Navigation */}
        <aside className="bg-[#090D16] border-r border-slate-800 p-3 sm:p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-4">
            {/* Org Brand Pill in Sidebar */}
            <div className="px-2 py-1.5 flex items-center gap-2 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00D2FF] to-[#0052CC] flex items-center justify-center text-white text-[11px] font-bold">
                E
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white tracking-tight truncate">ElevIQ CAS™</div>
                <div className="text-[9px] text-[#00D2FF] font-mono">Org Console</div>
              </div>
            </div>

            {/* Sidebar Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeNav === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-[#0052CC] text-white font-semibold shadow-md shadow-blue-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer Info */}
          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
            <div>STC Innovations IP</div>
            <div className="text-slate-400 font-medium">CAS Enterprise v4.2</div>
          </div>
        </aside>

        {/* Dashboard Content Workspace */}
        <main className="bg-[#0B132B] p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden">
          {/* Top Bar Filter & Context */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
            <div>
              <h4 className="font-stc-heading text-base sm:text-lg font-bold text-white tracking-tight">
                Workforce Capability Intelligence
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                Real-time human-skills alignment & verified pathway signals
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900/80 border border-slate-700/60 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setSelectedDept('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedDept === 'all' ? 'bg-[#0052CC] text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Cohorts
              </button>
              <button
                type="button"
                onClick={() => setSelectedDept('ops')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedDept === 'ops' ? 'bg-[#0052CC] text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Operations
              </button>
              <button
                type="button"
                onClick={() => setSelectedDept('tech')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedDept === 'tech' ? 'bg-[#0052CC] text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Leadership
              </button>
            </div>
          </div>

          {/* TOP METRICS 4-CARD STRIP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Metric 1: Participants */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-1 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Participants</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  +14.2%
                </span>
              </div>
              <div className="font-stc-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                1,248
              </div>
              <div className="text-[10px] text-slate-400">Enrolled in Active Pipelines</div>
            </div>

            {/* Metric 2: Completed Assessments */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-1 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Assessments</span>
                <span className="text-[10px] font-mono text-[#00D2FF] bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                  Scan™
                </span>
              </div>
              <div className="font-stc-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                832
              </div>
              <div className="text-[10px] text-slate-400">Capability Profiles Logged</div>
            </div>

            {/* Metric 3: Alignment Score (Circular Ring) */}
            <div className="bg-slate-900/90 border border-blue-900/40 rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-inner">
              <div className="space-y-0.5">
                <div className="text-slate-400 text-xs">Alignment Score</div>
                <div className="font-stc-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  67%
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">Optimal Role Fit</div>
              </div>
              {/* Circular Ring Progress Chart */}
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#00D2FF]"
                    strokeDasharray="67, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                  67%
                </div>
              </div>
            </div>

            {/* Metric 4: Active Programs */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-1 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Programs</span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/60 px-1.5 py-0.5 rounded">
                  Clusters
                </span>
              </div>
              <div className="font-stc-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                142
              </div>
              <div className="text-[10px] text-slate-400">Institutional Cohorts</div>
            </div>
          </div>

          {/* 2-COLUMN LOWER SECTION: Bar Charts & Capability Heat Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Box (7 Cols): Capability Signal Strengths */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D2FF]" />
                  <span className="font-stc-heading text-xs font-bold text-white uppercase tracking-wider">
                    Top Capability Signal Strengths
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Aggregated Density</span>
              </div>

              <div className="space-y-2.5">
                {capabilities.map((cap) => (
                  <div key={cap.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium truncate max-w-[220px]">{cap.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-400 font-mono">{cap.count}</span>
                        <span className="font-bold text-white font-mono text-xs">{cap.score}%</span>
                      </div>
                    </div>
                    {/* Horizontal Bar Chart */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052CC] transition-all duration-500"
                        style={{ width: `${cap.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box (5 Cols): Interactive Capability Heat Map Grid */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-stc-heading text-xs font-bold text-white uppercase tracking-wider">
                    Capability Heat Map
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Cross-Cohort</span>
              </div>

              {/* Heat Map Table */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-5 text-[10px] font-mono text-slate-400 pb-1 border-b border-slate-800">
                  <div className="col-span-2">Dimension</div>
                  <div className="text-center">C1</div>
                  <div className="text-center">C2</div>
                  <div className="text-center">C3</div>
                </div>

                {heatMapGrid.map((row) => (
                  <div key={row.skill} className="grid grid-cols-5 items-center text-[11px] py-1 border-b border-slate-800/40">
                    <div className="col-span-2 text-slate-300 font-medium truncate pr-1">{row.skill}</div>
                    <div className="flex justify-center">
                      <span className={`w-7 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        row.deptA > 85 ? 'bg-cyan-500/30 text-[#00D2FF] border border-cyan-500/40' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {row.deptA}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <span className={`w-7 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        row.deptB > 85 ? 'bg-cyan-500/30 text-[#00D2FF] border border-cyan-500/40' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {row.deptB}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <span className={`w-7 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        row.deptC > 85 ? 'bg-cyan-500/30 text-[#00D2FF] border border-cyan-500/40' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {row.deptC}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-cyan-500/30 border border-cyan-500/40" /> 85%+ Target Alignment
                </span>
                <span className="text-[#00D2FF]">View Full Matrix →</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
