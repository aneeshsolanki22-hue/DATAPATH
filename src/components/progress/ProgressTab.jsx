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
      <div>
        <h1 style={{
          font: "800 28px/1.1 'Syne', sans-serif",
          letterSpacing: '-1px',
          color: 'var(--text-primary)'
        }}>
          Analytics
        </h1>
        <p style={{
          font: "400 13px/1.8 'JetBrains Mono', monospace",
          color: 'var(--text-secondary)',
          marginTop: '4px'
        }}>
          Deep dive into your mastery.
        </p>
      </div>

      {/* ─── Stat Cards ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            font: "600 9px/1 'JetBrains Mono', monospace",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>Touched</span>
          <span style={{
            font: "800 46px/0.88 'Syne', sans-serif",
            letterSpacing: '-2px',
            color: 'var(--amber)'
          }}>{stats.touchedPct}<span style={{ fontSize: '20px', letterSpacing: '0' }}>%</span></span>
        </div>
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
          }}>{stats.memorizedPct}<span style={{ fontSize: '20px', letterSpacing: '0' }}>%</span></span>
        </div>
      </div>

      {/* ─── Skill Radar ─── */}
      <div>
        <h2 style={{
          font: "700 20px/1.2 'Syne', sans-serif",
          marginBottom: '12px',
          color: 'var(--text-primary)'
        }}>Skill Radar</h2>
        <div className="glass-card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px 0' 
        }}>
          <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
        </div>
      </div>

      {/* ─── 30-Day Heatmap ─── */}
      <div>
        <h2 style={{
          font: "700 20px/1.2 'Syne', sans-serif",
          marginBottom: '12px',
          color: 'var(--text-primary)'
        }}>30-Day Activity</h2>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
            {activityData.map((day, i) => {
              const isToday = day.date === today
              let bg = 'rgba(255,255,255,0.04)'
              let shadow = 'none'
              
              if (day.level === 1) { bg = 'rgba(52,199,89,0.30)'; shadow = '0 0 4px rgba(52,199,89,0.15)' }
              if (day.level === 2) { bg = 'rgba(52,199,89,0.55)'; shadow = '0 0 6px rgba(52,199,89,0.25)' }
              if (day.level === 3) { bg = '#34C759'; shadow = '0 0 8px rgba(52,199,89,0.35)' }

              return (
                <div 
                  key={i} 
                  title={day.date}
                  style={{
                    aspectRatio: '1/1',
                    background: bg,
                    borderRadius: '5px',
                    boxShadow: shadow,
                    border: isToday ? '1.5px solid var(--amber)' : '1px solid transparent',
                    transition: 'all 300ms ease'
                  }}
                />
              )
            })}
          </div>
          {/* Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '12px',
            alignItems: 'center'
          }}>
            <span style={{
              font: "600 9px/1 'JetBrains Mono', monospace",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)'
            }}>30d ago</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(52,199,89,0.30)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(52,199,89,0.55)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#34C759' }} />
            </div>
            <span style={{
              font: "600 9px/1 'JetBrains Mono', monospace",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)'
            }}>Today</span>
          </div>
        </div>
      </div>

    </div>
  )
}
