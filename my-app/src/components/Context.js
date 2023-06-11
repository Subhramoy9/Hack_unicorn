import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
const Info = createContext();
const InfoContext = ({children})=>{
    const [data,setData] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [location,setLocation] = useState();
    const [city,setCity] = useState();
    const [length,setLength] = useState(0);
    const [walletAddress,setwalletAddress] = useState();
    const [allData,setallData] = useState([]);

    return(
        <>
        <Info.Provider value={{allData,setallData,data,setData,totalPages,setTotalPages,location,setLocation,city,setCity,length,setLength,walletAddress,setwalletAddress}}>
            {children}
        </Info.Provider>
        </>
    )
}
export default InfoContext
export const InfoState=()=>{
    return useContext(Info);
} 