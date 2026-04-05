import React, { useState } from 'react'
import { getTopicStatus, todayStr } from '../../utils/ruleSystem'

// Thematic emoji for each section — matches section content meaning
const SECTION_EMOJIS = {
  's1':  '🎓',  // Introduction to the Course
  's2':  '📊',  // Introduction to Data Analytics
  's3':  '⚙️',  // Setting up the Environment
  's4':  '🐍',  // Python Basics
  's5':  '🧱',  // Fundamentals for Coding in Python
  's6':  '➗',  // Mathematics for Python
  's7':  '🔢',  // NumPy Basics
  's8':  '🐼',  // Pandas Basics
  's9':  '📄',  // Working with Text Files
  's10': '🔤',  // Working with Text Data
  's11': '🧰',  // Must-Know Python Tools
  's12': '🗂️',  // Data Gathering / Data Collection
  's13': '🔌',  // APIs
  's14': '🧹',  // Data Cleaning and Data Preprocessing
  's15': '📈',  // pandas Series
  's16': '📋',  // pandas DataFrames
  's17': '🧮',  // NumPy Fundamentals
  's18': '🏷️',  // NumPy DataTypes
  's19': '🗃️',  // Working with Arrays
  's20': '🎲',  // Generating Data with NumPy
  's21': '📉',  // Statistics with NumPy
  's22': '🔧',  // NumPy Preprocessing
  's23': '💰',  // A Loan Data Example with NumPy
  's24': '🏥',  // The Absenteeism Exercise - Introduction
  's25': '🧪',  // Solution to the Absenteeism Exercise
  's26': '🎨',  // Data Visualization
  's27': '🏁',  // Conclusion
}

export default function RoadmapTab({ progress, onAdvance, courseData }) {
  const totalSections = courseData.length
  let totalTopics = 0
  let startedTopics = 0

  courseData.forEach(s => {
    totalTopics += s.topics.length
    s.topics.forEach(t => {
      if (progress[t.id] && progress[t.id].learnedDate) startedTopics++
    })
  })

  let foundActive = false
  const sectionsWithStatus = courseData.map((section) => {
    let memorizedCount = 0
    let startedCount = 0
    const today = todayStr()
    
    section.topics.forEach(t => {
      if (progress[t.id] && progress[t.id].learnedDate) startedCount++
      if (getTopicStatus(progress[t.id], today) === 'memorized') memorizedCount++
    })
    
    const isComplete = section.topics.length > 0 && memorizedCount === section.topics.length
    
    let timelineStatus = 'locked'
    if (isComplete) {
      timelineStatus = 'completed'
    } else if (startedCount > 0 || !foundActive) {
      timelineStatus = 'active'
      foundActive = true
    }

    return { ...section, timelineStatus }
  })

  return (
    <div className="animate-fade" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ─── Header & Stats ─── */}
      <div>
        <h1 style={{
          font: "800 28px/1.1 'Syne', sans-serif",
          letterSpacing: '-1px',
          color: 'var(--text-primary)',
          marginBottom: '14px'
        }}>
          Course Roadmap
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <StatChip label={`${totalSections} Sections`} />
          <StatChip label={`${totalTopics} Topics`} />
          <StatChip label="21.5h Total" />
          <StatChip label={`${startedTopics} Started`} highlight />
        </div>
      </div>

      {/* ─── Section Accordions Timeline ─── */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        paddingLeft: '44px', // Space allocated for the glowing timeline
        marginTop: '10px'
      }}>
        {sectionsWithStatus.map((section, index) => (
          <SectionCard 
            key={section.id} 
            section={section} 
            timelineStatus={section.timelineStatus}
            isLast={index === sectionsWithStatus.length - 1}
            progress={progress} 
            onAdvance={onAdvance} 
          />
        ))}
      </div>

    </div>
  )
}

