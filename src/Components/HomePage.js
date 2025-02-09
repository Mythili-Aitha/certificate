import { Card, TextField, InputAdornment, Button, Stack, Pagination } from '@mui/material'
import Box from '@mui/material/Box';
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const navigate = useNavigate()
  const [cInfo, setCInfo] = useState([]);
  const handleSaveCertificate = (newCertificate) => {
    setCInfo((prev) => [...prev, newCertificate]) 
    navigate("/"); 
  };
  
  return (
    <>
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column"}}>
      <h1>Home Page</h1>
      <Box sx={{display:"flex" , justifyContent:"space-between", gap:2}}>
      <TextField size="small" variant="outlined" placeholder="Search.."  fullWidth InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}/>
      <Button size="small" variant="contained">
        <SwapVertIcon /> Sort
      <ArrowDropDownIcon />
      </Button>

      <Button size="small" variant="contained" onClick={() =>  navigate("/addcertificate")}>Add Certifcate</Button>
      </Box>
      
      {cInfo.length > 0 ? (
          cInfo.map((certificate, index) => (
            <Card key={index} sx={{ padding: 2, marginTop: 2, cursor: "pointer" }} onClick={() => {console.log("Clicked")}}>
              <h3>{certificate.certificationName}</h3>
              <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
              <p><strong>Start Date:</strong> {certificate.startDate}</p>
              <p><strong>End Date:</strong> {certificate.endDate}</p>
            </Card>
          ))
        ) : "NO Certifications Yet"}

    </Card>
    </>
  )
}
