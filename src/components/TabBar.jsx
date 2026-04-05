import React from 'react'

const HomeIcon = ({ active, animating }) => (
  <svg className={animating ? 'draw-icon' : ''} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#F59E0B' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path style={{ '--len': 72 }} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline style={{ '--len': 30 }} points="9 22 9 12 15 12 15 22" />
  </svg>
)

const RoadmapIcon = ({ active, animating }) => (
  <svg className={animating ? 'draw-icon' : ''} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#F59E0B' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path style={{ '--len': 20 }} d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path style={{ '--len': 75 }} d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    <line style={{ '--len': 10 }} x1="8" y1="7" x2="16" y2="7" />
    <line style={{ '--len': 8 }} x1="8" y1="11" x2="13" y2="11" />
  </svg>
)

const ProgressIcon = ({ active, animating }) => (
  <svg className={animating ? 'draw-icon' : ''} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#F59E0B' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline style={{ '--len': 36 }} points="1 18 8.5 10.5 13.5 15.5 23 6" />
    <polyline style={{ '--len': 16 }} points="17 6 23 6 23 12" />
  </svg>
)

export default function TabBar({ activeTab, setActiveTab }) {
  const [animatingTab, setAnimatingTab] = React.useState(null)
  const timerRef = React.useRef(null)

  const handleTabClick = (id) => {
    setActiveTab(id)
    setAnimatingTab(id)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setAnimatingTab(null)
    }, 1100)
  }

  const tabs = [
    { id: 'home', Icon: HomeIcon, label: 'Home' },
    { id: 'roadmap', Icon: RoadmapIcon, label: 'Roadmap' },
    { id: 'progress', Icon: ProgressIcon, label: 'Progress' }
  ]

  return (
    <div className="glass-nav" style={{
      position: 'fixed',
      bottom: 'max(env(safe-area-inset-bottom, 16px), 16px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '398px',
      display: 'flex',
      zIndex: 100,
      padding: '2px 0'
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className="tappable nav-tab"
            style={{
              flex: 1,
              padding: '10px 0 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              position: 'relative',
              transition: `all 160ms cubic-bezier(0.4, 0, 0, 1)`
            }}
          >
            {/* Icon */}
            <div style={{
              transition: 'transform 200ms cubic-bezier(0.22, 0.68, 0, 1.2)',
              transform: isActive ? 'scale(1.1) translateY(-1px)' : 'scale(1)',
              filter: isActive ? 'drop-shadow(0 0 6px rgba(245,158,11,0.35))' : 'none'
            }}>
              <tab.Icon active={isActive} animating={animatingTab === tab.id} />
            </div>

            {/* Label */}
            <span style={{
              font: `${isActive ? 600 : 400} 9px/1 'JetBrains Mono', monospace`,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: isActive ? '#F59E0B' : '#8E8E93',
              transition: 'color 160ms ease'
            }}>
              {tab.label}
            </span>

            {/* Active indicator pill */}
            {isActive && (
              <div style={{
                width: '20px',
                height: '3px',
                background: '#F59E0B',
                borderRadius: '9999px',
                marginTop: '2px',
                boxShadow: '0 0 8px rgba(245,158,11,0.4)',
                animation: 'scaleIn 200ms cubic-bezier(0.22, 0.68, 0, 1.2) both'
              }} />
            )}
          </button>
        )
      })}
      </div>
  )
}
