import React, { useEffect, useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json';
import { ethers } from 'ethers';

const User_page = () => {

    const {data,setData}= InfoState();
    const {length,setLength}= InfoState();
    const { walletAddress, setwalletAddress } = InfoState();

    const [state,setState] = useState([]);

    let address = '0x61367d6B7F34370b78a0A149F55941667b210E55';
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(address, abi, signer);

    const getStatus = async () => {
        try {
          const promises = data.map((prod) => contract.getPropertyStatus(prod._id));
          const results = await Promise.all(promises);
          setState(results);
        } catch (error) {
          console.error('Error getting statuses:', error);
        }
      };

      useEffect(() => {
        if (data.length > 0) {
          getStatus();
        }
        console.log(state)
      }, [data]);

      const buyProperty = async(id,val)=>{
        try{
            const valueWei = ethers.utils.parseEther(val.toString());
            const contractWithSigner = contract.connect(signer);
            const tx = await contractWithSigner.getProperty(id,{value: valueWei});
            await tx.wait();
            console.log('completed');
        }catch(err){
            console.log(err);
        }
       
      }

  return (
   <>
    <div>
        {
            data.map((prod,i)=>{
                if(state[i] === 2){
                    return(
                        <div className="card" style={{ width: '18rem' }} key={prod._id}>
                        <div className="card-body">
                          <h5 className="card-title">{prod._id}</h5>
                          <p className="card-text">Card's content.</p>
                          <button
                            style={{ border: '1px solid black' }} onClick={()=>buyProperty(prod._id,(prod.Price / 100000) / 2000)}>
                            
                                buy
                          </button>
                        </div>
                      </div>
                    )
                }
            })
        }
    </div>
   </>
  )
}

export default User_page