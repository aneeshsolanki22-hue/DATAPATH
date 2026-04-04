import React from 'react'

export default function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'roadmap', icon: '📚', label: 'Roadmap' },
    { id: 'progress', icon: '📊', label: 'Progress' }
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      // iOS specific safe-area logic + base padding
      paddingBottom: 'calc(var(--safe-bottom) + 12px)',
      paddingTop: '12px',
      background: 'rgba(20, 20, 22, 0.75)', // Deep iOS glass
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderTop: '1px solid var(--glass-border)',
      display: 'flex',
      justifyContent: 'space-around',
      zIndex: 100
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-apple)',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              transition: 'color 0.2s ease',
              width: '70px'
            }}
          >
            <span style={{ 
              fontSize: '24px', 
              /* Desaturate inactive icons, give active icons a slight neon pop */
              filter: isActive ? 'drop-shadow(0 0 6px rgba(0, 122, 255, 0.4))' : 'grayscale(100%) opacity(50%)',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1)'
            }}>
              {tab.icon}
            </span>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '0.2px'
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
