import { Button, Card, TextField } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

export default function CertificationPage({onSaveCertificate }) {
    const navigate = useNavigate()
    const [certification, setCertification] = useState({
        certificationName: "",
        issuedBy: "",
        liscenceNumber: "",
        url: "",
        startDate: null,
        endDate: null
      });
    
      const handleChange = (event, field) => {
        if (typeof event === "string" || typeof event === "object") {
          setCertification((prev) => ({ ...prev, [field]: event }));
        } else {
          const { id, value } = event.target;
          setCertification((prev) => ({ ...prev, [id]: value }));
        }
      };
    
  return (
    <>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}> 
        <Box><Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button></Box>
    <Box sx={{display:"flex", flexDirection:"column", gap:1, alignItems:"flex-start"}}>
    <TextField id="certificationName" variant="outlined" label="Certification Name" onChange={handleChange} />
          <TextField id="issuedBy" variant="outlined" label="Issued By" onChange={handleChange} />
          <TextField id="liscenceNumber" variant="outlined" label="License Number" onChange={handleChange} />
          <TextField id="url" variant="outlined" label="URL" onChange={handleChange} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "startDate")} />
            <DatePicker label="End Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "endDate")} />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", gap: 1, position: "fixed", bottom: 10, flexDirection: "row", left: "70%" }}>
          <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            onSaveCertificate(certification);
            navigate("/");
          }}>
            Submit
          </Button>
        </Box>
    </Card>
    
    
    </>
  )
}
