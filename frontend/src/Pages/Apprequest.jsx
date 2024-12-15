import {DoctorCard} from "../components/doctorcard"
import React, { useState , useEffect } from "react";
import axios from "axios"
import { Requestappcard } from "../components/Requestappcard";
import { NavbarD } from "../components/NavbarD";
import { Sidebar } from "../components/SidebarD";
export const Apprequest = () =>{
    const [appreq, setAppreq] = useState([]);
    const doctor = JSON.parse(localStorage.getItem('user'));
    const fetchAllreq = async () => {
        try{
            let req = await axios.get(`http://localhost:3001/doctor/getAppointmentsreq/${doctor._id}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                },
            });

            setAppreq(req.data);
        } catch(error){
            console.log(error);
        }

       
      };
    useEffect(() => {
        fetchAllreq();
      }, []);

    return (
      <div>
        <NavbarD/>
        <div className = "grid grid-cols-4 gap-0">
        <div className="col-span-1">
              <Sidebar/>              
      </div>
      <div class="bg-gray-200 col-span-3">
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {appreq.map((ele) => {
              return (
                <div class="p-3">
                <Requestappcard
                  ele={ele}
                /></div>
              );
            })}
          </div>
      </div>
      </div>
      </div>
      )
  }
