// Here this is the frontend page and we are importing pages to support the react file
import React from "react";
import { SidebarP } from "../../components/SidebarP";
import { Navbar } from "../../components/Navbar";
import { Doctors } from "../doctors";
export function DashboardP(){
    return (
    <div>
    <Navbar/>
    <div className="grid grid-cols-4">
        <div>
          <SidebarP/>
        </div>
        
    </div>
    </div>
    );
}
