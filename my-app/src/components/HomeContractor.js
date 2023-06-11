import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json'
import { ethers } from "ethers";

const HomeContractor = () => {

    const [City,setcity] = useState("");
    const [Location,setlocation] = useState("");
    const {totalPages,setTotalPages} = InfoState();
    const {city,setCity} = InfoState();
    const {location,setLocation} = InfoState();
    const {length,setLength} = InfoState();
    const {data,setData}= InfoState();

    let navigate = useNavigate();


    const submit = ()=>{
   
        if(City === '' || Location === ''){
            alert('Enter all fields')
        }
        else{
          try{
                axios.get(`http://localhost:8000/data/${City}/${Location}`)
                .then((response)=>{
                  console.log(response.data.length)
                  setLength(response.data.length);
                  setTotalPages(Math.ceil(response.data.length/10))
                  setCity(City);
                  setLocation(Location);
                }).catch((error)=>{
                  console.log(error.message)
                })
    
                navigate("/list", { replace: true });
    
          }catch(err){
            console.log(err);
            console.log("Can't fetch data")
          }
    
        }
      }
    
  return (
    <div className='h-52' style={{border:'1px solid black', width:'500px', marginLeft:'600px',marginTop:'250px'}}>
    <div className='h-52' style={{border:'1px solid black', width:'225px',display:'flex', flexDirection:'column', alignItems:'center'}}>
       
       <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setcity(e.target.value)}}/>


  <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setlocation(e.target.value)}}/>
  
  <button onClick={submit}>search</button>
  {/* <button onClick={test}>test</button> */}
    </div>
        </div>
  )
}

export default HomeContractor