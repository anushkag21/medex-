import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Card(){
    const navigate = useNavigate();
    const { doctorId, patientId} = useParams();
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    const fetchdoctor = async () => {
        try{
            let res = await axios.get(`http://localhost:3001/doctor/getdoctor/${doctorId}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                },
            });
  
            console.log(res.data);
            setDoctor(res.data);
        } catch(error){
            console.log(error);
        }
  
       
      };
      const fetchpatient = async () => {
        try{
            let res = await axios.get(`http://localhost:3001/patient/getpatient/${patientId}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                },
            });
  
            console.log(res.data);
            setPatient(res.data);
        } catch(error){
            console.log(error);
        }
       
      };
    useEffect(() => {
        fetchpatient();
        fetchdoctor();
      }, []);
      
    return(
        <div class="bg-gray-200 h-full"> 
<div class="col-span-4">
        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 h-78 ">
        <div class="p-3">
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img class="p-5 rounded-t-sm w-full h-60" src={`http://localhost:3001/assets/${doctor.picturePath}`} alt="" />
    <div class="flex flex-col justify-between p-2 leading-normal text-center">

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{doctor.fullName}</h5>
        <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{doctor.specialist}</h5>
        <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{doctor.location}</h5>
        
    
</div>
</div></div>
<div class="p-3">

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img class="p-5 rounded-t-sm w-full h-60" src={`http://localhost:3001/assets/${patient.picturePath}`} alt="" />
    <div class="flex flex-col justify-between p-2 leading-normal text-center">

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{patient.fullName}</h5>
        <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{patient.age}</h5>
        <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{patient.sex}</h5>
        <h5 class="mb-2 text-1xl tracking-tight text-gray-900 ">{patient.location}</h5>
     </div>   
    
</div></div>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 p-3 pl-30">
<div class="px-30 p-14">
    <label for="Appdate" class="block mb-2 text-sm font-medium text-gray-900">Appointment Date</label>
    <input class="p-2 rounded-xl border w-60" type="text" id = "Appdate" name="full" placeholder="Date"/>
</div>
<div class="px-40 p-14 h-2">
    <label for="Apptime" class="block mb-2 text-sm font-medium text-gray-900">Appointment Time</label>
    <input class="p-2 rounded-xl border w-60" type="text" id = "Apptime" name="ful" placeholder="Time"/>
</div>
</div>
<div class="pl-80 p-10 h-2">
<button class="w-80 h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick = {()=>{
    navigate(`/report/${doctorId}/${patientId}`);
}}>Generate Report</button>
</div>
<div class="pl-80 p-10 h-5">
<button class="w-80 h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick = {()=>{navigate(`/viewreport/${doctorId}/${patientId}`);
}}>View Report</button>
</div>
<div class="pl-80 p-10 h-5">
<button class="w-80 h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Start Video Conference</button>
</div>
</div>
    )
    
}