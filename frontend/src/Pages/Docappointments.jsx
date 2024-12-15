import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavbarD } from "../components/NavbarD";
import { Sidebar } from "../components/SidebarD";
export function Docappointments() {
  const navigate = useNavigate();
    const TABLE_HEAD = ["profile","Patient Name", "location", "Date", "Time", "handle appointment"];
    const doctor = JSON.parse(localStorage.getItem('user'));
    const doctorId = doctor._id;
    const [appointments,setAppointments] = useState([]);
    const fetchAllapp = async () => {
      try{
          let app = await axios.get(`http://localhost:3001/doctor/getdocAppointments/${doctorId}`, {
              headers: {
                  'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
              },
          });


          setAppointments(app.data);
      } catch(error){
          console.log(error);
      }

     
    };
  useEffect(() => {
      fetchAllapp();
    }, []);
    return (
        <div>
            <NavbarD/>
            <div className = "grid grid-cols-4 gap-0">
            <div className="col-span-1">
                  <Sidebar/>              
          </div>
        <div className = "col-span-3">
        <Card className="h-full w-full overflow-scroll p-10 justify-center">
          <table className="w-full min-w-max table-auto text-left justify-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map(({date,time,patient }, index) => {
                const isLast = index === appointments.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
     
                return (
                  <tr key={patient._id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {patient.fullName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {patient.fullName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {patient.location}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {time.hours}:{time.minutes}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <button onClick = {()=>{
                        navigate(`/common/${doctor._id}/${patient._id}`)
                      }}as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        view appointment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        </div>
        </div>
        </div>
      );
    }
    