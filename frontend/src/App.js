import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupP from "./Pages/SignupP.jsx";
import SignupD from "./Pages/SignupD.jsx";
import { Sidebar } from "./components/SidebarD.jsx";
import { Landing } from "./Pages/Landing/Landing";
import { LoginP } from "./Pages/LoginP.jsx";
import { Dashboard } from "./Pages/Dasboard/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import { Doctors } from "./Pages/doctors.jsx";
import { DashboardP } from "./Pages/Dasboard/DashboardP.jsx";
import Treatment from "./components/Report.jsx";
import { Notifications } from "./components/Notifications.jsx";
import { PatientAPP } from "./Pages/PatientAPP.jsx";
import { ChatTest } from "./Pages/ChatTest.jsx";
import { ViewReport } from "./components/viewreport.jsx";
import { About } from "./Pages/AboutUs.jsx";
import { Card } from "./components/commoncomp.jsx"
import { Protected , Public } from "./Middleware/route.js";
import { Docappointments } from "./Pages/Docappointments.jsx";
import { AboutPage } from "./components/aboutpage.jsx";
import { ViewAllReport } from "./Pages/ViewallReport.jsx";
import ImageUploader from "./Pages/check.jsx";

import { MyDoctors } from "./Pages/Mydoctors.jsx";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import { ProfilePage } from "./Pages/Doctor/Doctor_Desciption.jsx";
import { ProfilePages } from "./Pages/Patient_Profile.jsx";
import { ProfileDoc } from "./Pages/Doctor_Profile.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { NavbarD } from "./components/NavbarD.jsx";
import { Apprequest } from "./Pages/Apprequest.jsx";
import { Requests } from "./Pages/Requestpage.jsx";
import { AnalogClock } from "./Pages/clockpage.jsx";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

console.log(URL);
function App() {
  return (
    // <Router>
    <div>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginP />}></Route>
        <Route path="/video" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route
          path="/report/:doctorId/:patientId"
          element={<Treatment />}
        ></Route>
        <Route path="/doctor/:doctorId" element={<ProfilePage />}></Route>
        
        

        
        <Route path="/var" element={<ViewAllReport />}></Route>{" "}
        

       
        
        <Route path="/chat/:patientId/:doctorId" element={<ChatTest />}></Route>
        

        <Route path="/dashboard"
          element={<Protected><Dashboard /></Protected>}
        ></Route>
        <Route path="/"
          element={ <Landing />}></Route>
        <Route path="/signup/patient"
          element={ <SignupP /> }
        ></Route>
        <Route path="/signup/doctor"
          element={<SignupD />}
        ></Route>
        <Route path="/doctors"
          element={<Protected><Doctors /></Protected>}
        ></Route>
        <Route path="/dashboardP"
          element={<Protected><DashboardP /></Protected>}
        ></Route>


        
        <Route path="/abt" element={<AboutPage />}></Route>
   

        <Route path="/PatientAPP" element={<Protected><PatientAPP /></Protected>}></Route>
        <Route path="/notificationsP" element={<Protected><Notifications /></Protected>}></Route>




        <Route path="/MyDoctors"
        element={<Protected><MyDoctors/></Protected>}
        ></Route>
        <Route path="/apprequest"
        element={<Protected><Apprequest/></Protected>}
        ></Route>
         
         <Route path="/Prof"
        element={<Protected><ProfilePages/></Protected>}
        ></Route>
        
        <Route path="/Requests"
        element={<Protected><Requests/></Protected>}
        ></Route>
       <Route path="/docappointments"
        element = {<Protected><Docappointments/></Protected>} 
        ></Route>

        

        

        <Route path="/About" element={<Protected><About /></Protected>}></Route>
        <Route path="/viewreport/:doctorId/:patientId" element={<Protected><ViewReport /></Protected>}></Route>
        <Route path="/Profd" element={<Protected><ProfileDoc /></Protected>}></Route>
        
        <Route path="/common/:doctorId/:patientId" element={<Protected><Card /></Protected>}></Route>
       


      </Routes>
    </div>
  );
}

export default App;
