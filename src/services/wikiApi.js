const TOPICS = [
  'Pomodoro_technique',
  'Time_management',
  'Getting_Things_Done',
  'Flow_(psychology)',
  'Procrastination',
  'Mindfulness',
  'Deep_work',
  'Habit_(psychology)',
  'Goal_setting',
  'Self-discipline',
  'Cognitive_load',
  'Deliberate_practice',
]

export async function fetchRandomTip() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)]
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch tip')
  const data = await res.json()
  return {
    title: data.title.replace(/_/g, ' '),
    extract: data.extract,
    url: data.content_urls?.desktop?.page || '#',
  }
}

export async function fetchTipByTopic(topic) {
  const formatted = topic.trim().replace(/\s+/g, '_')
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${formatted}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Topic not found')
  const data = await res.json()
  return {
    title: data.title.replace(/_/g, ' '),
    extract: data.extract,
    url: data.content_urls?.desktop?.page || '#',
  }
}
