import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
export function Request({ele}){
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const doctor = JSON.parse(localStorage.getItem('user'));
    async function handleappointment(res){
        const doctoridd = doctor._id;
        try{
          const response = await axios.patch(`http://localhost:3001/doctor/request/${ele._id}`,
          {
            result : res,
            doctorId : doctoridd
          },
          {
            headers : {
              'Authorization': "Bearer " +localStorage.getItem('token').slice(1,-1),
          }
         })
        }catch(err){
          console.log(err);
        }
      
      }
    return (
            
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="p-10 rounded-t-sm w-full h-60" src={`http://localhost:3001/assets/${ele.picturePath}`} alt=".." />
        <div class="flex flex-col justify-between p-2 leading-normal text-center">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{ele.fullName}</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{ele.location}</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{ele.age}</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{ele.sex}</h5>
            {/* <div class="flex mt-2 md:mt-6 px-20"> */}
        <button class="p-2" onClick={()=> handleappointment("true")}><a href="" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Accept
        </a></button>
        <button class="p-2" onClick={()=> handleappointment("false")}><a href="" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Reject
        </a></button>
    </div>
</div>

    )
}

{/* <div class="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-sm" src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt=".." />
    <div class="p-10 justify-center text-center">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Patient Name</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">Location</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">Age</h5>
            <h5 class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">Sex</h5>
       
        <button class="p-8"><a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Accept
        </a></button>
        <button class="p-8"><a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Reject
        </a></button>
    </div>
</div> */}


{/* <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a> */}





{/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div> */}
