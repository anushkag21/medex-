
import React from "react";
import "../Pages/ind.css"
import { Card, Typography } from "@material-tailwind/react";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { Empty, Table, Button } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const TABLE_HEAD = ["Medicine", "Dosage", "Frequency"];

 


export function ViewReport() {
  const [report, setReport] = useState({});
  const { doctorId, patientId } = useParams();
  const fetchReport = async () => {
    try {
      let res = await axios.get(`http://localhost:3001/patient/viewReport/${patientId}/${doctorId}`, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
        },
      });
      setReport(res.data);
      // console.log(report);
    } catch (error) {
      console.log(error);
    }


  };
  useEffect(() => {
    fetchReport();

  }, []);
  console.log(report.doctorInformation?.name);
  const ref = useRef();
  let content = null;
  content = <>

    <div class="bg-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div class="flex items-center space-x-3 rtl:space-x-reverse h-20">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Medicore Logo" />
          <span class="self-center text-3xl font-semibold whitespace-nowrap">Medex</span>
        </div></div>


    </div>




    <div className="invoice-item">
      <div className="row">
        <div className="col-md-12">
          <div className="invoice-info p-2 rounded" style={{ background: '#c9c9c92b' }}>
            <div className="invoice-details invoice-details-two " >
              <h3>Doctor Name : {report.doctorInformation?.name}</h3>
              <p>Specialist : {report.doctorInformation?.specialist}</p>
              <p>Location : {report.doctorInformation?.location}</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="invoice-info p-2 rounded">
            <div className="invoice-details invoice-details-two">
              <h3>Patient Name :{report.basicInformation?.name} </h3>
              <p>Age : {report.basicInformation?.age}</p>
              <p>Sex: {report.basicInformation?.sex}</p>
              <p>Blood Group : {report.basicInformation?.blood}</p>

            </div>
          </div>
        </div>

        <div className="invoice-item invoice-table-wrap">
          <div className="row border-top border-2">
            <div className="col-md-3 col-xl-3 border-end border-2 symptoms-section">
              <div className="mt-3">
                <div class="p-3 text-center">
                  <h3 class="text-bold text-4xl pb-3 text-slate-500">SYMPTOMS</h3>
                  {report.symptoms?.map((symptom) => (
                    <h4>{symptom}</h4>
                  ))}
                </div>

                <div class="p-3 text-center">
                  <h3 class="text-bold text-4xl pb-3 text-slate-500">TESTS</h3>
                  {report.tests?.map((test) => (
                    <h4>{test}</h4>
                  ))}
                </div>

              </div>
            </div>
            <div className="col-md-9 col-xl-9 px-0">
              <Card className="h-full w-full overflow-scroll px-40">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                    {report.medicine?.map(({ id, medicine, dosage, frequency }, index) => {
                      const isLast = index === report.medicine?.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={id}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {medicine}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {dosage}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {frequency}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div></div></div>
  </>


  return (
    <>
      <div className="content">
        <div className="d-flex justify-content-end" style={{ marginRight: '42rem', marginBottom: '1rem', marginTop: '1rem' }}>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (<Button type="primary" icon={<FaPrint />}> Print</Button>)}
          />
        </div>
        <div className="container-fluid" ref={ref}>
          <div className="row">
            {content}
          </div>
        </div>
      </div>
    </>


  )
} 
