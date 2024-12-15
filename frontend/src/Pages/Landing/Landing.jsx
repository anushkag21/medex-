import React from "react";
import { Header } from "./Header";
import image from '../images/dr-mike.png';
import {ArrowCircleRightIcon} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';


export function Landing() {
  return (
    <div className="m-0 p-0 h-screen">
      <Header />
      <div className="grid  m-0 p-0 h-full">
        <div className="bg-cover bg-no-repeat" style={{ backgroundImage: `url(${image})` }}><br/><br/>
          <div className=" ps-8 pt-10 text-7xl font-bold bg-gradient-to-r from-purple-600 via-green-500  to-purple-600 inline-block text-transparent bg-clip-text">
            Medical & <br/> Health Care <br/> 
          </div>
          <div className="ps-8 text-7xl font-bold">Services</div>
          <p class=" ps-8 pt-5 text-gray-500 whitespace-pre-line dark:text-gray-400">Online medical consultation with certified medical professionals</p>
          <div className="ps-8 pt-5">
            <Link to = "/login">
           <button type="button" class=" inline-flex text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> 
           <ArrowCircleRightIcon className="h-5 w-5 mr-2" aria-hidden="true" />
           Get Appointment</button>
           </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
