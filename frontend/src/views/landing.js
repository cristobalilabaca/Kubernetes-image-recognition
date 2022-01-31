import React, { useEffect, useState } from 'react';

import { Box, Button, Chip, CircularProgress, Fab, Grid, Modal, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, UploadFile } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { blue } from '@mui/material/colors';


const colors = ['#ffc09f', '#ffee93','#fcf5c7', '#a0ced9', '#adf7b6', '#e27396', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#ffc6ff' ];

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginBottom: 20
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const handleClose = () => {
    setModalOpen(false);
    acceptedFiles.length = 0
    acceptedFiles.splice(0, acceptedFiles.length);
  }
  const handleOpen= () => setModalOpen(true);

  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({maxFiles: 1, accept: 'image/*'});

  useEffect(() =>{
    fetchData();
  }, [])

  const upload =  async() => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', acceptedFiles[0])
    await axios.post('http://localhost:8000/image/', formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    acceptedFiles.length = 0
    acceptedFiles.splice(0, acceptedFiles.length);
    setModalOpen(false);
    setUploading(false);
    fetchData();
  }

  const fetchData = async () => {
    const img = await axios.get('http://localhost:8000/image/');
    setImages(img.data)
  }

  return (
    <div style={{ marginLeft: '3%', marginRight:'3%', marginBottom: '3%'}}>
      <div>
        <h1>Image classificator</h1>
        <Fab variant='extended' color='primary' style={{ position: 'absolute', right: '5%', top: 16}} onClick={handleOpen} >
          <AddIcon />
          Upload Image
        </Fab>
      </div>
      <Grid container spacing={5}>
        {images.map((image) => (
          <Grid item xs={3} >
          <Item>
            <div style={{ height: 200, position: 'relative', borderBottomStyle: 'solid', borderColor: 'black', borderWidth: 2, marginBottom: 8 }}>
              <img src={image.image} style={{ maxWidth:'100%', maxHeight: 200, width: 'auto', height: 'auto', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} alt='foto2'/>
            </div>
            <div style={{ display: 'inline' }}>
              {image.tags.map((tag) => (
                <Chip label={tag.info} style={{ marginRight: 8, marginBottom: 8, backgroundColor: colors[tag.id%colors.length] }}/>
              ))}
            </div>
          </Item>
        </Grid>
        ))}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', border: '2px solid #000', boxShadow: 24, width: '33%', bgcolor: 'white', transform: 'translate(-50%, -50%)', p: 4}}>
          <section className="container">
            <div {...getRootProps({ className: 'dropzone '})} style={baseStyle}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop an image here, or click to select</p>
            </div>
          </section>
          <p>Image to upload:</p>
          {acceptedFiles.length!==0&&<p>{acceptedFiles[0].path}</p>}
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component='span' onClick={upload} disabled={uploading} style={{marginLeft: '73%'}}>
              <UploadFile />Upload
            </Button>
            {uploading && (
              <CircularProgress
                size={48}
                sx={{
                  color: blue[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </label>
        </Box>
      </Modal>
    </div>
  )
}

export default LandingPage
