import { Link } from 'react-router-dom';
import React from 'react';

export function Navbar() {

        return (

    <nav class="bg-slate-200 border-gray-200 h-20">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div class="flex items-center space-x-3 rtl:space-x-reverse pt-4">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Medicore Logo" />
          <span class="self-center text-3xl font-semibold whitespace-nowrap">Medex</span>
        </div>

        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pt-4">

          <button class="flex gap-2 pt-2 pb-2 px-5 hover:text-blue-700 focus:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>

            <div class="block px-1 text-1.5xl text-blue-700 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page"><Link to="/abt">Get Support</Link></div>
          </button>
        </div>



                </div>

            </nav>
        )
    }
