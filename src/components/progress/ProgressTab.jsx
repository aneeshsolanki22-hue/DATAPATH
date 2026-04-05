import React, { useEffect, useRef, useMemo } from 'react'
import { getOverallStats, get30DayActivity, getSkillProgress, todayStr } from '../../utils/ruleSystem'

const SKILL_MAPPING = {
  'Python': ['s4', 's5', 's10', 's11'],
  'NumPy': ['s6', 's7', 's17', 's18', 's19', 's20', 's21', 's22'],
  'Pandas': ['s8', 's15', 's16'],
  'Statistics': ['s21', 's22'],
  'Visualization': ['s26'],
  'Projects': ['s23', 's24', 's25']
}

export default function ProgressTab({ progress, courseData }) {
  const stats = getOverallStats(progress, courseData)
  const activityData = get30DayActivity(progress)
  const today = todayStr()

  const radarData = useMemo(() => getSkillProgress(progress, SKILL_MAPPING, courseData), [progress, courseData])
  const canvasRef = useRef(null)

  // ─── Skill Radar Canvas ───
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 2
    const displayWidth = 320
    const displayHeight = 280

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = displayWidth + 'px'
    canvas.style.height = displayHeight + 'px'

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const centerX = displayWidth / 2
    const centerY = displayHeight / 2 + 8
    const radius = 100

    ctx.clearRect(0, 0, displayWidth, displayHeight)

    const labels = Object.keys(SKILL_MAPPING)
    const sides = labels.length
    const angleStep = (Math.PI * 2) / sides

    // Draw hexagonal web layers
    for (let level = 1; level <= 5; level++) {
      const r = radius * (level / 5)
      ctx.beginPath()
      ctx.strokeStyle = level === 5 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= sides; i++) {
        const theta = i * angleStep - Math.PI / 2
        const x = centerX + r * Math.cos(theta)
        const y = centerY + r * Math.sin(theta)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Draw spokes
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 0.5
    labels.forEach((_, i) => {
      const theta = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(theta), centerY + radius * Math.sin(theta))
      ctx.stroke()
    })

    // Draw labels
    ctx.font = "500 10px 'JetBrains Mono', monospace"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    labels.forEach((label, i) => {
      const theta = i * angleStep - Math.PI / 2
      const labelR = radius + 24
      const x = centerX + labelR * Math.cos(theta)
      const y = centerY + labelR * Math.sin(theta)
      
      const val = radarData[label] || 0
      ctx.fillStyle = val > 0 ? '#F59E0B' : 'rgba(255,255,255,0.35)'
      ctx.fillText(label, x, y)
    })

    // Draw data polygon with gradient fill
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(245,158,11,0.35)')
    gradient.addColorStop(1, 'rgba(245,158,11,0.08)')

    ctx.fillStyle = gradient
    ctx.strokeStyle = '#F59E0B'
    ctx.lineWidth = 1.5
    ctx.beginPath()

    labels.forEach((label, i) => {
      const theta = i * angleStep - Math.PI / 2
      const val = radarData[label] || 0
      const r = Math.max(radius * (val / 100), 4)
      const x = centerX + r * Math.cos(theta)
      const y = centerY + r * Math.sin(theta)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data point dots
    labels.forEach((label, i) => {
      const theta = i * angleStep - Math.PI / 2
      const val = radarData[label] || 0
      const r = Math.max(radius * (val / 100), 4)
      const x = centerX + r * Math.cos(theta)
      const y = centerY + r * Math.sin(theta)

      // Outer glow
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(245,158,11,0.20)'
      ctx.fill()

      // Inner dot
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = '#F59E0B'
      ctx.fill()
    })

  }, [radarData])

  return (
    <div className="animate-fade" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* ─── Header ─── */}
      <div style={{ marginTop: '10px' }}>
        <span style={{
          font: "600 9px/1 'JetBrains Mono', monospace",
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'var(--amber)',
          display: 'block',
          marginBottom: '12px'
        }}>Performance Intelligence</span>
        <h1 style={{
          font: "400 30px/1.2 'DM Serif Display', serif",
          letterSpacing: '-0.3px',
          color: 'var(--text-primary)',
          marginBottom: '10px'
        }}>
          Deep dive into your mastery
        </h1>
        <p style={{
          font: "400 12px/1.7 'JetBrains Mono', monospace",
          color: 'var(--text-secondary)'
        }}>
          Detailed breakdown of your skill progression and consistency.
        </p>
      </div>

      {/* ─── Skill Radar Card ─── */}
      <div className="glass-card" style={{ 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h2 style={{
            font: "700 16px/1.3 'Syne', sans-serif",
            color: 'var(--text-primary)'
          }}>Skill Radar</h2>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '8px 0 0' 
        }}>
          <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
        </div>
      </div>

      {/* ─── In Progress Card (Amber) ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(245,158,11,0.30), inset 0 1px 0 rgba(255,255,255,0.20)'
      }}>
        {/* Large faded watermark number */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          font: "900 110px/1 system-ui, -apple-system, sans-serif",
          color: 'rgba(0,0,0,0.08)',
          pointerEvents: 'none'
        }}>{stats.touched}</div>
        {/* Small solid lightning icon bottom-right */}
        <div style={{
          position: 'absolute',
          right: '18px',
          bottom: '16px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.25)" stroke="none">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span style={{
          font: "600 9px/1 'JetBrains Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.50)',
          display: 'block',
          marginBottom: '10px'
        }}>In Progress</span>
        <span style={{
          font: "800 52px/1 system-ui, -apple-system, sans-serif",
          letterSpacing: '-2px',
          color: '#000000',
          display: 'block',
          marginBottom: '6px'
        }}>{String(stats.touched).padStart(2, '0')}</span>
        <span style={{
          font: "500 12px/1 'JetBrains Mono', monospace",
          color: 'rgba(0,0,0,0.45)',
          letterSpacing: '0.3px'
        }}>Active Nodes</span>
      </div>

      {/* ─── Mastered Card (Green) ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.25), inset 0 1px 0 rgba(255,255,255,0.18)'
      }}>
        {/* Large faded star watermark center-right */}
        <div style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.15
        }}>
          <svg width="90" height="90" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M12 2l3.09 3.09L19.5 5.5l-.41 4.41L22 13l-3.09 3.09L19.5 20.5l-4.41-.41L12 22l-3.09-3.09L4.5 18.5l.41-4.41L3 11l3.09-3.09L4.5 3.5l4.41.41z"/>
          </svg>
        </div>
        {/* Small solid verified badge bottom-right */}
        <div style={{
          position: 'absolute',
          right: '18px',
          bottom: '16px'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)" stroke="none">
            <path d="M12 2l3.09 3.09L19.5 5.5l-.41 4.41L22 13l-3.09 3.09L19.5 20.5l-4.41-.41L12 22l-3.09-3.09L4.5 18.5l.41-4.41L3 11l3.09-3.09L4.5 3.5l4.41.41z"/>
            <polyline stroke="white" strokeWidth="3" fill="none" points="9 12 11 14 15 10"/>
          </svg>
        </div>
        <span style={{
          font: "600 9px/1 'JetBrains Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)',
          display: 'block',
          marginBottom: '10px'
        }}>Mastered</span>
        <span style={{
          font: "800 52px/1 system-ui, -apple-system, sans-serif",
          letterSpacing: '-2px',
          color: '#ffffff',
          display: 'block',
          marginBottom: '6px'
        }}>{String(stats.memorized).padStart(2, '0')}</span>
        <span style={{
          font: "500 12px/1 'JetBrains Mono', monospace",
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.3px'
        }}>Skills Verified</span>
      </div>

      {/* ─── 30-Day Activity Heatmap ─── */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <h2 style={{
          font: "700 16px/1.3 'Syne', sans-serif",
          color: 'var(--text-primary)',
          marginBottom: '4px'
        }}>30-Day Activity</h2>
        <p style={{
          font: "400 10px/1.6 'JetBrains Mono', monospace",
          color: 'var(--text-tertiary)',
          marginBottom: '16px'
        }}>Daily contribution and mastery streaks</p>

        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px'
        }}>
          <span style={{
            font: "600 8px/1 'JetBrains Mono', monospace",
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}>Less</span>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.1)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(245,158,11,0.22)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(245,158,11,0.50)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F59E0B' }} />
          </div>
          <span style={{
            font: "600 8px/1 'JetBrains Mono', monospace",
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}>More</span>
        </div>

        {/* Heatmap Grid — 6 columns × 5 rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {activityData.map((day, i) => {
            const isToday = day.date === today
            let bg = 'rgba(245,158,11,0.06)'
            let shadow = 'none'
            let border = '1px solid rgba(245,158,11,0.08)'
            
            if (day.level === 1) { bg = 'rgba(245,158,11,0.22)'; shadow = '0 0 4px rgba(245,158,11,0.12)'; border = '1px solid rgba(245,158,11,0.15)' }
            if (day.level === 2) { bg = 'rgba(245,158,11,0.50)'; shadow = '0 0 6px rgba(245,158,11,0.22)'; border = '1px solid rgba(245,158,11,0.30)' }
            if (day.level === 3) { bg = '#F59E0B'; shadow = '0 0 10px rgba(245,158,11,0.35)'; border = '1px solid rgba(245,158,11,0.50)' }

            if (isToday) { border = '2px solid #ffffff' }

            return (
              <div 
                key={i} 
                title={day.date}
                style={{
                  aspectRatio: '1/1',
                  background: bg,
                  borderRadius: '6px',
                  boxShadow: shadow,
                  border: border,
                  transition: 'all 300ms ease'
                }}
              />
            )
          })}
        </div>
      </div>

    </div>
  )
}
