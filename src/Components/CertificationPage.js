import { Button, Card, styled, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  useLocation, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

export default function CertificationPage({onSaveCertificate, onUpdateCertificate }) {
    const navigate = useNavigate()
    const location = useLocation()
    const existingCertificate = location.state?.certificate || null;
    const isEditing = location.state?.isEditing || false;
    const [certification, setCertification] = useState({
        certificationName: "",
        issuedBy: "",
        liscenceNumber: "",
        url: "",
        startDate: null,
        endDate: null
      });
      useEffect(() => {
        if (existingCertificate) {
          setCertification(existingCertificate);
        }
      }, [existingCertificate]);
    
      const handleChange = (event, field) => {
        if (field) {
            setCertification((prev) => ({ ...prev, [field]: event ? dayjs(event).format("YYYY-MM-DD") : "" }));
          } else {
            const { id, value } = event.target;
            setCertification((prev) => ({ ...prev, [id]: value }));
          }
      };
      const handleSubmit = () => {
        if (isEditing) {
          onUpdateCertificate(certification); 
        } else {
          onSaveCertificate(certification); 
        }
        navigate("/");
      };

      const VisuallyHiddenInput=styled('input')({ clipPath:'insert(50%)', height:1, overflow:'hidden',clip: 'rect(0 0 0 0)',position: 'absolute',whiteSpace: 'nowrap',
        width: 1,})
    
  return (
    <>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}> 
        <Box><Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button></Box>
    <Box sx={{display:"flex", flexDirection:"column", gap:1, alignItems:"flex-start"}}>
          <TextField id="certificationName" variant="outlined" value={certification.certificationName} label="Certification Name" onChange={handleChange} />
          <TextField id="issuedBy" variant="outlined" value={certification.issuedBy} label="Issued By" onChange={handleChange} />
          <TextField id="liscenceNumber" variant="outlined" value={certification.liscenceNumber} label="License Number" onChange={handleChange} />
          <TextField id="url" variant="outlined" value={certification.url} label="URL" onChange={handleChange} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={certification.startDate ? dayjs(certification.startDate) : null} label="Start Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "startDate")} />
            <DatePicker value={certification.endDate ? dayjs(certification.endDate) : null} label="End Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "endDate")} />
          </LocalizationProvider>
          <Button variant="outlined" startIcon={<CloudUploadIcon />}>File Upload
          <VisuallyHiddenInput type="file" onChange={(e)=>console.log(e.target.files)} multiple /></Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1, position: "fixed", bottom: 10, flexDirection: "row", left: "70%" }}>
          <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Box>
    </Card>
    
    
    </>
  )
}
