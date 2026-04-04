// ─────────────────────────────────────────────
//  DATAPATH — localStorage Storage Helpers
// ─────────────────────────────────────────────

import { getRevisionDates, todayStr, getTopicStatus, addDays } from './ruleSystem'

const STORAGE_KEY = 'datapath_progress'

/**
 * Load all topic progress from localStorage
 * Returns: { [topicId]: { learnedDate, revision1Date, revision2Date, revision1DoneDate, revision2DoneDate } }
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/**
 * Save full progress map to localStorage
 * @param {object} progress
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('DATAPATH: Failed to save progress', e)
  }
}

/**
 * Mark a topic as Learned on today's date.
 * Schedules revision1 (+3 days) and revision2 (+6 days).
 * If already learned, does nothing.
 *
 * @param {object} progress - current progress map (will be mutated + returned)
 * @param {string} topicId
 * @returns {object} updated progress map
 */
export function markLearned(progress, topicId) {
  if (progress[topicId]?.learnedDate) return progress // already tracked

  const today = todayStr()
  const { revision1, revision2 } = getRevisionDates(today)

  const updated = {
    ...progress,
    [topicId]: {
      learnedDate: today,
      revision1Date: revision1,
      revision2Date: revision2,
      revision1DoneDate: null,
      revision2DoneDate: null,
    }
  }

  saveProgress(updated)
  return updated
}

/**
 * Mark the first revision (Day 4) as done for a topic.
 * Only applies if topic is learned and revision1 not yet done.
 *
 * @param {object} progress
 * @param {string} topicId
 * @returns {object} updated progress map
 */
export function markRevision1Done(progress, topicId) {
  const tp = progress[topicId]
  if (!tp || !tp.learnedDate || tp.revision1DoneDate) return progress

  const today = todayStr()
  
  // CRITICAL FIX: If user did the revision late, the next revision should be +3 days 
  // from TODAY, not +3 days from the original schedule.
  const newRevision2Date = addDays(today, 3)

  const updated = {
    ...progress,
    [topicId]: { 
      ...tp, 
      revision1DoneDate: today,
      revision2Date: newRevision2Date 
    }
  }

  saveProgress(updated)
  return updated
}

/**
 * Mark the second revision (Day 7) as done for a topic.
 * Only applies if revision1 is already done.
 * Once revision2 is done, topic becomes Memorized.
 *
 * @param {object} progress
 * @param {string} topicId
 * @returns {object} updated progress map
 */
export function markRevision2Done(progress, topicId) {
  const tp = progress[topicId]
  if (!tp || !tp.revision1DoneDate || tp.revision2DoneDate) return progress

  const updated = {
    ...progress,
    [topicId]: { 
      ...tp, 
      revision2DoneDate: todayStr() 
    }
  }

  saveProgress(updated)
  return updated
}

/**
 * Smart action: performs the correct next action on a topic based on its current status.
 * - not_started → mark learned
 * - revision_due → mark revision 1 done
 * - re_revision_due → mark revision 2 done
 * - learned / memorized → no-op
 *
 * @param {object} progress
 * @param {string} topicId
 * @returns {object} updated progress map
 */
export function advanceTopic(progress, topicId) {
  const today = todayStr()
  const tp = progress[topicId]
  const status = getTopicStatus(tp, today)

  switch (status) {
    case 'not_started':    return markLearned(progress, topicId)
    case 'revision_due':   return markRevision1Done(progress, topicId)
    case 're_revision_due': return markRevision2Done(progress, topicId)
    default:               return progress // learned / memorized — no change
  }
}

/**
 * Reset a single topic back to not_started (removes its progress entry)
 * @param {object} progress
 * @param {string} topicId
 * @returns {object} updated progress map
 */
export function resetTopic(progress, topicId) {
  const updated = { ...progress }
  delete updated[topicId]
  saveProgress(updated)
  return updated
}

/**
 * Wipe all progress (use with caution!)
 * @returns {object} empty progress map
 */
export function clearAllProgress() {
  localStorage.removeItem(STORAGE_KEY)
  return {}
}
