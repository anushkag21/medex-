import React from "react";

export function ReportCard({ele}){
    return (
        

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="p-8 rounded-t-lg w-full h-56" src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
    </a>
    <div class="p-5 pt-2 text-center">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ele.doctorName}</h5>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Specialist</h5>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Date</h5>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Time</h5>
        <div class="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View Report
             
        </div>
    </div>
</div>

    )
}