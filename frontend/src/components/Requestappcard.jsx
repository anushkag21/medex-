import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Requestappcard= ({ ele }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();
    const doctor = JSON.parse(localStorage.getItem('user'));
    async function handleappointment(res){
        const doctoridd = doctor._id;
        try{
          const response = await axios.patch(`http://localhost:3001/doctor/booking/`,
          {
            request :{
                patientId : ele.patient._id,
                time : ele.time,
                date : ele.date
            },
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
  return(   
<div className="w-full max-w-sm bg-slate-400 border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <img class="p-8 rounded-t-lg w-full h-56" src={`http://localhost:3001/assets/${ele.patient.picturePath}`} alt="doctor" />
    <div class="px-5 pb-5">
        
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.patient.fullName.toUpperCase()}</h5>
        
        
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.patient.sex.toUpperCase()}</h5>
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.patient.age}</h5>
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.patient.location}</h5>
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.date}</h5>
            <h5 class="text-xl font-semibold tracking-tight text-black-700 dark:text-white">{ele.time.hours}: {ele.time.minutes}</h5>
        <button onClick={()=> handleappointment("true")}>Accept</button>
        <button onClick={() => handleappointment("false")}>reject</button>
    </div>
    </div>
  )
}