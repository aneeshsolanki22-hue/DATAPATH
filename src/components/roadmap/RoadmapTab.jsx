import React, { useState } from 'react'
import { getTopicStatus, todayStr } from '../../utils/ruleSystem'

export default function RoadmapTab({ progress, onAdvance, courseData }) {
  // Compute top stats
  const totalSections = courseData.length
  let totalTopics = 0
  let startedTopics = 0

  courseData.forEach(s => {
    totalTopics += s.topics.length
    s.topics.forEach(t => {
      if (progress[t.id] && progress[t.id].learnedDate) {
        startedTopics++
      }
    })
  })

  return (
    <div className="animate-fade" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 7.2 Header & Stats */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '16px' }}>
          Course Roadmap
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <StatChip icon="📁" label={`${totalSections} Sections`} />
          <StatChip icon="📄" label={`${totalTopics} Topics`} />
          <StatChip icon="⏱️" label="21.5h Total" />
          <StatChip icon="🔥" label={`${startedTopics} Started`} highlight />
        </div>
      </div>

      {/* 7.3 Accordion list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {courseData.map(section => (
          <SectionCard 
            key={section.id} 
            section={section} 
            progress={progress} 
            onAdvance={onAdvance} 
          />
        ))}
      </div>
      
    </div>
  )
}

function StatChip({ icon, label, highlight }) {
  return (
    <div style={{
      background: highlight ? 'rgba(0, 122, 255, 0.15)' : 'var(--glass)',
      border: `1px solid ${highlight ? 'rgba(0, 122, 255, 0.3)' : 'var(--glass-border)'}`,
      padding: '8px 12px',
      borderRadius: '16px',
      fontSize: '13px',
      fontWeight: 600,
      color: highlight ? 'var(--accent)' : 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: highlight ? '0 2px 8px rgba(0, 122, 255, 0.2)' : 'none'
    }}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function SectionCard({ section, progress, onAdvance }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Calculate section progress
  const total = section.topics.length
  let memorizedCount = 0
  const today = todayStr()
  
  section.topics.forEach(t => {
    const status = getTopicStatus(progress[t.id], today)
    if (status === 'memorized') memorizedCount++
  })
  
  const percent = total === 0 ? 0 : Math.round((memorizedCount / total) * 100)
  const isComplete = percent === 100

  return (
    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header (Clickable for Accordion) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
      >
        <div style={{ flex: 1, paddingRight: '12px' }}>
          <span style={{ fontSize: '12px', color: isComplete ? 'var(--success)' : 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
            Section {section.number}
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: 'var(--text)' }}>
            {section.title}
          </h3>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 500 }}>
            {memorizedCount} / {total} Mastered
          </div>
        </div>
        
        <div style={{ 
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          color: 'var(--text)',
          background: 'rgba(255,255,255,0.1)',
          width: '36px', height: '36px', borderRadius: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px'
        }}>
          ▼
        </div>
      </div>

      {/* Progress Bar (Always visible) */}
      <div className="progress-bar-container" style={{ height: '8px', borderRadius: '4px' }}>
        <div className="progress-bar-fill" style={{ width: `${percent}%`, borderRadius: '4px' }} />
      </div>

      {/* Expanded Content (Topics List) */}
      {isExpanded && (
        <div className="animate-slide" style={{ 
          display: 'flex', flexDirection: 'column', marginTop: '4px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--glass-border)', overflow: 'hidden' 
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
  )
}

function TopicRow({ topic, index, topicProgress, onAdvance, isLast }) {
  const today = todayStr()
  const status = getTopicStatus(topicProgress, today)

  // Status visual mapping
  let badgeClass = ''
  let statusText = ''
  
  if (status === 'not_started') { badgeClass = ''; statusText = 'Not Started' }
  else if (status === 'learned') { badgeClass = 'learned'; statusText = 'Learning' }
  else if (status === 'revision_due') { badgeClass = 'revision_due'; statusText = 'Revise (Day 4)' }
  else if (status === 're_revision_due') { badgeClass = 're_revision_due'; statusText = 'Revise (Day 7)' }
  else if (status === 'memorized') { badgeClass = 'memorized'; statusText = 'Memorized ✨' }

  return (
    <div style={{ 
      padding: '16px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)'
    }}>
      {/* Left side: Title + Duration */}
      <div style={{ flex: 1, paddingRight: '16px' }}>
        <div style={{ fontSize: '15px', fontWeight: 500, color: status === 'memorized' ? 'var(--text-secondary)' : 'var(--text)', lineHeight: 1.4 }}>
          <span style={{ opacity: 0.4, marginRight: '6px' }}>{index + 1}.</span>
          {topic.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {topic.duration}
          </span>
          <span className={`status-badge ${badgeClass}`} style={{ 
            background: status === 'not_started' ? 'rgba(255,255,255,0.1)' : undefined, 
            color: status === 'not_started' ? 'rgba(255,255,255,0.5)' : undefined 
          }}>
            {statusText}
          </span>
        </div>
      </div>
      
      {/* Right side: Action Button */}
      {status !== 'memorized' && status !== 'learned' && (
        <button 
          onClick={onAdvance}
          style={{
            background: status === 'not_started' ? 'var(--accent)' : 'var(--success)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: status === 'not_started' ? '0 4px 12px rgba(0, 122, 255, 0.3)' : '0 4px 12px rgba(48, 209, 88, 0.3)'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {status === 'not_started' ? 'Start' : 'Done ✓'}
        </button>
      )}
    </div>
  )
}
