import './App.css';
import CertificationPage from './Components/CertificationPage.js';
import HomePage from './Components/HomePage.js';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/addcertificate" element={<CertificationPage />} />
      </Routes>
   
    </BrowserRouter>
    
   
  );
}

export default App;
