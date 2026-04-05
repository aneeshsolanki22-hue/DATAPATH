import React from 'react'
import { getOverallStats, getTodaysTasks, formatTodayFull } from '../../utils/ruleSystem'

export default function HomeTab({ progress, onAdvance, courseData }) {
  const stats = getOverallStats(progress, courseData)
  const todaysTasks = getTodaysTasks(progress, courseData)

  const revisionTasks = todaysTasks.filter(t => t.type === 'revision')
  const reRevisionTasks = todaysTasks.filter(t => t.type === 're_revision')

  return (
    <div className="animate-fade" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* ─── Header ─── */}
      <div style={{ marginTop: '10px' }}>
        <h1 style={{
          font: "800 28px/1.1 'Syne', sans-serif",
          letterSpacing: '-1px',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          Hello, <span style={{ color: 'var(--amber)' }}>TOUKIR</span>{' '}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Active Topics */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            font: "600 9px/1 'JetBrains Mono', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>Active Topics</span>
          <span style={{
            font: "800 46px/0.88 'Syne', sans-serif",
            letterSpacing: '-2px',
            color: 'var(--amber)'
          }}>{stats.touched}</span>
        </div>

        {/* Mastered */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            font: "600 9px/1 'JetBrains Mono', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>Mastered</span>
          <span style={{
            font: "800 46px/0.88 'Syne', sans-serif",
            letterSpacing: '-2px',
            color: 'var(--green)'
          }}>{stats.memorized}</span>
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
