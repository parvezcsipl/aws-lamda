import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetails from './ItemDetails.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<ItemDetails />} />
    </Routes>
  </Router>
)
