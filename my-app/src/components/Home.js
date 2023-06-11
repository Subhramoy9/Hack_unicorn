import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json'
import { ethers } from "ethers";

const Home = () => {

  const [City,setcity] = useState("");
  const [Location,setlocation] = useState("");
  const {totalPages,setTotalPages} = InfoState();
  const {city,setCity} = InfoState();
  const {location,setLocation} = InfoState();
  const {length,setLength} = InfoState();
  const {data,setData}= InfoState();
  const {allData,setallData}= InfoState();

  let navigate = useNavigate();
 
  

const userSubmission= async()=>{
  if (city === '' || location === '') {
    alert('Enter all fields');
  } else {
    try {
      const response = await axios.get(`http://localhost:8000/data/${City}/${Location}`);
      setLength(response.data.length);
      setData(response.data);
      navigate("/user", { replace: true });
    } catch (error) {
      console.log(error.message);
      console.log("Can't fetch data");
    }
  }
}


// const submitBucket = async()=>{
//   try{
//     const response = await axios.get('http://localhost:8000/allData')
//     setallData(response.data);
//     navigate("/bucket",{replace:true})

//   }catch(err){
//     console.log(err);
//   }
// }


  return (
    <>
    <Navbar/>
        <div className='h-52' style={{border:'1px solid black', width:'500px', marginLeft:'600px',marginTop:'250px'}}>
    <div className='h-52' style={{border:'1px solid black', width:'225px',display:'flex', flexDirection:'column', alignItems:'center'}}>
       
       <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setcity(e.target.value)}}/>


  <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setlocation(e.target.value)}}/>
  
  <button onClick={userSubmission}>search</button>
  
    </div>
        </div>
    
      <Carousel/>
    </>
  )
}

export default Home