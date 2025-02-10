import { Card, TextField, InputAdornment, Button, Typography, Modal } from '@mui/material'
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function HomePage({ certificates }) {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <h1 className='heading' />
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column", marginTop:5}}>
      <h1 className='heading'>Home Page</h1>
      <Box sx={{display:"flex" , justifyContent:"space-between", gap:2}}>
      <TextField size="small" variant="outlined" placeholder="Search.."  fullWidth InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}/>
      <Button size="small" variant="text">
        <SwapVertIcon /> Sort
      <ArrowDropDownIcon />
      </Button>

      <Button size="small" variant="contained" color="primary" fullWidth onClick={() =>  navigate("/addcertificate")}>Add Certifcate</Button>
      </Box>
      </Card>
      <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"row"}}>
      {certificates.length > 0 ? (
  certificates.map((certificate, index) => (
    <Card key={index} sx={{ padding: 2, marginTop: 2, cursor: "pointer" }} >
      <h3 className='heading'>{certificate.certificationName}</h3>
      <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
      <p><strong>Start Date:</strong> {certificate.startDate}</p>
      <p><strong>End Date:</strong> {certificate.endDate}</p>
      <Box sx={{ display: "flex", gap: 1, flexDirection: "row", justifyContent:"space-between", alignItems:"center", paddingTop:2 }}>
        <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={handleOpen}>Delete</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure , you want to Delete ?
          </Typography>
          <Button variant="outlined" onClick={()=>{console.log("Confirmed")}}>Confirm</Button>
        </Box></Modal> 
        <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={()=>navigate("/viewpage", { state: { certificate } })}>View</Button>
        </Box>
    </Card>
    ))
    ) : <p className='para'>"NO Certifications Yet"</p>}

      </Card>
      
    
    </>
  )
}
