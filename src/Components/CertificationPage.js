import { Button, Card, TextField } from '@mui/material'
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
          if (existingCertificate.filePaths) {
            setSelectedFiles(existingCertificate.filePaths); 
        }
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
        console.log("Files selected:", e.target.files);
        //console.log("Files selected:", [ ...e.target.files]);
        if (e.target.files.length > 0) {
            setSelectedFiles([...selectedFiles,...e.target.files]);
        }
    };

      const handleSubmit = async () => {
        console.log("Submitting certificate:", certification);
        try {
            let savedCertificate;
            if (isEditing) {
                if (!existingCertificate || !existingCertificate.id) {
                    console.error("Error: existingCertificate is null or missing id.");
                    return;
                }
                console.log("Certificate ID before sending request:", existingCertificate.id);    
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

                await axios.post(`${REST_API_BASE_URL}/documents/upload/${savedCertificate.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("File upload successful");
            }
            navigate("/");
        } catch (error) {
            // console.error("Error saving certificate:", error);
        }
    };
    const handleDeleteFile = async (file) => {
        const filePath = file.isUploaded ? file.name : file;
        try {
            await axios.delete(`${REST_API_BASE_URL}/documents/delete`, {
                headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ filePath: filePath.trim() }),
            });
            console.log("Deleted file from DB and storage:", filePath);
            setSelectedFiles(prev => prev.filter(f => f.name !== filePath));
            } catch (error) {
            console.error("Error deleting file:", error);
            }
        };    
  return (
    <>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}> 
        <Box><Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button></Box>
    <Box sx={{display:"flex", flexDirection:"column", gap:1, alignItems:"flex-start"}}>
          <TextField id="certificationName" variant="outlined" value={certification.certificationName} label="Certification Name" onChange={handleChange} />
          <TextField id="issuedBy" variant="outlined" value={certification.issuedBy} label="Issued By" onChange={handleChange} />
          <TextField id="licenseNumber" variant="outlined" value={certification.licenseNumber} label="License Number" onChange={handleChange} />
          <TextField id="url" variant="outlined" value={certification.url} label="URL" onChange={handleChange} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={certification.startDate ? dayjs(certification.startDate) : null} label="Start Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "startDate")} />
            <DatePicker value={certification.endDate ? dayjs(certification.endDate) : null} label="End Date" onChange={(newValue) => handleChange(dayjs(newValue).format("YYYY-MM-DD"), "endDate")} />
          </LocalizationProvider>
          <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={() => document.getElementById('fileUpload').click()}>
            File Upload</Button>
            <input type="file"  id="fileUpload" onChange={handleFileChange} multiple accept="image/*, application/pdf" style={{ display: 'none' }}  />
            {selectedFiles.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
            {selectedFiles.map((file, index) => {
            const isUploadedFile = typeof file === "string"; // Check if it's an uploaded file path or newly selected file
            const fileURL = isUploadedFile ? `http://localhost:8080/${file}` : URL.createObjectURL(file);
            return (
                <Card key={index} sx={{ padding: 1, maxWidth: 150, textAlign: "center" }}>
                    {file.type?.startsWith("image/") || file.endsWith(".png") || file.endsWith(".jpg") ? (
                        <img src={fileURL} alt={file.name || file} style={{ width: "100%", height: "auto", borderRadius: "5px" }} />
                    ) : file.type === "application/pdf" || file.endsWith(".pdf") ? (
                        <a href={fileURL} target="_blank" rel="noopener noreferrer">
                            <Button variant="outlined">View PDF</Button></a>
                    ) : (
                        <a href={fileURL} target="_blank" rel="noopener noreferrer">
                            <p>{file.name || file}</p></a>
                    )}
                    <Button variant="outlined" color="error" onClick={() => handleDeleteFile(file)}>Delete</Button>
                </Card>
                );
            })}
        </Box>
        )}
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
