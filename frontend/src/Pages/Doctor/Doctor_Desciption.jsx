import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../../components/wrapper";
import { Navbar } from "../../components/Navbar";
import { SidebarP } from "../../components/SidebarP";
import { Appointment } from "../../components/Appointment";
import StarRating from "../../components/StarRating";
import { AddReview } from "../../components/AddReview";
export function ProfilePage() {
    const { doctorId } = useParams();
    const [user, setUser] = useState({});
    const [doctor, setDoctor] = useState({});
    const [request, setRequest] = useState({});
    const xyz = JSON.parse(localStorage.getItem('user'));
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupa,setShowPopupa] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [friend, setFriend] = useState();
    const togglePopup = () => {
        setShowPopup(true);
    }
    const togglePopupa = () => {
        setShowPopupa(true);
    }
    const getDoctor = async () => {
        const response = await axios.get(`http://localhost:3001/doctor/getdoctor/${doctorId}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
            }
        })
        setDoctor(response.data);
        setUser(xyz);
    };
    useEffect(() => {
        getDoctor();
    }, []);
    async function Request() {

        try {
            const response = await axios.get(`http://localhost:3001/doctor/checkRequest/${doctorId}/${user._id}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
                }
            })
            console.log(response.data.result);
            setRequest(response.data.result);
        }
        catch (err) {
            console.log(err);
        }
    }
    async function SendRequest() {
        const userId = user._id
        try {
            const response = await axios.patch(`http://localhost:3001/patient/request/${doctor._id}`, { patientId: userId }, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.data);
            setRequest(true);
        } catch (err) {
            console.log(err);
        }
    }
    const SendingRequest = async ({ }) => {
        await SendRequest();
    }

    async function getReviews() {
        try {
            const response = await axios.get(`http://localhost:3001/doctor/getReviews/${doctorId}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
                }
            })
            console.log(response.data);
            setReviews(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const gettingReviews = async () => {
        await getReviews();
    }

    useEffect(() => {
        gettingReviews();
    }, []);

    async function checkFriend() {
        try {
            const response = await axios.get(`http://localhost:3001/patient/checkFriend/${user._id}/${doctorId}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token').slice(1, -1),
                }
            })
            setFriend(response.data.result);
            console.log(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        checkFriend();
    }, [SendRequest]);

    const RequestData = ({ }) => {
        Request();
        if (friend === true) {
            return (
                <div >
                    <button disabled type="button" class="flex cursor-not-allowed text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:bg-green-300 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                        Accepted</button>
                </div>
            );
        }
        else if (request === true) {
            return (
                <div>
                    <button disabled type="button" class="text-white bg-blue-700 cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-3 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Waiting..
                    </button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button type="button" onClick={SendingRequest} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Request</button>
                </div>

            )
        }
    };

    const ReviewButton = () => {
        if (friend === true) {
            return (
                <div>
                    <button onClick={togglePopupa} type="button" class="flex text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Review
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pl-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </button>
                </div>
            )
        }
    }

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-4 gap-0 ">
                <div className="col-span-1">
                    <SidebarP />
                </div>

                <div className="flex justify-center col-span-3">
                    <Wrapper>
                        <div className="row form-row">
                            <div className="flex col-md-12">
                                <div className=" col-md-6">
                                    <img
                                        alt="doctor"
                                        src={`http://localhost:3001/assets/${doctor.picturePath}`}
                                        className="h-60 w-52 pl-5"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="row-span-1 col-span-5 font-bold">
                                        PROFILE
                                        <div className=" w-full  h-0.5 bg-black" />
                                    </div>
                                    <div className="row-span-1 col-span-5 font-bold text-3xl text-sky-600 font-serrif">
                                        Dr. {doctor.fullName}
                                    </div>
                                    <div className="row-span-1 col-span-5 font-semibold">
                                        Speciality - {doctor.specialist}<br />
                                        Location - {doctor.location}<br />
                                        Fee - {doctor.fee}
                                    </div>
                                    <div className="flex col-span-2">
                                        <div className="">
                                            <RequestData /><br />
                                        </div>
                                        <div className="">
                                            <button onClick={togglePopup} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Appointment</button>
                                            <Appointment show={showPopup} setShow={setShowPopup} doctorId={doctor._id} userId={user._id} />
                                        </div>

                                    </div>
                                    <div>
                                        <ReviewButton />
                                          <AddReview  show={showPopupa} setShow={setShowPopupa} doctorId={doctor._id} patientId={user._id}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row-span-2 col-span-8">
                                <h3>Reviews</h3>
                                <div className=" w-full h-0.5 bg-black" />
                                <div>
                                    {reviews.map((ele) => {
                                        return (

                                            <div className="border ring-2 rounded m-2 p-2">
                                                <div className="flex">
                                                    <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`http://localhost:3001/assets/${ele.picturePath}`} alt="Bordered avatar" />
                                                    <div className="ml-2 font-serif">{ele.fullName}</div>
                                                </div>
                                                <div className="flex p-2 gap-2 ">
                                                    <div className="pb-2 font-serif"> Rating:- </div>
                                                    <StarRating rating={ele.myReview.rating} />
                                                </div>
                                                <div className="flex">
                                                    <div className="mr-2 font-serif">Comment :-</div>
                                                    <div>{ele.myReview.comment}                                                 </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Wrapper>

                </div>
            </div>
        </div>
    );
}
