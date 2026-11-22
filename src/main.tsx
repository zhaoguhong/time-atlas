import { setupReader } from './reader'
import './reader.css'

const reader = document.querySelector<HTMLElement>('[data-static-reader]')
const topic = document.querySelector<HTMLScriptElement>('#reading-topic')
const startAtlas = async () => (await import('./app-entry')).mountAtlas()
const { retryAtlasCanvas, ...historyState } = history.state ?? {}
if (retryAtlasCanvas) history.replaceState(historyState, '')
if (reader) {
  if (retryAtlasCanvas) void startAtlas().catch(() => setupReader(reader, startAtlas))
  else setupReader(reader, startAtlas)
} else if (topic) void import('./topic-entry').then(({ mountTopic }) => mountTopic(topic))
else void startAtlas()
