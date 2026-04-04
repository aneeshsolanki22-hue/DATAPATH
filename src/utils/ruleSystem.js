// ─────────────────────────────────────────────
//  DATAPATH — 1-4-7 Rule System
//  Learn Day 1 → Revise Day 4 (+3) → Re-revise Day 7 (+6) → Memorized
// ─────────────────────────────────────────────

/**
 * Format a Date object as local YYYY-MM-DD string (timezone-safe)
 */
function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Add N days to a YYYY-MM-DD string and return YYYY-MM-DD (timezone-safe)
 */
export function addDays(dateStr, days) {
  // Parse components directly to avoid UTC midnight shift
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return toLocalDateStr(date)
}

/**
 * Get today's date as local YYYY-MM-DD string (timezone-safe)
 */
export function todayStr() {
  return toLocalDateStr(new Date())
}

/**
 * Given the date a topic was learned, return scheduled revision dates
 * Day 4 = learnedDate + 3 days
 * Day 7 = learnedDate + 6 days
 */
export function getRevisionDates(learnedDate) {
  return {
    revision1: addDays(learnedDate, 3),  // Day 4
    revision2: addDays(learnedDate, 6),  // Day 7
  }
}

/**
 * Resolve the current status of a topic based on its stored progress data
 * 
 * Status flow:
 *  not_started → learned → revision_due → re_revision_due → memorized
 *
 * @param {object} topicProgress - { learnedDate, revision1Date, revision2Date, revision1DoneDate, revision2DoneDate }
 * @param {string} today - YYYY-MM-DD
 * @returns {string} status
 */
export function getTopicStatus(topicProgress, today = todayStr()) {
  if (!topicProgress || !topicProgress.learnedDate) return 'not_started'

  const { revision1Date, revision2Date, revision1DoneDate, revision2DoneDate } = topicProgress

  // Both revisions done → memorized
  if (revision1DoneDate && revision2DoneDate) return 'memorized'

  // First revision done, waiting for or past revision 2 date
  if (revision1DoneDate) {
    if (today >= revision2Date) return 're_revision_due'
    return 'learned' // revision 2 not yet due
  }

  // No revisions done yet
  if (today >= revision1Date) return 'revision_due'

  // Learned but revision not due yet
  return 'learned'
}

/**
 * Get all topics that have a revision due TODAY
 * Returns array of { sectionId, sectionTitle, topicId, topicTitle, type: 'revision' | 're_revision' }
 *
 * @param {object} progress - { [topicId]: topicProgressData }
 * @param {Array}  courseData - the full course sections array
 * @param {string} today - YYYY-MM-DD
 */
export function getTodaysTasks(progress, courseData, today = todayStr()) {
  const tasks = []

  for (const section of courseData) {
    for (const topic of section.topics) {
      const tp = progress[topic.id]
      if (!tp || !tp.learnedDate) continue

      const status = getTopicStatus(tp, today)

      if (status === 'revision_due') {
        tasks.push({
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          topicId: topic.id,
          topicTitle: topic.title,
          type: 'revision',
          scheduledDate: tp.revision1Date,
        })
      }

      if (status === 're_revision_due') {
        tasks.push({
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          topicId: topic.id,
          topicTitle: topic.title,
          type: 're_revision',
          scheduledDate: tp.revision2Date,
        })
      }
    }
  }

  return tasks
}

/**
 * Calculate overall progress stats
 * @param {object} progress - full progress map
 * @param {Array}  courseData
 * @returns {{ total, touched, memorized, touchedPct, memorizedPct }}
 */
export function getOverallStats(progress, courseData) {
  let total = 0
  let touched = 0
  let memorized = 0
  const today = todayStr()

  for (const section of courseData) {
    for (const topic of section.topics) {
      total++
      const tp = progress[topic.id]
      if (!tp || !tp.learnedDate) continue
      touched++
      if (getTopicStatus(tp, today) === 'memorized') memorized++
    }
  }

  return {
    total,
    touched,
    memorized,
    touchedPct: total ? Math.round((touched / total) * 100) : 0,
    memorizedPct: total ? Math.round((memorized / total) * 100) : 0,
  }
}

/**
 * Get progress % per skill for the radar chart
 * @param {object} progress
 * @param {object} skillSections - { SkillName: ['s4', 's5', ...] }
 * @param {Array}  courseData
 * @returns {object} { Python: 45, NumPy: 10, ... } — % memorized per skill
 */
export function getSkillProgress(progress, skillSections, courseData) {
  const today = todayStr()
  const result = {}

  for (const [skill, sectionIds] of Object.entries(skillSections)) {
    let total = 0
    let memorized = 0

    for (const section of courseData) {
      if (!sectionIds.includes(section.id)) continue
      for (const topic of section.topics) {
        total++
        const tp = progress[topic.id]
        if (tp && getTopicStatus(tp, today) === 'memorized') memorized++
      }
    }

    result[skill] = total ? Math.round((memorized / total) * 100) : 0
  }

  return result
}

/**
 * Build 30-day activity data for the calendar heatmap
 * Returns array of 30 objects: { date, level }
 * level: 0 = no activity, 1 = learned, 2 = revised, 3 = memorized
 *
 * @param {object} progress
 */
export function get30DayActivity(progress) {
  const today = new Date()
  const days = []

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = toLocalDateStr(d)

    let level = 0

    for (const tp of Object.values(progress)) {
      if (!tp || !tp.learnedDate) continue

      if (tp.learnedDate === dateStr) {
        level = Math.max(level, 1)
      }
      if (tp.revision1DoneDate === dateStr || tp.revision2DoneDate === dateStr) {
        level = Math.max(level, 2)
      }
      if (tp.revision2DoneDate === dateStr) {
        level = Math.max(level, 3)
      }
    }

    days.push({ date: dateStr, level })
  }

  return days
}

/**
 * Format a date string YYYY-MM-DD to a readable label e.g. "Mon 7 Apr"
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

/**
 * Format today's date as a full readable string e.g. "Saturday, 5 April 2026"
 */
export function formatTodayFull() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
