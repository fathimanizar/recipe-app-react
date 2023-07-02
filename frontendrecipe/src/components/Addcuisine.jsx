import { Button, IconButton, Table, TableCell, TableContainer, TableRow, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addcuisine = (props) => {
    var navigate = useNavigate();
    var[inp,setInp]=useState(props.data);

    const inputhandler=(e)=>
    {
      const {name,value}= e.target;
      setInp((inp)=>({...inp,[name]:value}));
    }

    const addcuisine=()=>{
      if(props.method==="post")
      {
      axios.post("http://localhost:3003/addcuisine",inp)
      .then(()=>{
           alert("new cuisine added successfully");
           navigate('/')
          })
          .catch(err=>{
            console.log(err)
          })
       }

       if(props.method==="put")
       {
         axios.put("http://localhost:3003/updatecuisine/"+inp.cuisine_name,inp)
         .then(()=>{
              alert("cuisine updated successfully");
              window.location.reload(false)
             })
             .catch(err=>{
               console.log(err)
             })
       }

  }

  return (
    <div  style={{paddingTop:'100px'}}>
       
        <TableContainer>
            <Table style={{width:'50%',marginLeft: 'auto',marginRight:'auto',marginBottom:'110px',borderRadius:'20px',backgroundColor:'#a6e2e0'}}>
               <TableRow>
                <TableCell  style={{fontFamily:'fantasy',fontSize:'20px',border:'#a6e2e0'}}>CUISINE NAME</TableCell>
                <TableCell style={{border:'#a6e2e0'}}><TextField variant='outlined' name='cuisine_name' value={inp.cuisine_name} onChange={inputhandler} style={{backgroundColor:'white',width:'100%',borderRadius:'10px'}}></TextField></TableCell>
               </TableRow>
               <TableRow>
                <TableCell style={{fontFamily:'fantasy',fontSize:'20px',border:'#a6e2e0'}}>DURATION FOR COOKING</TableCell>
                <TableCell style={{border:'#a6e2e0'}}><TextField variant='outlined' name='cuisine_duration' value={inp.cuisine_duration} onChange={inputhandler} style={{backgroundColor:'white',width:'100%',borderRadius:'10px'}}></TextField></TableCell>
               </TableRow>
               <TableRow>
                <TableCell style={{fontFamily:'fantasy',fontSize:'20px',border:'#a6e2e0'}}>NO. OF SERVINGS</TableCell>
                <TableCell style={{border:'#a6e2e0'}}><TextField variant='outlined' name='cuisine_servings_no' value={inp.cuisine_servings_no} onChange={inputhandler} style={{backgroundColor:'white',width:'100%',borderRadius:'10px'}}></TextField></TableCell>
               </TableRow>
               <TableRow>
                <TableCell style={{fontFamily:'fantasy',fontSize:'20px',border:'#a6e2e0'}}>IMAGE URL</TableCell>
                <TableCell style={{border:'#a6e2e0'}}><TextField variant='outlined' name='cuisine_image' value={inp.cuisine_image} onChange={inputhandler} style={{backgroundColor:'white',width:'100%',borderRadius:'10px'}}></TextField></TableCell>
               </TableRow>

               {/* Button */}
               <TableRow>
                    <TableCell style={{border:'black'}}></TableCell>
                    <TableCell style={{border:'black'}}>
                    <Button variant='contained' onClick={addcuisine} style={{color:'white',backgroundColor:'#128A85',width:'100%',height:'50px',borderRadius:'10px'}}>
                    <Tooltip title='Add/Update Cuisine'>
                            <IconButton>
                            <AddSharpIcon style={{fontSize:'40px',color:'white'}}/>
                            </IconButton>
                        </Tooltip>
                    </Button>
                    </TableCell>
                  </TableRow>
            </Table>
        </TableContainer>
    </div>
  )
}

export default Addcuisine