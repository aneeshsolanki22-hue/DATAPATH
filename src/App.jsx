import { useState, useEffect } from 'react'
import { loadProgress, advanceTopic } from './utils/storage'
import { courseData } from './data/courseData'
import TabBar from './components/TabBar'
import './App.css'

import HomeTab from './components/home/HomeTab'
import RoadmapTab from './components/roadmap/RoadmapTab'
import ProgressTab from './components/progress/ProgressTab'

export default function App() {
  const [progress, setProgress] = useState({})
  const [activeTab, setActiveTab] = useState('home')

  // Load progress directly from localStorage on initial mount
  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  // Universal handler to advance a topic's state through the 1-4-7 rule
  // This will be passed down to all tabs so state is managed centrally here
  const handleAdvanceTopic = (topicId) => {
    setProgress(prev => advanceTopic(prev, topicId))
  }

  // Router logic
  const renderTab = () => {
    switch (activeTab) {
      case 'home': 
        return <HomeTab progress={progress} onAdvance={handleAdvanceTopic} courseData={courseData} />
      case 'roadmap': 
        return <RoadmapTab progress={progress} onAdvance={handleAdvanceTopic} courseData={courseData} />
      case 'progress': 
        return <ProgressTab progress={progress} courseData={courseData} />
      default: 
        return <HomeTab />
    }
  }

  return (
    <div className="app-container">
      {/* Scrollable Content Area */}
      <div style={{
        // Give enough bottom padding so the glass TabBar doesn't cover content
        paddingBottom: 'calc(var(--safe-bottom) + 90px)', 
        minHeight: '100vh',
        width: '100%'
      }}>
        {renderTab()}
      </div>

      {/* Fixed Bottom Glass Navigation */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