/* ─── Stat Chip (Level 4 Glass) ─── */
function StatChip({ label, highlight }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      font: "600 9px/1 'JetBrains Mono', monospace",
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      padding: '6px 10px',
      borderRadius: '6px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      background: highlight ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.06)',
      color: highlight ? '#F59E0B' : '#8E8E93',
      border: `1px solid ${highlight ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'}`,
      boxShadow: highlight ? '0 0 8px rgba(245,158,11,0.12)' : 'none'
    }}>
      {label}
    </div>
  )
}

/* ─── Section Card (Level 2 Glass + Expandable) ─── */
function SectionCard({ section, progress, onAdvance, timelineStatus, isLast }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const total = section.topics.length
  let memorizedCount = 0
  const today = todayStr()
  
  section.topics.forEach(t => {
    const status = getTopicStatus(progress[t.id], today)
    if (status === 'memorized') memorizedCount++
  })
  
  const percent = total === 0 ? 0 : Math.round((memorizedCount / total) * 100)
  const isComplete = percent === 100

  // Timeline Styling Config
  const timelineConfig = {
    completed: { color: 'var(--green)', glow: 'rgba(16, 185, 129, 0.4)' },
    active: { color: 'var(--amber)', glow: 'rgba(245, 158, 11, 0.4)' },
    locked: { color: 'rgba(255,255,255,0.06)', glow: 'transparent', outline: 'rgba(255,255,255,0.15)' }
  }
  const tConfig = timelineConfig[timelineStatus]

  return (
    <div style={{ position: 'relative' }}>
      {/* ─── Floating Timeline Node ─── */}
      <div style={{
        position: 'absolute',
        left: '-44px',
        top: '20px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: tConfig.color,
        border: tConfig.outline ? `1px solid ${tConfig.outline}` : 'none',
        boxShadow: `0 0 16px ${tConfig.glow}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        {timelineStatus === 'completed' && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {timelineStatus === 'active' && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#121212" stroke="#121212" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )}
        {timelineStatus === 'locked' && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
      </div>

      {/* ─── Timeline Vertical Path ─── */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          left: '-29px',
          top: '52px',
          bottom: '-44px',
          width: '2px',
          background: timelineStatus === 'completed' 
            ? 'linear-gradient(to bottom, var(--green) 0%, rgba(245,158,11,0.5) 100%)' 
            : timelineStatus === 'active' 
              ? 'linear-gradient(to bottom, rgba(245,158,11,0.5) 0%, rgba(255,255,255,0.05) 100%)'
              : 'rgba(255,255,255,0.05)',
          zIndex: 1
        }} />
      )}

      {/* ─── Card Container ─── */}
      <div style={{
        background: isExpanded ? 'rgba(245,158,11,0.05)' : 'rgba(20, 20, 22, 0.72)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '20px',
        border: `1px solid ${isExpanded ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.07)'}`,
        borderTopColor: isExpanded ? 'rgba(245,158,11,0.32)' : 'rgba(255,255,255,0.11)',
        boxShadow: isExpanded 
          ? 'inset 0 1px 0 rgba(245,158,11,0.08), 0 4px 24px rgba(245,158,11,0.10)'
          : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.36), 0 2px 8px rgba(0,0,0,0.24)',
        overflow: 'hidden',
        transition: 'all 280ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      {/* Header (Clickable) */}
      <div 
        className="tappable"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px',
          cursor: 'pointer'
        }}
      >
        <div style={{ flex: 1, paddingRight: '50px' }}>
          {/* Section number - micro label */}
          <span style={{
            font: "600 9px/1 'JetBrains Mono', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: isComplete ? 'var(--green)' : 'var(--amber)',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '24px', lineHeight: 1 }}>{SECTION_EMOJIS[section.id] || '📦'}</span>
            {isComplete ? '✦ ' : ''}Section {section.number}
          </span>

          {/* Section title */}
          <h3 style={{
            font: "700 16px/1.3 'Syne', sans-serif",
            color: 'var(--text-primary)'
          }}>
            {section.title}
          </h3>

          {/* Progress label */}
          <div style={{
            font: "400 10px/1.6 'JetBrains Mono', monospace",
            color: 'var(--text-secondary)',
            marginTop: '6px',
            letterSpacing: '0.3px'
          }}>
            {memorizedCount} / {total} mastered
          </div>
        </div>
        
        {/* Chevron */}
        <div style={{ 
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 250ms cubic-bezier(0.22, 0.68, 0, 1.2)',
          color: isExpanded ? 'var(--amber)' : 'var(--text-secondary)',
          background: isExpanded ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.06)',
          width: '32px', 
          height: '32px', 
          borderRadius: '10px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '10px',
          border: `1px solid ${isExpanded ? 'rgba(245,158,11,0.22)' : 'rgba(255,255,255,0.08)'}`,
          flexShrink: 0
        }}>
          ▼
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 16px 14px' }}>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Expanded Topics List */}
      {isExpanded && (
        <div style={{ 
          margin: '0 10px 10px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'rgba(28,28,30,0.60)',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.05)',
          animation: 'slideUp 400ms cubic-bezier(0.22, 0.68, 0, 1.2) both'
        }}>
          {section.topics.map((topic, index) => (
            <TopicRow 
              key={topic.id} 
              topic={topic} 
              index={index}
              topicProgress={progress[topic.id]} 
              onAdvance={() => onAdvance(topic.id)} 
              isLast={index === section.topics.length - 1}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  )
}

/* ─── Topic Row ─── */
function TopicRow({ topic, index, topicProgress, onAdvance, isLast }) {
  const today = todayStr()
  const status = getTopicStatus(topicProgress, today)

  const statusConfig = {
    not_started: { className: 'not-started', text: 'Not Started' },
    learned: { className: 'learned', text: 'Learning' },
    revision_due: { className: 'revision_due', text: 'Day 4' },
    re_revision_due: { className: 're_revision_due', text: 'Day 7' },
    memorized: { className: 'memorized', text: 'Done ✦' }
  }

  const { className: badgeClass, text: statusText } = statusConfig[status] || statusConfig.not_started

  // Button config
  const showButton = status !== 'memorized' && status !== 'learned'
  let btnBg = 'var(--amber)'
  let btnShadow = '0 4px 12px rgba(245,158,11,0.25)'
  let btnLabel = 'Start'

  if (status === 'revision_due' || status === 're_revision_due') {
    btnBg = 'var(--green)'
    btnShadow = '0 4px 12px rgba(52,199,89,0.25)'
    btnLabel = 'Done ✓'
  }

  return (
    <div style={{ 
      padding: '14px 16px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Left: Title + Duration + Badge */}
      <div style={{ flex: 1, paddingRight: '12px' }}>
        <div style={{
          font: "400 13px/1.8 'JetBrains Mono', monospace",
          color: status === 'memorized' ? 'var(--text-secondary)' : 'var(--text-primary)',
          textDecoration: status === 'memorized' ? 'line-through' : 'none',
          textDecorationColor: 'var(--text-tertiary)'
        }}>
          <span style={{ opacity: 0.35, marginRight: '6px', fontSize: '10px' }}>{index + 1}.</span>
          {topic.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          <span style={{
            font: "400 10px/1.6 'JetBrains Mono', monospace",
            color: 'var(--text-tertiary)'
          }}>
            {topic.duration}
          </span>
          <span className={`status-badge ${badgeClass}`}>
            {statusText}
          </span>
        </div>
      </div>
      
      {/* Right: Action Button */}
      {showButton && (
        <button 
          className="tappable"
          onClick={onAdvance}
          style={{
            background: btnBg,
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            padding: '9px 14px',
            font: "600 11px/1 'JetBrains Mono', monospace",
            letterSpacing: '0.3px',
            cursor: 'pointer',
            boxShadow: btnShadow,
            flexShrink: 0
          }}
        >
          {btnLabel}
        </button>
      )}
    </div>
  )
}
