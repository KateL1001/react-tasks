import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
// import App from './taskUseCallBack'
// import App from './taskUseMemo'
// import App from './taskReactMemo'
import App from './taskUseMemo2'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
