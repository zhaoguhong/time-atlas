import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './atlas-styles'
import type { TopicAction } from './lib/topic-action'

export function mountAtlas(
  root = createRoot(document.getElementById('root')!),
  action?: TopicAction,
) {
  root.render(
    <React.StrictMode>
      <App topicAction={action} />
    </React.StrictMode>,
  )
}
