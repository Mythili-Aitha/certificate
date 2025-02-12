import { Card, TextField, InputAdornment, Button, Typography, Modal, Pagination, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const REST_API_BASE_URL = "http://localhost:8080/api";

export default function HomePage() {

  const navigate = useNavigate()
  const [certificates, setCertificates] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("startDate");
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    axios.get(`${REST_API_BASE_URL}/certificates`, { params: { search: searchTerm, sortBy: sortOption, page:page, pageSize: 10 } })
    .then(response => {
      setCertificates(response.data.content);
      setTotalPages(response.data.totalPages);
    })
      .catch(error => console.error("Error fetching certificates:", error));
  }, [searchTerm, sortOption,page]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSort = () => {
    setSortOption(prev => prev === "startDate" ? "certificationName" : "startDate");
  };
  const handlePageChange = (event, value) => setPage(value - 1);
  // Delete certificate
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    axios.delete(`${REST_API_BASE_URL}/certificates/${deleteId}`)
      .then(() => {
        setCertificates(certificates.filter(cert => cert.id !== deleteId));
        setOpen(false);
        setDeleteId(null)
      })
      .catch(error => console.error("Error deleting certificate:", error));
  };

  return (
    <>
    <h1 className='heading' />
    <Card sx={{display:"flex" , justifyContent:"space-between", gap:1, padding:2, flexDirection:"column", marginTop:5}}>
      <h1 className='heading'>Home Page</h1>
      <Box sx={{display:"flex" , justifyContent:"space-between", gap:2}}>
      <TextField size="small" variant="outlined" placeholder="Search.." value={searchTerm}
            onChange={handleSearch} fullWidth InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}/>
      <Button size="small" variant="text" onClick={handleSort} sx={{maxHeight:40, maxWidth:60}}>
        <SwapVertIcon /> Sort by {sortOption === "startDate" ? "Name" : "Start Date"}
      <ArrowDropDownIcon />
      </Button>

      <Button size="small" variant="contained" color="primary" fullWidth onClick={() =>  navigate("/addcertificate")}>Add Certifcate</Button>
      </Box>
      </Card>
      <Card sx={{ marginTop: 2 ,gap:1}}>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {certificates.length > 0 ? (
  certificates.map((certificate) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4} key={certificate.id}>
      <Card sx={{ padding: 2, textAlign: "center" }}>
      <h3 className='heading'>{certificate.certificationName}</h3>
      <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
      <p><strong>Start Date:</strong> {certificate.startDate}</p>
      <p><strong>End Date:</strong> {certificate.endDate}</p>
      <Box sx={{ display: "flex", gap: 1, flexDirection: "row", justifyContent:"space-between", alignItems:"center", paddingTop:2 }}>
        <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(certificate.id)} >Delete</Button>
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to Delete ?
          </Typography>
          <Button variant="outlined" onClick={confirmDelete}>Confirm</Button>
        </Box></Modal> 
        <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={()=>navigate(`/viewpage/${certificate.id}`)}>View</Button>
        </Box>
    </Card>
    </Grid>
    ))
    ) : <p className='para'>"NO Certifications Yet"</p>}
      </Grid>
      <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" sx={{ display: "flex", justifyContent: "center", marginTop: 2 }} />
    
      </Card> 
    </>
  )
}
