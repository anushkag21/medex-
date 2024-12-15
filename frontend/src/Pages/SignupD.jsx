import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"


export default function SignupD(){
    const [loading, setloading] = useState(false);
    const [formdetails, setFormdetails] = useState({
        fullName: "",
        email: "",
        password: "",
        location:"",
        fee:"",
        specialist:"",
    })
    const navigate =useNavigate();
    const inputChange=(e)=>{
        const { name, value } = e.target;
        return setFormdetails({
            ...formdetails,
            [name]:value,
        });
    };


    const [currentFile, setCurrentFile] = useState(null);
    const handleFileChange = (event) => {
        setCurrentFile(event.target.files[0]);
    }
    const formSubmit = async (e) => {
        try{
            if (loading) return;
            const { fullName, email, password, location,fee,specialist} = formdetails;
        if (!fullName || !location || !email || !password || !fee || !specialist ) {
            return toast.error("Input field should not be empty");
          }
          const formData = new FormData();
          formData.append('picture',currentFile);
          formData.append('fullName',fullName);
          formData.append('password',password);
          formData.append('email',email);
          formData.append('location',location);
          formData.append('specialist',specialist);
          formData.append('fee',fee);
          formData.append('picturePath',currentFile.name);
          console.log(formData);
          await toast.promise(
            axios.post("http://localhost:3001/auth/doctor/register", formData,{
                headers : {
                    'Content-Type': 'multi/form-data',
                },
              }),
            {
              pending: "Registering user...",
              success: "User registered successfully",
              error: "Unable to register user",
              loading: "Registering user...",
            }
          );
          return navigate("/login");

        }catch(error){
            console.log(error);
        }
        

    }
    

  return(
    <section className="bg-slate-300 h-full flex justify-center register-section w-full">
      
       <div onSubmit={formSubmit} className="register-form flex flex-col  justify-center rounded-lg bg-white w-96 text-center py-4 px-4 h-81 mt-20 mb-20">
        <div class="font-bold text-4xl pt-2 pb-5">Sign Up Doctor</div>
        <div className="px-1 py-1">
            <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formdetails.fullName}
                    onChange={inputChange}
                    class="w-full px-2 py-1 border rounded border-slate-200"
          />
          </div>
          <div className="px-1 py-1  ">
          <input
            type="email"
            name="email"
            className="form-input"
            class="w-full px-2 py-1 border rounded border-slate-200"
            placeholder="Enter your email"
            value={formdetails.email}
            onChange={inputChange}
          /></div>
          <div className="px-1 py-1">
          <input
            type="password"
            name="password"
            className="form-input"
            class="w-full px-2 py-1 border rounded border-slate-200"
            placeholder="Enter your password"
            value={formdetails.password}
            onChange={inputChange}
          /></div>
          <div className="px-1 py-1">
          <input
            type="text"
            name="location"
            className="form-input"
            class="w-full px-2 py-1 border rounded border-slate-200"
            placeholder="Location"
            value={formdetails.location}
            onChange={inputChange}
          /></div>
          <div className="px-1 py-1">
          <input
            type="text"
            name="specialist"
            className="form-input"
            class="w-full px-2 py-1 border rounded border-slate-200"
            placeholder="Specialist"
            value={formdetails.specialist}
            onChange={inputChange}
          /></div>
          <div className="px-1 py-1">
          <input
            type="text"
            name="fee"
            className="form-input"
            class="w-full px-2 py-1 border rounded border-slate-200"
            placeholder="Fee"
            value={formdetails.fee}
            onChange={inputChange}
          /></div>
           <div className="px-1 py-1"><input type="file" onChange={handleFileChange}  class="w-full px-2 py-1 border rounded border-slate-200"/></div>
           <div className="px-1 py-5"><button onClick={formSubmit} class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
Register</button></div>
            </div>
        </section>
    )

}