
import React, { useState } from "react";
export function NavbarD({name}){
    return(
        

<nav class="bg-slate-200 border-gray-200 dark:bg-gray-900 h-20">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
  <div class="flex items-center space-x-3 rtl:space-x-reverse pt-4">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Medicore Logo" />
      <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Medex</span>
  </div>
      <div>{name}</div>
    <div class="pt-6">
      <button class="flex gap-2 pt-2 pb-2 px-5 hover:text-blue-700 focus:text-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

          <a href="#" class="block px-1 text-1.5xl text-blue-700 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Notifications</a>
        </button>
       </div> 
    

    
  </div>
</nav>

    )
}

