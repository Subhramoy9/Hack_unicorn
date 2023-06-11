


// import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import { InfoState } from './Context';
// import abi from './abi.json';
// import './style.css'

// const List = () => {
//   const { walletAddress, setwalletAddress } = InfoState();
//   let address = '0x61367d6B7F34370b78a0A149F55941667b210E55';
//   let provider = new ethers.providers.Web3Provider(window.ethereum);
//   let signer = provider.getSigner();
//   let contract = new ethers.Contract(address, abi, signer);

//   const { totalPages, setTotalPages } = InfoState();
//   const { city, setCity } = InfoState();
//   const { location, setLocation } = InfoState();
//   const { length, setLength } = InfoState();

//   const [page, setPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [statuses, setStatuses] = useState([]);

//   const fetchProducts = async () => {
//     const res = await fetch(`http://localhost:8000/data/${city}/${location}?page=${page}&limit=${10}`);
//     const data = await res.json();

//     console.log(data);

//     if (data) {
//       setProducts(data);
//     }
//   };

//   const selectPageHandler = (selectedPage) => {
//     if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
//       setPage(selectedPage);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   const enlist = async (id, value, owner) => {
//     try {
//       const contractWithSigner = contract.connect(signer);
//       const valueWei = ethers.utils.parseEther(value.toString());
//       const tx = await contractWithSigner.createProperty(id, valueWei, owner);
//       await tx.wait();
//       console.log('completed');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getStatuses = async () => {
//     try {
//       const promises = products.map((prod) => contract.getPropertyStatus(prod._id));
//       const results = await Promise.all(promises);
//       setStatuses(results);
//     } catch (error) {
//       console.error('Error getting statuses:', error);
//     }
//   };

//   useEffect(() => {
//     getStatuses();
//   }, [products]);

//   return (
//     <>

// <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px' }}>
//   {products.map((prod, i) => {
//     let res = statuses[i];
//     return (
//       <div className="card" style={{ width: '18rem' }} key={prod._id}>
//         <div className="card-body">
//           <h5 className="card-title">{prod._id}</h5>
//           <p className="card-text">Card's content.</p>
//           <button
//             style={{ border: '1px solid black', cursor: 'pointer' }}
//             disabled={res === 0 ? false : true}
//             onClick={() => enlist(prod._id, (prod.Price / 100000) / 2000, walletAddress)}
//           >
//             {res === 0 ? 'enlist' : res === 4 ? 'rejected' : res === 3 ? 'bought' : 'enlisted'}
//           </button>
//         </div>
//       </div>
//     );
//   })}
// </div>

//       <div className="pagination">
//   {[...Array(totalPages)].map((_, i) => {
//     return (
//       <span
//         key={i}
//         className={`pagination__item ${page === i + 1 ? 'pagination__selected' : ''}`}
//         onClick={() => selectPageHandler(i + 1)}
//       >
//         {i + 1}
//       </span>
//     );
//   })}
// </div>
//     </>
//   );
// };

// export default List;




import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { InfoState } from './Context';
import abi from './abi.json';
import './style.css';

const List = () => {
  const { walletAddress, setwalletAddress } = InfoState();
  let address = '0x61367d6B7F34370b78a0A149F55941667b210E55';
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();
  let contract = new ethers.Contract(address, abi, signer);

  const { totalPages, setTotalPages } = InfoState();
  const { city, setCity } = InfoState();
  const { location, setLocation } = InfoState();
  const { length, setLength } = InfoState();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`http://localhost:8000/data/${city}/${location}?page=${page}&limit=${10}`);
    const data = await res.json();

    console.log(data);

    if (data) {
      setProducts(data);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const previousPageHandler = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const enlist = async (id, value, owner) => {
    try {
      const contractWithSigner = contract.connect(signer);
      const valueWei = ethers.utils.parseEther(value.toString());
      const tx = await contractWithSigner.createProperty(id, valueWei, owner);
      await tx.wait();
      console.log('completed');
    } catch (err) {
      console.log(err);
    }
  };

  const getStatuses = async () => {
    try {
      const promises = products.map((prod) => contract.getPropertyStatus(prod._id));
      const results = await Promise.all(promises);
      setStatuses(results);
    } catch (error) {
      console.error('Error getting statuses:', error);
    }
  };

  useEffect(() => {
    getStatuses();
  }, [products]);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const halfPageRange = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(page - halfPageRange, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    let pageNumbers = [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);

    if (startPage > 1) {
      pageNumbers = [1, '...'].concat(pageNumbers);
    }
    if (endPage < totalPages) {
      pageNumbers = pageNumbers.concat(['...', totalPages]);
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px' }}>
        {products.map((prod, i) => {
          let res = statuses[i];
          return (
            <div className="card" style={{ width: '18rem' }} key={prod._id}>
              <div className="card-body">
                <h5 className="card-title">{prod._id}</h5>
                <p className="card-text">Card's content.</p>
                <button
                  style={{ border: '1px solid black', cursor: 'pointer' }}
                  disabled={res === 0 ? false : true}
                  onClick={() => enlist(prod._id, (prod.Price / 100000) / 2000, walletAddress)}
                >
                  {res === 0 ? 'enlist' : res === 4 ? 'rejected' : res === 3 ? 'bought' : 'enlisted'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        <span className={`pagination__item ${page === 1 ? 'pagination__disabled' : ''}`} onClick={previousPageHandler}>
          &lt;
        </span>
        {getPageNumbers().map((pageNumber, index) => (
          <span
            key={index}
            className={`pagination__item ${pageNumber === page ? 'pagination__selected' : ''}`}
            onClick={() => (typeof pageNumber === 'number' ? selectPageHandler(pageNumber) : null)}
          >
            {pageNumber}
          </span>
        ))}
        <span className={`pagination__item ${page === totalPages ? 'pagination__disabled' : ''}`} onClick={nextPageHandler}>
          &gt;
        </span>
      </div>
    </>
  );
};

export default List;









