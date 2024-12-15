import React, { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { setUserInfo, setType } from "../Redux/reducers/rootSlice";


export function LoginP(){
    const dispatch = useDispatch();
    const [tt, setTt] = useState("");
    const [formDetails,setFormDetails] = useState({
        email: "",
        password:"",
    });
    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
          ...formDetails,
          [name]: value,
        });
      };
      const typeChange = (e) => {
        setTt(e.target.value);
      };
    const navigate = useNavigate();
    const formsubmit = async(e) =>{
        try{
            e.preventDefault();
            const {email, password} = formDetails;
            if(!email || !password){
                return toast.error("Input field should not be empty");
            }
            // const formData = new FormData();
            // formData.append('email',email);
            // formData.append('password',password);
            console.log(email);
            console.log(password);
            // console.log(formData);
            console.log(tt);
            const { data } = await toast.promise(
                axios.post(`http://localhost:3001/auth/${tt}/login`,{
                    email,
                    password
                }
            ),{
                pending: "Logging in...",
                success: "Login successfully",
                error: "Unable to login user",
                loading: "Logging user...",
            }
        );
        localStorage.setItem('token',JSON.stringify(data.sessionToken));
        localStorage.setItem('user',JSON.stringify(data.requiredUser));
        console.log(data.requiredUser);
        dispatch(setUserInfo(data.requiredUser));
       
        dispatch(setType(tt));
        setFormDetails({
            email:"",
            password:"",
        })
        setTt("");
        if(tt == "doctor"){
            navigate('/dashboard');
        }
        else{
            navigate('/doctors');
        }

        }catch(error){
            return error;
        }
    };

    return(

        <section className="bg-slate-300 h-screen flex justify-center w-full">
            <div onSubmit={formsubmit} className="flex flex-col justify-center rounded-lg bg-white w-1/3 text-center px-8 py-0 h-3/4 mt-20 mb-20">
            <div className="font-bold text-4xl py-10">Login</div>
            <div className="px-4 py-4">
                <input type ="email" name = "email" placeholder = "Enter your Email" value = {formDetails.email} onChange = {inputChange} className="w-full px-2 py-1 border rounded border-slate-200"/></div>
                <div className="px-4 py-4"><input

            type="password"
            name="password"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
            className="w-full px-2 py-1 border rounded border-slate-200"
          /></div>
          <div className="px-4 py-4">
        <select value= {tt} onChange={typeChange} className="w-full px-2 py-1 border rounded border-slate-200">
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
        </select></div>
        <div className="px-4 py-4">
        <button
            type="submit"
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={formsubmit}
          >
            Sign in
          </button></div>
            </div>
        </section>
    );
    
}