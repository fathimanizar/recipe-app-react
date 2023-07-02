import { Button,Card,CardActions,CardContent,Grid,IconButton, Tooltip} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Addcuisine from './Addcuisine';
import { Link, useNavigate } from 'react-router-dom';


const Cuisines = () => {
    const navigate = useNavigate();
    const[cuisines,setCuisines]=useState([]);
    const[update,setUpdate]=useState(false);
    const[singlevalue,setSinglevalue]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:3003/viewcuisines")
        .then((response)=>{
            setCuisines(response.data);
        })
       },[]);
     

    //    .......TO UPDATE A CUISINE..................
    const updatecuisine=(value)=>{
        setUpdate(true);
        setSinglevalue(value);
         }  
    // ...........TO DELETE A CUISINE.....................
    const deletecuisine=(name)=>{
        console.log("name:",name);
        axios.delete("http://localhost:3003/deletecuisine/"+name)
        .then(()=>{
          alert("Cuisine deleted successfully");
          window.location.reload(false);
        
        })
        .catch(err=>{
          console.log(err)
        })
      }

      //..........  function to go to recipes...........................
      const gotorecipes=(cuisinename)=>{
        console.log("valuesssss",cuisinename)
      navigate('/viewrecipes',{state: {cuiname:cuisinename}});
      }

   var finalJSX = 
    <Grid container spacing={2} style={{marginBottom:"100px",paddingTop:'50px',marginLeft:'10px'}}>
      {
        cuisines.map((val,index)=>{
    return(
      <Grid item xs={12} sm ={6} md={4}>

      <Card sx={{ maxWidth: 450, maxHeight: 800 }} style={{paddingBottom:'50px',backgroundColor:'#c2ebe9',borderRadius:'10px'}}>
      <CardContent>
          <img style={{width:"400px",height:"200px",borderRadius:'10px'}} src={val.cuisine_image} alt="Card cap"/>            
          <h2 style={{fontFamily:'fantasy'}}>{val.cuisine_name}</h2>
          <br /><br />
          <p style={{fontFamily:'fantasy'}}>Duration for cooking: {val.cuisine_duration}</p>
          <p style={{fontFamily:'fantasy'}}>No. of Servings: {val.cuisine_servings_no}</p>
      </CardContent>
      <CardActions>
      {/* EDIT BUTTON */}
      <Button variant='contained' style={{color:'rgb(184, 182, 182)',backgroundColor:'#128A85',height:'30px',marginLeft:'145px',marginBottom:'50px'}} onClick={()=>updatecuisine(val)}>
      <Tooltip title='Edit Cuisine'>
      <IconButton>
      <EditSharpIcon style={{fontSize:'20px',color:'black'}}/>
      </IconButton>
      </Tooltip>
      </Button>
      &nbsp;&nbsp;
      {/* DELETE BUTTON */}
      <Button variant='contained'style={{color:'rgb(184, 182, 182)',backgroundColor:'#128A85',height:'30px',marginBottom:'50px'}} onClick={()=>deletecuisine(val.cuisine_name)}>
      <Tooltip title='Delete Cuisine'>
      <IconButton>
      <DeleteSharpIcon style={{fontSize:'20px',color:'black'}}/>
      </IconButton>
      </Tooltip>
      </Button>
      <br />
      </CardActions>
      <CardActions>
      <Button variant='contained' style={{backgroundColor:'black',marginLeft:'50px'}} onClick={()=>gotorecipes(val.cuisine_name)}>View {val.cuisine_name} Recipes</Button>
      <Button variant='contained' style={{backgroundColor:'black'}}><Link to={'/addrecipe'}  style={{color:'white',textDecoration:'none'}}>Add New Recipe</Link></Button>
      </CardActions>
    </Card>

    </Grid>
                       
                       )
                      })
} 
</Grid>


if(update) finalJSX = <Addcuisine data={singlevalue} method='put'/>
 return finalJSX;

};


export default Cuisines