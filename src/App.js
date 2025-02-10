import { useState } from 'react';
import './App.css';
import CertificationPage from './Components/CertificationPage.js';
import HomePage from './Components/HomePage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewPage from './Components/ViewPage.js';

function App() {
  const [certificates, setCertificates] = useState([]);
  const handleSaveCertificate = (newCertificate) => {
    setCertificates([...certificates, newCertificate]);
  };
  const handleUpdateCertificate = (updatedCertificate) => {
    setCertificates(certificates.map(cert => 
      cert.certificationName === updatedCertificate.certificationName ? updatedCertificate : cert
    ));
  };
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={ <HomePage certificates={certificates} />} />
        <Route path="/addcertificate" element={<CertificationPage onSaveCertificate={handleSaveCertificate} onUpdateCertificate={handleUpdateCertificate}/>} />
        <Route path='/viewpage' element={<ViewPage />} />
      </Routes>
   
    </BrowserRouter>
    
   
  );
}

export default App;
