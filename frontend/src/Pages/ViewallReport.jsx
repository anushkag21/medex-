// import React from "react";
// import { ReportCard }  from "../components/ReportCard"

// export function ViewAllReport(){
//   const [reports, setReports] = useState([]);
//     const fetchAllDocs = async () => {
//         try{
//             let doctorsObj = await axios.get('http://localhost:3001/doctor/fetchAll', {
//                 headers: {
//                     'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
//                 },
//             });

//             setDoctors(doctorsObj.data.doctors);
//         } catch(error){
//             console.log(error);
//         }

       
//       };
//     useEffect(() => {
//         fetchAllDocs();
//       }, []);
//     return (
//         <div class="bg-gray-200 col-span-3">
//           <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ">
//           {report.map((ele) => {
//             <div class="p-3">
//             <ReportCard ele = {ele}
//             />
//             </div>
//           })}

//           </div>
//         </div>
//     )
// }