import { Button, Card, styled, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  useLocation, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

const REST_API_BASE_URL = "http://localhost:8080/api";
export default function CertificationPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const existingCertificate = location.state?.certificate || null;
    const isEditing = location.state?.isEditing || false;
    const [certification, setCertification] = useState({
        certificationName: "",
        issuedBy: "",
        licenseNumber: "",
        url: "",
        startDate: null,
        endDate: null
      });
      const [selectedFiles, setSelectedFiles] = useState([]);
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
      const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFiles([...e.target.files]);
        }
    };

      const handleSubmit = async () => {
        console.log("Submitting certificate:", certification);
        try {
            let savedCertificate;

            if (isEditing) {
                const response = await axios.put(`${REST_API_BASE_URL}/certificates/${existingCertificate.id}`, certification);
                savedCertificate = response.data;
            } else {
                const response = await axios.post(`${REST_API_BASE_URL}/certificates`, certification);
                savedCertificate = response.data;
            }
            console.log("Saved certificate response:", savedCertificate);
            if (selectedFiles.length > 0) {
                console.log("Uploading files:", selectedFiles);
                const formData = new FormData();
                selectedFiles.forEach(file => {
                    formData.append("files", file);
                });

                await axios.post(`${REST_API_BASE_URL}/upload/${savedCertificate.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("File upload successful");
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving certificate:", error);
        }
    };

      const VisuallyHiddenInput=styled('input')({ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0})
    
  return (
    <>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}> 
        <Box><Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button></Box>
    <Box sx={{display:"flex", flexDirection:"column", gap:1, alignItems:"flex-start"}}>
          <TextField id="certificationName" variant="outlined" value={certification.certificationName} label="Certification Name" onChange={handleChange} />
          <TextField id="issuedBy" variant="outlined" value={certification.issuedBy} label="Issued By" onChange={handleChange} />
          <TextField id="licenseNumber" variant="outlined" value={certification.liscenceNumber} label="License Number" onChange={handleChange} />
          <TextField id="url" variant="outlined" value={certification.url} label="URL" onChange={handleChange} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={certification.startDate ? dayjs(certification.startDate) : null} label="Start Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "startDate")} />
            <DatePicker value={certification.endDate ? dayjs(certification.endDate) : null} label="End Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "endDate")} />
          </LocalizationProvider>
          <Button variant="outlined" startIcon={<CloudUploadIcon />}>File Upload
          <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple /></Button>
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
