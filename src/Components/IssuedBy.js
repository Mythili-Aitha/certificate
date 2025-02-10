import { Card,Button, Modal,Typography } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


export default function IssuedBy({info}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <Button variant="text" onClick={()=>navigate(-1)}> <ChevronLeftIcon />Back</Button>
    {info.length >0 ? (info.map((info,index) =>(
       <Card key={index} sx={{ padding: 2, marginTop: 2, cursor: "pointer", justifyContent:"space-between" }} >
        <Box>
        <h3 className='heading'>{info.certificationName}</h3>
        <p><strong>Issued By:</strong> {info.issuedBy}</p>
        <p><strong>Start Date:</strong> {info.startDate}</p>
        <p><strong>End Date:</strong> {info.endDate}</p> 
        </Box>
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
        <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={()=>navigate("/viewpage")}>View</Button>
        </Box>
      </Card>
    )) ) : null
    }
    
    
    </>
  )
}
