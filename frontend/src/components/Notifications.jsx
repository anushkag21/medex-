import { Card, Typography } from "@material-tailwind/react";
import React from "react";
 import { useState ,useEffect } from "react";
 import axios from "axios"

 import { Navbar } from "../components/Navbar";
import { SidebarP } from "../components/SidebarP";
export function Notifications() {
  const [notification,setNotification] = useState([]);
  const TABLE_HEAD = ["Notifications", "", ""];
  const patient = JSON.parse(localStorage.getItem('user'));
  const [click,setClick] = useState(true);
  const fetchAllnoti = async () => {
    try{
        let req = await axios.get(`http://localhost:3001/patient/sendnotifications/${patient._id}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
            },
        });

        setNotification(req.data);
    } catch(error){
        console.log(error);
    }

   
  };
useEffect(() => {
    fetchAllnoti();
  }, [click]);
  async function handleNotifications(ele){
    
    try{
      const patientI = patient._id;
      const response = await axios.post(`http://localhost:3001/patient/handleNotification`,
      {
        message : ele,
        patientId : patientI
      },
      {
        headers : {
          'Authorization': "Bearer " +localStorage.getItem('token').slice(1,-1),
      }
     }
    )
    setClick(!click);
    }catch(err){
      console.log(err);
    }
  
  }
  return (
    <div>
        <Navbar/>
        <div className = "grid grid-cols-4 gap-0">
        <div className="col-span-1">
              <SidebarP/>              
      </div>
    <Card className="h-full w-full overflow-scroll p-14 col-span-3">
      <table className="w-full min-w-max table-auto text-left justify-center p-10">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
              >
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
          {notification.map((ele, index) => {
            const isLast = index === notification.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={ele}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {ele}
                  </Typography>
                </td>
                

                <td className={classes}>
                  <button
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    onClick = {()=> handleNotifications(ele)}
                  >
                    Delete
                  </button>
                </td>

                {/* <td className={classes}>
                  <button
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Reject
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
    </div>
  );
}