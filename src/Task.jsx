// import React, { useEffect, useState } from 'react'

// const Task = () => {
//     let [search,SetSearch]=useState('')
//     let [ApiData,SetApiData]=useState([])
//     async function apiCall(){
//         if(!search.trim()){
//             alert('khaliii');
//             return;
//         }
//         let response=await fetch(`https://dummyjson.com/products/search?q=${search}`);
//         let data= await response.json();
//         console.log(data);
//         SetApiData(data.products)
//     }
//     useEffect(()=>{
//         fetch(`https://dummyjson.com/products`).then((response)=>{
//             return response.json();
//         }).then((data)=>{
//             SetApiData(data.products);
//         })
//     },[]) 
//   return (
//     <div>
//         <input onChange={(e)=>{SetSearch(e.target.value)}}/>
//        <button onClick={apiCall}>Click</button>
//        {
//         ApiData.map((a)=>{
//             return(<>
//                 <img src={a.thumbnail}/>
//                 <h3>{a.id}</h3>
//                 <h2>{a.price}</h2>
//             </>)

//         })
//        } 
//     </div>
//   )
// }

// // export default Task


// // const Task = () => {
// //   return (
// //     <div>Task</div>
// //   )
// // }

// export default Task