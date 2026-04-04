import React, { useEffect, useRef, useMemo } from 'react'
import { getOverallStats, get30DayActivity, getSkillProgress } from '../../utils/ruleSystem'
// 8.3 Skill Radar Matrix mapping from Blueprint (Static Constant)
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

  const radarData = useMemo(() => getSkillProgress(progress, SKILL_MAPPING, courseData), [progress, courseData])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2 + 10
    const radius = 90

    // Clear canvas for hot-reloads
    ctx.clearRect(0, 0, width, height)

    const labels = Object.keys(SKILL_MAPPING)
    const sides = labels.length
    const angleStep = (Math.PI * 2) / sides

    // Draw background hexagon web
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    
    for (let level = 1; level <= 5; level++) {
      const r = radius * (level / 5)
      ctx.beginPath()
      for (let i = 0; i <= sides; i++) {
        const theta = i * angleStep - Math.PI / 2
        const x = centerX + r * Math.cos(theta)
        const y = centerY + r * Math.sin(theta)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Draw axes & labels
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    labels.forEach((label, i) => {
      const theta = i * angleStep - Math.PI / 2
      // Draw axis line (spoke)
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(theta), centerY + radius * Math.sin(theta))
      ctx.stroke()

      // Draw label slightly outside the web
      const labelRadius = radius + 22
      ctx.fillText(label, centerX + labelRadius * Math.cos(theta), centerY + labelRadius * Math.sin(theta))
    })

    // Draw Data Polygon Fill
    ctx.fillStyle = 'rgba(0, 122, 255, 0.3)'
    ctx.strokeStyle = 'rgba(0, 122, 255, 1)'
    ctx.lineWidth = 2
    ctx.beginPath()

    labels.forEach((label, i) => {
      const theta = i * angleStep - Math.PI / 2
      const val = radarData[label] || 0
      // We enforce a minimum radius of 3px so it draws a tiny dot at center even if 0%
      const r = Math.max(radius * (val / 100), 3) 
      const x = centerX + r * Math.cos(theta)
      const y = centerY + r * Math.sin(theta)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

  }, [radarData])

  return (
    <div className="animate-fade" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
          Deep dive into your mastery.
        </p>
      </div>

      {/* 8.2 Two stat cards: "Touched X%" · "Mastered Y%" */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Touched</span>
          <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>{stats.touchedPct}%</span>
        </div>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Mastered</span>
          <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--success)' }}>{stats.memorizedPct}%</span>
        </div>
      </div>

      {/* 8.3 Skill Radar (Pure Canvas) */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.3px' }}>Skill Radar</h2>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
          <canvas ref={canvasRef} width={300} height={260} style={{ display: 'block', maxWidth: '100%' }} />
        </div>
      </div>

      {/* 8.4 30-Day Activity Heatmap */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.3px' }}>30-Day Heatmap</h2>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
            {activityData.map((day, i) => {
              let bg = 'rgba(255,255,255,0.06)'
              if (day.level === 1) bg = 'rgba(48, 209, 88, 0.3)'
              if (day.level === 2) bg = 'rgba(48, 209, 88, 0.6)'
              if (day.level === 3) bg = 'var(--success)'
              
              return (
                <div 
                  key={i} 
                  title={day.date}
                  style={{
                    aspectRatio: '1/1',
                    background: bg,
                    borderRadius: '4px',
                    transition: 'background 0.5s ease'
                  }}
                />
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '12px', fontWeight: 600, textTransform: 'uppercase' }}>
            <span>30d ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>

    </div>
  )
}
