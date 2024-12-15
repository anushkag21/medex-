import React from "react";
import { Sidebar } from "../../components/SidebarD";
import { NavbarD } from "../../components/NavbarD";
import { AnalogClock } from "../clockpage";
export function Dashboard(){
    return (
      <div>
        <NavbarD/>
        <div className = "grid grid-cols-4 gap-0">
        <div className="col-span-1">
              <Sidebar/>              
      </div>
      <div class="bg-gray-200 col-span-3">
        <AnalogClock/>
      </div>
      </div>
      </div>
    );
}