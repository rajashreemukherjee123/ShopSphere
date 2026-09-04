import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {Provider} from "react-redux";
import Store2 from './redux/Store2.js';


createRoot(document.getElementById('root')).render(
  <Provider store={Store2}>
    
    <StrictMode>
      <App />
    </StrictMode>
    
  </Provider>
)
