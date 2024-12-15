import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignupP(){
    const [loading, setloading] = useState(false);
    const [formdetails, setFormdetails] = useState({
        fullName: "",
        email: "",
        password: "",
        location:"",
    })
    const [blood,setBlood] = useState("");
    const[sex,setSex] = useState("");
    const[age,setAge] = useState(0);
    const handleBloodChange = (event) => {
        event.preventDefault();
        const newBlood = event.target.value;
        setBlood(newBlood);
    }
    const handleSexChange = (event) => {
        event.preventDefault();
        const newSex = event.target.value;
        setSex(newSex);
    }
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
    const handleAgeChange = (event) => {
        event.preventDefault();
        const newAge = event.target.value;
        setAge(newAge);
    }
    const formSubmit = async (e) => {
        try{
            if (loading) return;
            const { fullName, email, password, location} =
        formdetails;
        if (!fullName || !location || !email || !password || !sex || !age || !blood) {
            return toast.error("Input field should not be empty");
          }
          const formData = new FormData();
          formData.append('picture',currentFile);
          formData.append('fullName',fullName);
          formData.append('password',password);
          formData.append('email',email);
          formData.append('location',location);
          formData.append('sex',sex);
          formData.append('blood',blood);
          formData.append('age',age);
          formData.append('picturePath',currentFile.name);
          console.log(formData);
          await toast.promise(
            axios.post("http://localhost:3001/auth/patient/register", formData,{
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
        <section className="bg-slate-300 h-screen flex justify-center register-section w-full">
            <div onSubmit={formSubmit} className="register-form flex flex-col justify-center rounded-lg bg-white w-96 text-center py-2 px-4 h-81 mt-20 mb-20">
            <div class="font-bold text-4xl pt-2 pb-5">Sign Up Patient</div>
            <div className="px-1 py-1">
                <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formdetails.fullName}
                    onChange={inputChange}
                    class="w-full px-2 py-1 border rounded border-slate-200"
          /></div>
            <div className="px-1 py-1">
                <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formdetails.email}
            onChange={inputChange}
            class="w-full px-2 py-1 border rounded border-slate-200"
          /></div>
                  <div className="px-1 py-1">
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formdetails.password}
            onChange={inputChange}
            autoComplete="on"
            class="w-full px-2 py-1 border rounded border-slate-200"
            />

            
          </div>
                  <div className="px-1 py-1">

            
          

          <input
            type="text"
            name="location"
            className="form-input"
            placeholder="Location"
            value={formdetails.location}
            onChange={inputChange}
            class="w-full px-2 py-1 border rounded border-slate-200"
          /></div>
                  <div className="px-1 py-1">
          <input
            type="number"
            name="age"
            className="form-input"
            placeholder="Age"
            value={formdetails.age}
            onChange={handleAgeChange}
            min="0"
            class="w-full px-2 py-1 border rounded border-slate-200"
          /></div>
                  <div className="px-1 py-1">
          <select value= {formdetails.sex} onChange={handleSexChange} class="w-full px-2 py-1 border rounded border-slate-200">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">others</option>
                
        </select></div>
        <div className="px-1 py-1">
        <select value={formdetails.blood}  className="form-input" onChange={handleBloodChange} class="w-full px-2 py-1 border rounded border-slate-200">
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="A-">A-</option>
                
        </select></div>
        <div className="px-1 py-1">
        <input type="file" onChange={handleFileChange}  class="w-full px-2 py-1 border rounded border-slate-200"/></div>
        <div className="px-1 py-1">
        <button onClick={formSubmit} class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register</button></div>
            </div>
        </section>
    )
}