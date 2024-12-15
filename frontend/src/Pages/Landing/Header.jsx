import React from "react";
import {UserCircleIcon} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
export function Header() {
  
  return (
    <div className="flex bg-peach">
      <div className=" w-1/3 font-serif font-bold">MedEx</div>
      <div className="w-1/3">
      <div class="inline-flex ">
        <button class="bg-white-300 hover:bg-gray-400 text-gray-800 font-bold  px-4 rounded-l">
             About
        </button>
      <button class="bg-white-300 hover:bg-gray-400 text-gray-800 font-bold  px-4 rounded-r">
             Button
        </button>
       </div>
       </div>
     <div className="w-1/3  inline-flex gap-4  justify-end">
        <div>
        <Link to="/signup/doctor">
        <button  className="inline-flex py-2 px-3.5 me-2 mb-2 text-xs font-medium text-grey-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-700 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-grey-700">
        <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />Doctor's Signup</button></Link>
        <Link to="/signup/patient">
        <button  className="inline-flex py-2 px-3.5 me-2 mb-2 text-xs font-medium text-grey-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-700 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-grey-700">
        <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />Patient's Signup</button></Link>
        </div>
     </div>
    </div>
  );
}
