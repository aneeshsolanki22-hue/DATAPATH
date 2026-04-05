import React from 'react'
import { getOverallStats, getTodaysTasks, formatTodayFull } from '../../utils/ruleSystem'

export default function HomeTab({ progress, onAdvance, courseData }) {
  const stats = getOverallStats(progress, courseData)
  const todaysTasks = getTodaysTasks(progress, courseData)
  const totalTopics = courseData.reduce((acc, section) => acc + (section.topics?.length || 0), 0)

  const revisionTasks = todaysTasks.filter(t => t.type === 'revision')
  const reRevisionTasks = todaysTasks.filter(t => t.type === 're_revision')

  return (
    <div className="animate-fade" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* ─── Header ─── */}
      <div style={{ marginTop: '10px' }}>
        <h1 style={{
          font: "800 28px/1.1 'Syne', sans-serif",
          letterSpacing: '-1px',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-secondary)' }}>Hello,</span> 
          <span style={{ color: 'var(--amber)' }}>TOUKIR</span>
          <span style={{ 
            display: 'inline-block', 
            animation: 'floatBounce 2s ease-in-out infinite',
            fontSize: '28px'
          }}>👋</span>
        </h1>
        <p style={{
          font: "400 10px/1.6 'JetBrains Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)'
        }}>
          {formatTodayFull()}
        </p>
      </div>

    {/* ─── Stat Cards ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        
        {/* Active Topics */}
        <div className="glass-card" style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px',
          borderRadius: '24px',
          alignItems: 'flex-start'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              font: "800 48px/1 system-ui, -apple-system, sans-serif",
              letterSpacing: '-2px',
              color: '#ffffff'
            }}>{String(stats.touched).padStart(2, '0')}</span>
            <span style={{
              font: "600 10px/1 'JetBrains Mono', monospace",
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--amber)'
            }}>Active Topics</span>
          </div>
        </div>

        {/* Mastered */}
        <div className="glass-card" style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px',
          borderRadius: '24px',
          alignItems: 'stretch'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="var(--green)" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 3.09L19.5 5.5l-.41 4.41L22 13l-3.09 3.09L19.5 20.5l-4.41-.41L12 22l-3.09-3.09L4.5 18.5l.41-4.41L3 11l3.09-3.09L4.5 3.5l4.41.41z"/>
              <polyline stroke="#1e2226" strokeWidth="3.5" points="9 12 11 14 15 10"/>
            </svg>
            <div style={{ 
              width: '28px', 
              height: '4px', 
              background: 'rgba(16, 185, 129, 0.2)', 
              borderRadius: '99px',
              marginTop: '10px'
            }}>
              <div style={{ 
                width: `${totalTopics ? Math.min(100, (stats.memorized / totalTopics) * 100) : 0}%`, 
                height: '100%', 
                background: 'var(--green)', 
                borderRadius: '99px' 
              }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              font: "800 48px/1 system-ui, -apple-system, sans-serif",
              letterSpacing: '-2px',
              color: 'var(--green)'
            }}>{String(stats.memorized).padStart(2, '0')}</span>
            <span style={{
              font: "600 10px/1 'JetBrains Mono', monospace",
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--amber)'
            }}>Mastered</span>
          </div>
        </div>

      </div>

      {/* ─── Today's Plan ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{
          font: "700 20px/1.2 'Syne', sans-serif",
          color: 'var(--text-primary)'
        }}>Today's Plan</h2>

        {todaysTasks.length === 0 ? (
          /* Empty State */
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '16px',
              animation: 'floatBounce 2s ease-in-out infinite'
            }}>🎉</div>
            <h3 style={{
              font: "700 20px/1.2 'Syne', sans-serif",
              color: 'var(--text-primary)',
              marginBottom: '10px'
            }}>All caught up!</h3>
            <p style={{
              font: "400 13px/1.8 'JetBrains Mono', monospace",
              color: 'var(--text-secondary)'
            }}>
              No revisions due today. Keep it up.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Revision Section (Day 4) */}
            {revisionTasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{
                  font: "600 9px/1 'JetBrains Mono', monospace",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--orange)'
                }}>
                  ● First Revision · Day 4
                </span>
                <div className="stagger-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {revisionTasks.map(task => (
                    <TaskCard key={task.topicId} task={task} onAdvance={() => onAdvance(task.topicId)} />
                  ))}
                </div>
              </div>
            )}

            {/* Re-Revision Section (Day 7) */}
            {reRevisionTasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{
                  font: "600 9px/1 'JetBrains Mono', monospace",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--red)'
                }}>
                  ● Final Revision · Day 7
                </span>
                <div className="stagger-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {reRevisionTasks.map(task => (
                    <TaskCard key={task.topicId} task={task} onAdvance={() => onAdvance(task.topicId)} isFinal />
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>

    </div>
  )
}

function TaskCard({ task, onAdvance, isFinal }) {
  return (
    <div className="glass-card-amber" style={{ 
      padding: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '14px' 
    }}>
      <div>
        <span style={{
          font: "600 9px/1 'JetBrains Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: '6px',
          display: 'block'
        }}>
          Section {task.sectionNumber}
        </span>
        <h4 style={{
          font: "700 16px/1.3 'Syne', sans-serif",
          color: 'var(--text-primary)'
        }}>
          {task.topicTitle}
        </h4>
      </div>
      
      <button 
        className="tappable"
        onClick={onAdvance}
        style={{
          background: isFinal ? 'var(--green)' : 'var(--amber)',
          color: '#000000',
          font: "600 13px/1 'JetBrains Mono', monospace",
          letterSpacing: '0.3px',
          padding: '14px 20px',
          borderRadius: '14px',
          border: 'none',
          width: '100%',
          boxShadow: isFinal 
            ? 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(52,199,89,0.30)' 
            : 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(245,158,11,0.30)',
          cursor: 'pointer'
        }}
      >
        {isFinal ? 'Mark Memorized ✦' : 'Mark Revised ✓'}
      </button>
    </div>
  )
}
