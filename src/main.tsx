import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'maplibre-gl/dist/maplibre-gl.css'
import './styles.css'
import './learning.css'
import './journeys.css'
import './experience.css'
import './reading.css'
import './usability.css'
import './atlas-layout.css'
import './exploration.css'
import './mobile-sheet.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
