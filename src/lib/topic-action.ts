export type TopicAction =
  | { type: 'map' | 'pillar' | 'explore' | 'home' | 'saved' | 'sources' | 'overview' }
  | { type: 'event'; id: string }
  | { type: 'resume' }
  | { type: 'search'; query: string }
