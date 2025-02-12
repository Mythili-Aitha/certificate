import './App.css';
import CertificationPage from './Components/CertificationPage.js';
import HomePage from './Components/HomePage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewPage from './Components/ViewPage.js';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/addcertificate" element={<CertificationPage />} />
        <Route path='/viewpage/:id' element={<ViewPage />} />
      </Routes>
   
    </BrowserRouter>
    
   
  );
}

export default App;
