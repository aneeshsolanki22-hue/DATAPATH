import React from 'react'
import { getOverallStats, getTodaysTasks, formatTodayFull } from '../../utils/ruleSystem'

export default function HomeTab({ progress, onAdvance, courseData }) {
  // Compute data based on current state
  const stats = getOverallStats(progress, courseData)
  const todaysTasks = getTodaysTasks(progress, courseData)

  const revisionTasks = todaysTasks.filter(t => t.type === 'revision')
  const reRevisionTasks = todaysTasks.filter(t => t.type === 're_revision')

  return (
    <div className="animate-fade" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* 6.2 Header */}
      <div style={{ marginTop: '10px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px' }}>
          Hello, TOUKIR <span style={{ display: 'inline-block', animation: 'spring-bounce 2s infinite alternate' }}>👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500, letterSpacing: '0.3px' }}>
          {formatTodayFull()}
        </p>
      </div>

      {/* 6.3 Stat cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Topics</span>
          <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent)' }}>{stats.touched}</span>
        </div>
        <div className="glass-card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mastered</span>
          <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--success)' }}>{stats.memorized}</span>
        </div>
      </div>

      {/* 6.4 Today's Plan */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px' }}>Today's Plan</h2>

        {todaysTasks.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>All caught up!</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>You have no revisions due today. Everything is perfectly on track.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Revision Section (Day 4) */}
            {revisionTasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  First Revision (Day 4)
                </h3>
                {revisionTasks.map(task => (
                  <TaskCard key={task.topicId} task={task} onAdvance={() => onAdvance(task.topicId)} />
                ))}
              </div>
            )}

            {/* Re-Revision Section (Day 7) */}
            {reRevisionTasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Final Revision (Day 7)
                </h3>
                {reRevisionTasks.map(task => (
                  <TaskCard key={task.topicId} task={task} onAdvance={() => onAdvance(task.topicId)} />
                ))}
              </div>
            )}
            
          </div>
        )}
      </div>

    </div>
  )
}

function TaskCard({ task, onAdvance }) {
  const isFinal = task.type === 're_revision'
  return (
    <div className="glass-card animate-slide" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
          Section {task.sectionNumber}
        </span>
        <h4 style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.4, color: 'var(--text)' }}>
          {task.topicTitle}
        </h4>
      </div>
      
      <button 
        className="ios-button primary" 
        onClick={onAdvance}
        style={{ 
          padding: '12px 0',
          fontSize: '15px',
          background: isFinal ? 'var(--success)' : 'var(--accent)'
        }}
      >
        {isFinal ? 'Mark Memorized ✨' : 'Mark Revised ✓'}
      </button>
    </div>
  )
}
