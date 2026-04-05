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
  const handleAdvanceTopic = (topicId) => {
    setProgress(prev => advanceTopic(prev, topicId))
  }

  // Router logic
  const renderTab = () => {
    switch (activeTab) {
      case 'home': 
        return <HomeTab progress={progress} onAdvance={handleAdvanceTopic} courseData={courseData} setActiveTab={setActiveTab} />
      case 'roadmap': 
        return <RoadmapTab progress={progress} onAdvance={handleAdvanceTopic} courseData={courseData} />
      case 'progress': 
        return <ProgressTab progress={progress} courseData={courseData} />
      default: 
        return <HomeTab progress={progress} onAdvance={handleAdvanceTopic} courseData={courseData} setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="app-container depth-bg">
      {/* Scrollable Content Area */}
      <div className="screen-content">
        {renderTab()}
      </div>

      {/* Fixed Bottom Glass Navigation */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
