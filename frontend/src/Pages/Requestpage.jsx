import React from "react";
import { Request } from "../components/RequestCard"
import axios from "axios";
import { useEffect, useState } from "react";
import { NavbarD } from "../components/NavbarD";
import { Sidebar } from "../components/SidebarD";
export function Requests(){
    const [patreq, setPatreq] = useState([]);
    const doctor = JSON.parse(localStorage.getItem('user'));
    const fetchpatreq = async () => {
        try{
            let req = await axios.get(`http://localhost:3001/doctor/getallrequests/${doctor._id}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                },
            });

            setPatreq(req.data);
        } catch(error){
            console.log(error);
        }

       
      };
    useEffect(() => {
        fetchpatreq();
      }, []);

return (
    <div>
        <NavbarD/>
        <div className = "grid grid-cols-4 gap-0">
        <div className="col-span-1">
              <Sidebar/>              
      </div>
    <div class="bg-slate-800 col-span-3">
        <div class="p-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 h-full">
        
        {patreq.map((ele) => {
              return (
                <div class="p-3">
                <Request
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