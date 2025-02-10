import React from 'react'
import { Button, Card } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ViewPage() {
    const navigate= useNavigate()
    const location = useLocation()
    const certificate = location.state?.certificate || null;
  return (
    <>
    <Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}>
    
      {certificate ? (
    <Card sx={{ padding: 2, marginTop: 2, cursor: "pointer" }} >
        <Button variant="contained" size="small" onClick={() => navigate("/addcertificate", { state: { certificate, isEditing: true } })}>Edit </Button>
      <h3 className='heading'>{certificate.certificationName}</h3>
      <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
      <p><strong>Start Date:</strong> {certificate.startDate}</p>
      <p><strong>End Date:</strong> {certificate.endDate}</p>
    </Card>
    ) : null}

      </Card>
    </>
  )
}
