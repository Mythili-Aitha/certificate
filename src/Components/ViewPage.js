import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom';

const REST_API_BASE_URL = "http://localhost:8080/api";

export default function ViewPage() {
    const navigate= useNavigate()
    const { id } = useParams(); 
    const [certificate, setCertificate] = useState(null);

    useEffect(() => {
      if (!id) {
        console.error("No certificate ID found.");
        return;
    }
      axios.get(`${REST_API_BASE_URL}/certificates/${id}`)
        .then(response => setCertificate(response.data))
        .catch(error => console.error("Error fetching certificate:", error));
    }, [id]);
  
  return (
    <>
    <Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}>
    <Card sx={{ padding: 2, marginTop: 2 }}>
    <Button variant="contained" size="small" onClick={() => navigate("/addcertificate", { state: { certificate, isEditing: true } })}>Edit </Button>
    {certificate ? (
  <div>
    <h2>{certificate.certificationName}</h2>
    <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
    <p><strong>License Number:</strong>{certificate.licenseNumber}</p>
    <p><strong>Start Date:</strong> {certificate.startDate} - <strong>End Date:</strong> {certificate.endDate}</p>
    <p><strong>Remaining Days for Expiration:</strong> {certificate.remainingDays}</p>
    <p><strong>Number of Documents:</strong> {certificate.documents ? certificate.documents.length : 0}</p>
    {certificate.documents && certificate.documents.length > 0 && (
    <>
    <p><strong>Documents:</strong></p>
    {certificate.documents.map((doc, index) => (
      <div key={index}>
        <p>{doc.fileName}</p>
        {doc.fileName.match(/\.(jpeg|jpg|png|gif)$/) ? (
          <img src={`${REST_API_BASE_URL}/documents/uploads/${doc.fileName}`} 
               alt="Document" 
               style={{ width: "200px", height: "auto" }} />
        ) : (
          <a href={`${REST_API_BASE_URL}/documents/uploads/${doc.fileName}`} 
             target="_blank" 
             rel="noopener noreferrer">Download File</a>
        )}
      </div>
    ))}
  </>
)}
  </div>
  ) : <p>Loading certificate details...</p>}
    </Card>
      </Card>
    </>
  )
}
